#!/bin/bash

# Script Name: update_issues.sh
# Description:
#   Mode 0 (default): Updates issues-latest.json by inserting a new
#   "Latest Issue" and moving the previous latest issue to "Previous Issues"
#   under the correct academic year, semester, and month.
#
#   Mode 1: Updates issues-special.json by moving the oldest entry in
#   "Special Issues" unchanged to the bottom of the corresponding academic
#   year's "Previous Special Issues" list.
#
# Usage:
#   ./update_issues.sh [0] < new_embed.html
#   ./update_issues.sh 1 ["Issue Name"] ["thumbnail-slug"] < new_embed.html
#
# Created by: Dijkstra Liu
# Improved by: Jack Yang

set -o pipefail

MODE="${1:-0}"
OS_TYPE=$(uname)

case "$MODE" in
    0)
        JSON_FILE="issues-latest.json"
        ;;
    1)
        JSON_FILE="issues-special.json"
        ;;
    *)
        echo "Error: Invalid mode '$MODE'. Use 0 for latest issues or 1 for special issues."
        exit 1
        ;;
esac

# Check if jq is installed.
if ! command -v jq &> /dev/null; then
    echo "Error: jq is not installed. Please install jq to use this script."
    exit 1
fi

# Check if the selected JSON file exists.
if [ ! -f "$JSON_FILE" ]; then
    echo "Error: JSON file '$JSON_FILE' not found."
    exit 1
fi

# Create the temporary file beside the destination so the final mv is atomic.
TMP_FILE=$(mktemp "${JSON_FILE}.tmp.XXXXXX") || {
    echo "Error: Could not create a temporary file."
    exit 1
}
trap 'rm -f "$TMP_FILE"' EXIT

# -----------------------------------------------------------------------------
# Mode 1: Move the oldest current special issue into its academic-year history,
# then add the new special issue to the top of the current list.
# -----------------------------------------------------------------------------
if [ "$MODE" -eq 1 ]; then
    issue_name="${2:-}"
    thumbnail_slug="${3:-}"
    new_embed=$(cat)

    if [ -z "$issue_name" ]; then
        echo "Error: No issue name was provided."
        echo "Usage: ./update_issues.sh 1 \"Issue Name\" \"thumbnail-slug\" < new_embed.html"
        exit 1
    fi

    if [ -z "$thumbnail_slug" ]; then
        echo "Error: No thumbnail slug was provided."
        echo "Usage: ./update_issues.sh 1 \"Issue Name\" \"thumbnail-slug\" < new_embed.html"
        exit 1
    fi

    if [ -z "$new_embed" ]; then
        echo "Error: No embed HTML was provided on standard input."
        exit 1
    fi

    # Match the quote format used by the JSON issue records.
    new_embed_modified=$(printf '%s' "$new_embed" | sed 's/"/'"'"'/g')
    new_issue_date=$(TZ="America/Chicago" date +"%Y/%m/%d")

    special_issue_count=$(jq '."Special Issues" | length' "$JSON_FILE")

    if ! [[ "$special_issue_count" =~ ^[0-9]+$ ]] || [ "$special_issue_count" -eq 0 ]; then
        echo "Error: 'Special Issues' is missing, invalid, or empty in '$JSON_FILE'."
        exit 1
    fi

    oldest_issue_date=$(jq -r '."Special Issues" | min_by(.date) | .date' "$JSON_FILE")

    if ! [[ "$oldest_issue_date" =~ ^[0-9]{4}/[0-9]{1,2}/[0-9]{1,2}$ ]]; then
        echo "Error: The oldest special issue has an invalid date: '$oldest_issue_date'."
        exit 1
    fi

    oldest_year=$(echo "$oldest_issue_date" | cut -d'/' -f1)
    oldest_month=$(echo "$oldest_issue_date" | cut -d'/' -f2 | sed 's/^0*//')

    # Special issues published June-December belong to the academic year that
    # begins in that calendar year. January-May belong to the academic year
    # that began in the previous calendar year.
    if [ "$oldest_month" -ge 1 ] && [ "$oldest_month" -le 5 ]; then
        year_range="$((oldest_year - 1))-${oldest_year}"
    elif [ "$oldest_month" -ge 6 ] && [ "$oldest_month" -le 12 ]; then
        year_range="${oldest_year}-$((oldest_year + 1))"
    else
        echo "Error: Invalid month '$oldest_month' in special issue date '$oldest_issue_date'."
        exit 1
    fi

    if jq --arg year_range "$year_range" \
          --arg issue_name "$issue_name" \
          --arg thumbnail_slug "$thumbnail_slug" \
          --arg new_date "$new_issue_date" \
          --arg new_embed "$new_embed_modified" \
          '
        ."Special Issues" as $current |
        ($current | to_entries | min_by(.value.date).key) as $oldest_index |
        $current[$oldest_index] as $oldest |

        # Remove exactly one oldest item and prepend the new issue.
        ."Special Issues" = ([{
            "issueName": $issue_name,
            "thumbURL": $thumbnail_slug,
            "date": $new_date,
            "embed": $new_embed
        }] + ($current | del(.[$oldest_index]))) |

        # Append the unchanged item to the bottom of its history list.
        ."Previous Special Issues"[$year_range]."Special Issues" |=
            (. // []) + [$oldest]
    ' "$JSON_FILE" > "$TMP_FILE" && mv "$TMP_FILE" "$JSON_FILE"; then
        trap - EXIT
        echo "Success: '$issue_name' added to the top of 'Special Issues'; oldest issue dated $oldest_issue_date moved unchanged to 'Previous Special Issues' under '$year_range'."
        exit 0
    else
        echo "Error: Failed to update '$JSON_FILE'."
        exit 1
    fi
fi

# -----------------------------------------------------------------------------
# Mode 0 (default): Preserve the existing latest-issue update behavior.
# -----------------------------------------------------------------------------
new_embed=$(cat)

if [ -z "$new_embed" ]; then
    echo "Error: No embed HTML was provided on standard input."
    exit 1
fi

# Replace all double quotes with single quotes.
new_embed_modified=$(printf '%s' "$new_embed" | sed 's/"/'"'"'/g')

# Get the current date in Central Time. If today is not Thursday, use the most
# recent Thursday. date +%u returns 1=Monday through 7=Sunday.
current_date=$(TZ="America/Chicago" date +"%Y/%m/%d")

if [ "$OS_TYPE" = "Darwin" ]; then
    day_of_week=$(TZ="America/Chicago" date -j -f "%Y/%m/%d" "$current_date" +"%u")
elif [ "$OS_TYPE" = "Linux" ]; then
    day_of_week=$(TZ="America/Chicago" date -d "$current_date" +%u)
else
    echo "Error: Unsupported OS: $OS_TYPE"
    exit 1
fi

if [ "$day_of_week" -ne 4 ]; then
    days_to_subtract=$(( (day_of_week + 3) % 7 ))

    if [ "$OS_TYPE" = "Darwin" ]; then
        current_date=$(TZ="America/Chicago" date -j -v "-${days_to_subtract}d" \
            -f "%Y/%m/%d" "$current_date" +"%Y/%m/%d")
    else
        current_date=$(TZ="America/Chicago" date \
            -d "$current_date - $days_to_subtract days" +"%Y/%m/%d")
    fi
fi

# Extract the current latest issue.
latest_issue_date=$(jq -r '."Featured Issues"[0].date' "$JSON_FILE")

# Make the archived embed responsive, preserving the existing update logic.
latest_issue_embed=$(jq -r '."Featured Issues"[0].embed' "$JSON_FILE" |
    sed 's/padding-top:max(60%,326px);height:0;/height:100%;/g')

if [ -z "$latest_issue_date" ] || [ -z "$latest_issue_embed" ] || \
   [ "$latest_issue_date" = "null" ] || [ "$latest_issue_embed" = "null" ]; then
    echo "Error: 'Latest Issue' is missing or invalid in '$JSON_FILE'."
    exit 1
fi

if ! [[ "$latest_issue_date" =~ ^[0-9]{4}/[0-9]{1,2}/[0-9]{1,2}$ ]]; then
    echo "Error: Latest issue has an invalid date: '$latest_issue_date'."
    exit 1
fi

latest_year=$(echo "$latest_issue_date" | cut -d'/' -f1)
latest_month=$(echo "$latest_issue_date" | cut -d'/' -f2 | sed 's/^0*//')
latest_day=$(echo "$latest_issue_date" | cut -d'/' -f3)

echo "Info: Latest Issue date is $latest_issue_date (Year: $latest_year, Month: $latest_month, Day: $latest_day)"

if [ "$latest_month" -ge 1 ] && [ "$latest_month" -le 5 ]; then
    semester="Spring"
elif [ "$latest_month" -ge 8 ] && [ "$latest_month" -le 12 ]; then
    semester="Fall"
else
    # Preserve the original behavior for June and July.
    semester="Spring"
fi

if [ "$OS_TYPE" = "Darwin" ]; then
    month_name=$(date -j -f "%Y/%m/%d" \
        "$latest_year/$latest_month/$latest_day" +"%B")
elif [ "$OS_TYPE" = "Linux" ]; then
    month_name=$(date -d "$latest_year/$latest_month/$latest_day" +"%B")
else
    echo "Error: Unsupported OS: $OS_TYPE"
    exit 1
fi

if [ "$semester" = "Spring" ]; then
    year_range="$((latest_year - 1))-${latest_year}"
elif [ "$semester" = "Fall" ]; then
    year_range="${latest_year}-$((latest_year + 1))"
else
    echo "Error: Invalid semester '$semester'."
    exit 1
fi

if jq --arg year_range "$year_range" \
      --arg semester "$semester" \
      --arg month "$month_name" \
      --arg date "$latest_issue_date" \
      --arg embed "$latest_issue_embed" \
      --arg new_date "$current_date" \
      --arg new_embed "$new_embed_modified" \
      '
        # Append the current latest issue to the correct history list.
        ."Previous Issues"[$year_range][$semester][$month] |=
            (. // []) + [
                {
                    "date": $date,
                    "embed": $embed
                }
            ] |

        # Replace the current latest issue.
        ."Featured Issues"[0].date = $new_date |
        ."Featured Issues"[0].embed = $new_embed
      ' "$JSON_FILE" > "$TMP_FILE" && mv "$TMP_FILE" "$JSON_FILE"; then
    trap - EXIT
    echo "Success: 'Latest Issue' updated and previous issue moved to 'Previous Issues' under '$year_range'."
else
    echo "Error: Failed to update '$JSON_FILE'."
    exit 1
fi
