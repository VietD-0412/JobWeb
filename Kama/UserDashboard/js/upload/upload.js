// js/upload/upload.js

import { handleVideoUpload } from './videoHandler.js';
import { handleDocumentUpload } from './docsHandler.js';
import { contentLibrary } from './uploadAPI.js'; // Our mock data
import { showConnectionModal } from './connection.js'; // The modal logic

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
 * Handles the "Save New Content" button click.
 */
const handleSaveContent = () => {
    const title = videoTitleInput.value.trim();
    const videoFile = videoFileInput.files[0];

    if (!title || !videoFile) {
        alert("Please provide a title and select a video file.");
        return;
    }

    const newVideo = {
        id: Date.now(),
        title: title,
        fileName: videoFile.name,
        documentName: documentFileInput.files.length > 0 ? documentFileInput.files[0].name : null,
        prerequisiteVideoId: null,
    };

    // Show the connection modal. The logic to add the video happens in the callback.
    showConnectionModal(newVideo, contentLibrary, (selectedPrerequisiteId) => {
        newVideo.prerequisiteVideoId = selectedPrerequisiteId;
        contentLibrary.push(newVideo); // Add the fully configured video to the library
        
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
 * Handles deleting a video from the library.
 * This function uses splice() to directly mutate the imported array.
 * @param {Event} e - The click event.
 */
const handleDeleteVideo = (e) => {
    if (e.target.classList.contains('delete-video-btn')) {
        const videoIdToDelete = parseInt(e.target.dataset.videoId);
        
        if (confirm("Are you sure you want to delete this video? This cannot be undone.")) {
            const videoIndex = contentLibrary.findIndex(video => video.id === videoIdToDelete);
            
            if (videoIndex > -1) {
                // Remove 1 element at the found index
                contentLibrary.splice(videoIndex, 1);
                // Re-render the list to show the change
                renderVideoList();
            }
        }
    }
};

/**
 * Initializes all event listeners and the initial view.
 */
const init = () => {
    handleVideoUpload(videoFileInput, videoFileNameSpan);
    handleDocumentUpload(documentFileInput, documentFileNameSpan);

    saveContentBtn.addEventListener('click', handleSaveContent);
    videoListContainer.addEventListener('click', handleDeleteVideo);

    // Initial render of the video list when the page loads
    renderVideoList();
};

// --- START THE APP ---
document.addEventListener('DOMContentLoaded', init);