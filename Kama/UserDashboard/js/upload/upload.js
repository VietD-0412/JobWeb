import { handleVideoUpload } from './videoHandler.js';
import { handleDocumentUpload } from './docsHandler.js';
import { initTestQuestionForm } from './testHandler.js';

// DOM ELEMENTS
const videoFileInput = document.getElementById('videoFileInput');
const videoFileNameSpan = document.getElementById('videoFileName');
const documentFileInput = document.getElementById('documentFileInput');
const documentFileNameSpan = document.getElementById('documentFileName');

// Initializes all event listeners and handlers for the content management/upload tab
const initUploadForms = () => {
    // Initialize the video upload form interaction
    if (videoFileInput && videoFileNameSpan) {
        handleVideoUpload(videoFileInput, videoFileNameSpan);
    }

    // Initialize the document upload form interaction
    if (documentFileInput && documentFileNameSpan) {
        handleDocumentUpload(documentFileInput, documentFileNameSpan);
    }

    // Initialize the dynamic test question form
    initTestQuestionForm();

    console.log("Content management forms initialized.");
};

// --- START THE UPLOAD SCRIPT ---
// This ensures the code runs only after the main page DOM is ready.
// We'll call this from the main `admin.html` file.
document.addEventListener('DOMContentLoaded', () => {
    initUploadForms();
});