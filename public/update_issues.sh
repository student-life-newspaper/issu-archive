#!/bin/bash

# Script Name: update_issues.sh
# Description: Updates the issues.json file by inserting a new "Latest Issue" and moving the previous "Latest Issue" to "Previous Issues" under the correct academic year.
# Usage: ./update_issues.sh < new_embed.html
# Created by: Dijkstra Liu
# Improved by: Jack Yang

# Set JSON file path
JSON_FILE="issues.json"
OS_TYPE=$(uname)

# Check if jq is installed
if ! command -v jq &> /dev/null; then
    echo "Error: jq is not installed. Please install jq to use this script."
    exit 1
fi

# Check if JSON file exists
if [ ! -f "$JSON_FILE" ]; then
    echo "Error: JSON file '$JSON_FILE' not found."
    exit 1
fi

new_embed=$(cat)

# Replace all double quotes " with single quotes '
new_embed_modified=$(echo "$new_embed" | sed "s/\"/'/g")

# Get the current date in Central Time (US/Central)
# 1=Monday, 7=Sunday
current_date=$(TZ="America/Chicago" date +"%Y/%m/%d")
if [ "$OS_TYPE" = "Darwin" ]; then
    # macOS (BSD date) equivalent of getting day of the week
    day_of_week=$(TZ="America/Chicago" date -j -f "%Y/%m/%d" "$current_date" +"%u")
elif [ "$OS_TYPE" = "Linux" ]; then
    # Linux (GNU date)
    day_of_week=$(TZ="America/Chicago" date -d "$current_date" +%u)
else
    echo "Error: Unsupported OS: $OS_TYPE"
    exit 1
fi


# If today is not Thursday (4), adjust to the most recent Thursday
if [ "$day_of_week" -ne 4 ]; then
    # Calculate how many days to subtract to reach the last Thursday
    days_to_subtract=$(( (day_of_week + 3) % 7 )) 
    if [ "$OS_TYPE" = "Darwin" ]; then
        # macOS (BSD date) equivalent of getting day of the week
        current_date=$(TZ="America/Chicago" date -j -v "-$days_to_subtract"d -f "%Y/%m/%d" "$current_date" +"%Y/%m/%d")
    elif [ "$OS_TYPE" = "Linux" ]; then
        # Linux (GNU date)
        current_date=$(TZ="America/Chicago" date -d "$current_date - $days_to_subtract days" +"%Y/%m/%d")
    fi
fi


# Extract current "Latest Issue" date and embed code from the JSON file
latest_issue_date=$(jq -r '.["Featured Issues"][0].date' "$JSON_FILE")
# Replace the padding-top style with height:100% to make the embed responsive
latest_issue_embed=$(jq -r '.["Featured Issues"][0].embed' "$JSON_FILE" | sed 's/padding-top:max(60%,326px);height:0;/height:100%;/g')

# Check if "Latest Issue" exists
if [ -z "$latest_issue_date" ] || [ -z "$latest_issue_embed" ] || [ "$latest_issue_date" == "null" ] || [ "$latest_issue_embed" == "null" ]; then
    echo "Error: 'Latest Issue' is missing or invalid in the JSON file."
    exit 1
fi

# Parse the latest issue date into year, month, and day
latest_year=$(echo "$latest_issue_date" | cut -d'/' -f1)
latest_month=$(echo "$latest_issue_date" | cut -d'/' -f2 | sed 's/^0*//') # Remove leading zeros
latest_day=$(echo "$latest_issue_date" | cut -d'/' -f3)

# Determine the semester based on month
if [ "$latest_month" -ge 1 ] && [ "$latest_month" -le 5 ]; then
    semester="Spring"
elif [ "$latest_month" -ge 8 ] && [ "$latest_month" -le 12 ]; then
    semester="Fall"
else
    # For months 6-8, default to Spring.
    semester="Spring"
fi

# Choose the correct date command based on the OS type
if [ "$OS_TYPE" = "Darwin" ]; then
    # macOS uses the BSD version of date
    month_name=$(date -j -f "%Y/%m/%d" "$latest_year/$latest_month/$latest_day" +"%B")
elif [ "$OS_TYPE" = "Linux" ]; then
    # Linux uses the GNU version of date
    month_name=$(date -d "$latest_year/$latest_month/$latest_day" +"%B")
else
    echo "Error: Unsupported OS: $OS_TYPE"
    exit 1
fi


if [ "$semester" = "Spring" ]; then
    year_range="$((latest_year - 1))-${latest_year}"
elif [ "$semester" = "Fall" ]; then
    year_range="${latest_year}-$((lastest_year + 1))"
else
    echo "Error: Invalid semester value. Please use 'Spring' or 'Fall'."
    exit 1
fi

jq --arg year_range "$year_range" \
   --arg semester "$semester" \
   --arg month "$month_name" \
   --arg date "$latest_issue_date" \
   --arg embed "$latest_issue_embed" \
   --arg new_date "$current_date" \
   --arg new_embed "$new_embed_modified" \
   '
  # Append the current "Latest Issue" to "Previous Issues" under the correct academic year
  .["Previous Issues"][$year_range][$semester][$month] |= (. // []) + [
    {
      "date": $date,
      "embed": $embed
    }
  ] |
  
  # Update the "Latest Issue" with the new date and embed code
  .["Featured Issues"][0].date = $new_date |
  .["Featured Issues"][0].embed = $new_embed
' "$JSON_FILE" > tmp.json && mv tmp.json "$JSON_FILE"

if [ $? -eq 0 ]; then
    echo "Success: 'Latest Issue' updated and previous issue moved to 'Previous Issues' under '$year_range'."
else
    echo "Error: Failed to update the JSON file."
    exit 1
fi