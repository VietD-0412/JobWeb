

/**
 * Sets up the event listener for the video file input to display the selected file's name.
 * @param {HTMLInputElement} fileInput - The file input element for videos.
 * @param {HTMLElement} fileNameElement - The element where the selected file name is displayed.
 */
export const handleVideoUpload = (fileInput, fileNameElement) => {
    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            fileNameElement.textContent = fileInput.files[0].name;
            // Add logic here to start the upload process,show a progress bar, or validate the file type.
            console.log(`Video file selected: ${fileInput.files[0].name}`);
        } else {
            fileNameElement.textContent = 'No file chosen';
        }
    });
};