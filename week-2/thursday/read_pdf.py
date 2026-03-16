import PyPDF2

def read_pdf(file_path):
    try:
        with open(file_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            text = ""
            for page_num in range(min(5, len(reader.pages))):
                page = reader.pages[page_num]
                text += f"\n--- Page {page_num + 1} ---\n"
                text += page.extract_text()
            print(text)
    except Exception as e:
        print(f"Error reading with PyPDF2: {e}")

read_pdf('DS_ML_Intro_Fina.pdf')
