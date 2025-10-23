// js/upload/api-upload.js

// This represents the central library of all course content available.
// When an admin "uploads" a video, it gets added here.
// The prerequisiteVideoId links videos together.

export let contentLibrary = [
    {
        id: 101,
        title: "Introduction to React",
        fileName: "react_intro.mp4",
        documentName: "react_basics.pdf",
        prerequisiteVideoId: null, // This is a starting video
    },
    {
        id: 102,
        title: "State and Props",
        fileName: "react_state_props.mp4",
        documentName: null,
        prerequisiteVideoId: 101, // Must watch "Introduction to React" first
    },
    {
        id: 103,
        title: "Lifecycle Methods",
        fileName: "react_lifecycle.mp4",
        documentName: "lifecycle_cheatsheet.pdf",
        prerequisiteVideoId: 102, // Must watch "State and Props" first
    },
    {
        id: 201,
        title: "Sales Pitch Basics",
        fileName: "sales_pitch_101.mp4",
        documentName: "pitch_template.docx",
        prerequisiteVideoId: null, // This is a starting video
    },
];
