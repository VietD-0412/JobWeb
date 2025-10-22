// js/upload/document-handler.js

/**
 * Sets up the event listener for the document file input to display the selected file's name.
 * @param {HTMLInputElement} fileInput - The file input element for documents.
 * @param {HTMLElement} fileNameElement - The element where the selected file name is displayed.
 */
export const handleDocumentUpload = (fileInput, fileNameElement) => {
    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            fileNameElement.textContent = fileInput.files[0].name;
            // Future logic for document validation (e.g., PDF, DOCX onl) or processing can be added here.
            console.log(`Document file selected: ${fileInput.files[0].name}`);
        } else {
            fileNameElement.textContent = 'No file chosen';
        }
    });
};