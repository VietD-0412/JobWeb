// --- DOM ELEMENTS ---
const connectionModal = document.getElementById('connectionModal');
const modalVideoTitle = document.getElementById('modalVideoTitle');
const prerequisiteSelector = document.getElementById('prerequisiteSelector');
const saveConnectionBtn = document.getElementById('saveConnectionBtn');
const closeModalBtn = document.getElementById('closeConnectionModalBtn');

let onSaveCallback = null;

// --- MODAL LOGIC ---
const hideModal = () => {
    connectionModal.classList.add('hidden');
    onSaveCallback = null; // Clear callback
};

const handleSave = () => {
    const selectedPrerequisiteId = prerequisiteSelector.value ? parseInt(prerequisiteSelector.value) : null;
    if (onSaveCallback) {
        onSaveCallback(selectedPrerequisiteId);
    }
    hideModal();
};

/**
 * Shows and populates the video connection modal.
 * @param {object} newVideo - The new video object that was just "uploaded".
 * @param {Array} allVideos - A list of all other videos to choose from as prerequisites.
 * @param {function} saveCallback - The function to call when the save button is clicked.
 */
export const showConnectionModal = (newVideo, allVideos, saveCallback) => {
    // Set the title
    modalVideoTitle.textContent = newVideo.title;

    // Populate the dropdown
    prerequisiteSelector.innerHTML = ''; // Clear existing options

    // Add the default "independent" option
    const independentOption = document.createElement('option');
    independentOption.value = "";
    independentOption.textContent = "Independent (can be watched anytime)";
    prerequisiteSelector.appendChild(independentOption);

    // Filter out the new video itself from the list of possible prerequisites
    const possiblePrerequisites = allVideos.filter(v => v.id !== newVideo.id);

    possiblePrerequisites.forEach(video => {
        const option = document.createElement('option');
        option.value = video.id;
        option.textContent = `After "${video.title}"`;
        prerequisiteSelector.appendChild(option);
    });

    onSaveCallback = saveCallback;
    connectionModal.classList.remove('hidden');
};


// --- EVENT LISTENERS ---
saveConnectionBtn.addEventListener('click', handleSave);
closeModalBtn.addEventListener('click', hideModal);