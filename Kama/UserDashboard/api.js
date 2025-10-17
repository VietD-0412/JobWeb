// js/api.js

// Use 'export' to make this variable available to other files
export const mockData = {
    users: [
        {
            id: 1,
            name: "Alice Johnson",
            department: "Engineering",
            isApproved: true, 
            videos: [
                {
                    id: 101,
                    title: "Introduction to React",
                    totalLength: 600, // 10m 0s
                    watchedTime: 600, // 10m 0s
                    testScore: 90,
                    testDetails: [
                        { question: "What is JSX?", userAnswer: "A syntax extension for JavaScript", correctAnswer: "A syntax extension for JavaScript" },
                        { question: "What is a component?", userAnswer: "A reusable piece of UI", correctAnswer: "A reusable piece of UI" }
                    ]
                },
                {
                    id: 102,
                    title: "State and Props",
                    totalLength: 900, // 15m 0s
                    watchedTime: 300, // 5m 0s
                    testScore: null,
                    testDetails: null
                },
                {
                    id: 103,
                    title: "Lifecycle Methods",
                    totalLength: 720, // 12m 0s
                    watchedTime: 0,   // 0s
                    testScore: null,
                    testDetails: null
                }
            ]
        },
        {
            id: 2,
            name: "Bob Williams",
            department: "Sales",
            isApproved: false,
            videos: [
                {
                    id: 201,
                    title: "Sales Pitch Basics",
                    totalLength: 300, // 5m 0s
                    watchedTime: 300, // 5m 0s
                    testScore: 55,
                    testDetails: [
                        { question: "What is the first step?", userAnswer: "Build rapport", correctAnswer: "Identify need" },
                        { question: "How to close?", userAnswer: "Ask for the sale", correctAnswer: "Ask for the sale" }
                    ]
                },
                {
                    id: 202,
                    title: "Handling Objections",
                    totalLength: 600, // 10m 0s
                    watchedTime: 600, // 10m 0s
                    testScore: 80,
                    testDetails: [
                        { question: "What if they say 'it's too expensive'?", userAnswer: "Offer a discount", correctAnswer: "Re-iterate value" },
                        { question: "What if they say 'I need to think'?", userAnswer: "Ask what they need to think about", correctAnswer: "Ask what they need to think about" }
                    ]
                }
            ]
        },
        {
            id: 3,
            name: "Charlie Brown",
            department: "Engineering",
            isApproved: true,
            videos: [
                 {
                    id: 301,
                    title: "Advanced CI/CD",
                    totalLength: 1200, // 20m 0s
                    watchedTime: 0,
                    testScore: null,
                    testDetails: null
                }
            ]
        },
        {
            id: 4,
            name: "David Lee",
            isApproved: true,
            department: "Marketing",
            videos: [] // Example of a user with no videos
        }
    ]
};