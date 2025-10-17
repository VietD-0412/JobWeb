// js/utils.js

// Export the formatTime function
export const formatTime = (seconds) => {
    if (seconds === 0) return "0s";
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
};

// You could add other helpers here later