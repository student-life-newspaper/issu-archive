import fitz  # PyMuPDF
import os
import sys


def pdf_first_page_to_jpg(pdf_path):
    """
    Converts the first page of the specified PDF file to a JPG image.
    The JPG image is saved in the same directory as the PDF with the same base name.

    :param pdf_path: Path to the input PDF file.
    """
    # Check if the PDF file exists
    if not os.path.isfile(pdf_path):
        print(
            f"Error: PDF file '{pdf_path}' not found. Please check the path.")
        return

    # Get the directory and base name of the PDF file
    directory, filename = os.path.split(pdf_path)
    base_name, _ = os.path.splitext(filename)

    # Set the output JPG file path
    output_jpg = os.path.join(directory, f"{base_name}.jpg")

    try:
        # Open the PDF file
        with fitz.open(pdf_path) as pdf:
            if pdf.page_count < 1:
                print("Error: PDF file has no pages.")
                return

            # Load the first page (index starts at 0)
            page = pdf.load_page(0)

            # Render the page to a pixmap (image)
            pix = page.get_pixmap(dpi=300)  # Set resolution to 300 DPI

            # If the pixmap has an alpha channel, convert it to RGB
            if pix.alpha:
                pix = fitz.Pixmap(fitz.csRGB, pix)

            # Save the pixmap as a JPG image
            pix.save(output_jpg)  # Removed format="jpg"

            print(
                f"Success: Converted the first page of '{pdf_path}' to '{output_jpg}'.")

    except Exception as e:
        print(f"Error: An issue occurred during conversion. Details: {e}")


if __name__ == "__main__":
    # Check if a PDF file path was provided as an argument
    if len(sys.argv) != 2:
        print("Usage: python pdf_to_img.py /path/to/input.pdf")
        sys.exit(1)

    input_pdf = sys.argv[1]
    pdf_first_page_to_jpg(input_pdf)
