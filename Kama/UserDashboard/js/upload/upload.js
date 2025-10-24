// js/upload/upload.js

import { handleVideoUpload } from './videoHandler.js';
import { handleDocumentUpload } from './docsHandler.js';
import { initTestQuestionForm } from './testHandler.js';
import { contentLibrary } from './uploadAPI.js';
import { showConnectionModal } from './connection.js';

// --- DOM ELEMENTS ---
const videoTitleInput = document.getElementById('videoTitleInput');
const videoFileInput = document.getElementById('videoFileInput');
const videoFileNameSpan = document.getElementById('videoFileName');
const documentFileInput = document.getElementById('documentFileInput');
const documentFileNameSpan = document.getElementById('documentFileName');
const saveContentBtn = document.getElementById('saveContentBtn');
const videoListContainer = document.getElementById('videoListContainer');

/**
 * Renders the list of videos from the contentLibrary into the DOM.
 */
const renderVideoList = () => {
    videoListContainer.innerHTML = ''; // Clear the list first

    if (contentLibrary.length === 0) {
        videoListContainer.innerHTML = '<p class="text-center text-gray-500 py-4">No content found.</p>';
        return;
    }

    contentLibrary.forEach(video => {
        const prerequisite = contentLibrary.find(p => p.id === video.prerequisiteVideoId);
        const prerequisiteText = prerequisite ?
            `<span class="text-xs text-gray-500 block mt-1">Prerequisite: ${prerequisite.title}</span>` :
            `<span class="text-xs text-green-600 block mt-1">Independent Video</span>`;

        const videoElement = document.createElement('div');
        videoElement.className = 'flex items-center justify-between p-3 bg-gray-50 rounded-lg border hover:bg-gray-100';
        videoElement.innerHTML = `
            <div>
                <p class="font-semibold text-gray-800">${video.title}</p>
                ${prerequisiteText}
            </div>
            <button data-video-id="${video.id}" class="delete-video-btn text-red-500 hover:text-red-700 font-semibold px-2">
                Delete
            </button>
        `;
        videoListContainer.appendChild(videoElement);
    });
};

/**
 * Handles deleting a video. This remains here as it directly manipulates the
 * content library list, which this controller is responsible for rendering.
 */
const handleDeleteVideo = (e) => {
    if (e.target.classList.contains('delete-video-btn')) {
        const videoIdToDelete = parseInt(e.target.dataset.videoId);
        
        if (confirm("Are you sure you want to delete this video? This cannot be undone.")) {
            const videoIndex = contentLibrary.findIndex(video => video.id === videoIdToDelete);
            
            if (videoIndex > -1) {
                contentLibrary.splice(videoIndex, 1);
                renderVideoList();
            }
        }
    }
};


/**
 * Handles the "Save New Content" button click, orchestrating the entire process.
 */
const handleSaveContent = () => {
    const title = videoTitleInput.value.trim();
    const videoFile = videoFileInput.files[0];

    if (!title || !videoFile) {
        alert("Please provide a title and select a video file.");
        return;
    }
    
    // Note: Logic to gather questions from the test-handler would go here.

    const newVideo = {
        id: Date.now(),
        title: title,
        fileName: videoFile.name,
        documentName: documentFileInput.files.length > 0 ? documentFileInput.files[0].name : null,
        prerequisiteVideoId: null,
    };

    // The modal is shown, and the rest of the logic happens in its callback
    showConnectionModal(newVideo, contentLibrary, (selectedPrerequisiteId) => {
        newVideo.prerequisiteVideoId = selectedPrerequisiteId;
        contentLibrary.push(newVideo);
        
        renderVideoList();
        
        // Clear the input forms
        videoTitleInput.value = '';
        videoFileInput.value = '';
        documentFileInput.value = '';
        videoFileNameSpan.textContent = 'No file chosen';
        documentFileNameSpan.textContent = 'No file chosen';
    });
};

/**
 * Initializes all event listeners and handlers.
 */
const init = () => {
    // Initialize individual component handlers
    handleVideoUpload(videoFileInput, videoFileNameSpan);
    handleDocumentUpload(documentFileInput, documentFileNameSpan);
    initTestQuestionForm(); // Note: This requires the question-related HTML to be on the page

    // Initialize page-level event listeners
    saveContentBtn.addEventListener('click', handleSaveContent);
    videoListContainer.addEventListener('click', handleDeleteVideo);

    // Initial render of the video list
    renderVideoList();
};

// --- START THE APP ---
document.addEventListener('DOMContentLoaded', init);