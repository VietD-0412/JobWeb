// js/main.js

// --- IMPORTS ---
import { mockData } from './api.js';
import { formatTime } from './utilities.js';
import { sortUsersByName, filterUsersByDept } from './sorting.js';

// --- DOM ELEMENTS ---
const departmentFilter = document.getElementById('departmentFilter');
const userSelector = document.getElementById('userSelector');
const resultsTableBody = document.getElementById('resultsTableBody');
const testReviewModal = document.getElementById('testReviewModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const closeModalBtn = document.getElementById('closeModalBtn');
const closeModalFooterBtn = document.getElementById('closeModalFooterBtn');
const approvalSection = document.getElementById('approvalSection');
const approvalText = document.getElementById('approvalText');
const approveUserBtn = document.getElementById('approveUserBtn');

// --- TAB DOM ELEMENTS ---
const userProgressTab = document.getElementById('tab-user-progress');
const userProgressContent = document.getElementById('content-user-progress');


// --- APP STATE ---
let userChoices;
let deptChoices;

// --- MODAL LOGIC ---
const showModal = () => {
    testReviewModal.classList.remove('hidden');
    testReviewModal.classList.add('flex');
    document.body.style.overflow = 'hidden';
};

const hideModal = () => {
    testReviewModal.classList.add('hidden');
    testReviewModal.classList.remove('flex');
    document.body.style.overflow = '';
};

const populateAndShowModal = (video, user) => {
    if (!video.testDetails) return;
    modalTitle.textContent = `Test Review: "${video.title}" for ${user.name}`;
    modalBody.innerHTML = '';
    video.testDetails.forEach((detail, index) => {
        const isCorrect = detail.userAnswer === detail.correctAnswer;
        const questionElement = document.createElement('div');
        questionElement.className = 'border-b pb-4';

        let answerDetailsHTML = '';
        if (isCorrect) {
            answerDetailsHTML = `
                         <div class="mt-2 text-sm p-3 rounded-md bg-green-50 border border-green-200">
                           <p><span class="font-semibold">User's Answer (Correct): </span>${detail.userAnswer}</p>
                         </div>`;
        } else {
            answerDetailsHTML = `
                         <div class="mt-2 text-sm p-3 rounded-md bg-red-50 border border-red-200">
                           <p><span class="font-semibold">User's Answer (Incorrect): </span>${detail.userAnswer}</p>
                         </div>
                         <div class="mt-2 text-sm p-3 rounded-md bg-green-50 border border-green-200">
                           <p><span class="font-semibold">Correct Answer: </span>${detail.correctAnswer}</p>
                         </div>`;
        }

        questionElement.innerHTML = `
                        <p class="font-semibold text-gray-800">${index + 1}. ${detail.question}</p>
                        ${answerDetailsHTML}
                    `;
        modalBody.appendChild(questionElement);
    });
    showModal();
};

// --- DASHBOARD RENDERING LOGIC ---
const renderDashboard = (userId) => {
    const user = mockData.users.find(u => u.id === parseInt(userId));
    if (!user) {
        resultsTableBody.innerHTML = '<tr><td colspan="5" class="px-6 py-4 text-center">User not found.</td></tr>';
        document.getElementById('videosWatchedStat').textContent = '0 / 0';
        document.getElementById('timeWatchedStat').textContent = '0s';
        document.getElementById('avgScoreStat').textContent = '0%';
        document.getElementById('videosWatchedProgress').style.width = '0%';
        document.getElementById('timeWatchedProgress').style.width = '0%';
        document.getElementById('avgScoreProgress').style.width = '0%';
        return;
    }

    if (user.isApproved === false) {
        approvalText.textContent = `User '${user.name}' is awaiting account approval.`;
        approveUserBtn.dataset.userId = user.id;
        approvalSection.classList.remove('hidden');
    } else {
        approvalSection.classList.add('hidden');
    }

    const totalVideos = user.videos.length;
    const watchedVideos = user.videos.filter(v => v.watchedTime === v.totalLength).length;
    const totalPossibleTime = user.videos.reduce((sum, v) => sum + v.totalLength, 0);
    const totalWatchedTime = user.videos.reduce((sum, v) => sum + v.watchedTime, 0);
    const testsTaken = user.videos.filter(v => v.testScore !== null);
    const totalScore = testsTaken.reduce((sum, v) => sum + v.testScore, 0);
    const avgScore = testsTaken.length > 0 ? (totalScore / testsTaken.length).toFixed(1) : 0;
    const videosWatchedPercent = totalVideos > 0 ? (watchedVideos / totalVideos) * 100 : 0;
    const timeWatchedPercent = totalPossibleTime > 0 ? (totalWatchedTime / totalPossibleTime) * 100 : 0;

    document.getElementById('videosWatchedStat').textContent = `${watchedVideos} / ${totalVideos}`;
    document.getElementById('videosWatchedProgress').style.width = `${videosWatchedPercent}%`;
    document.getElementById('timeWatchedStat').textContent = formatTime(totalWatchedTime);
    document.getElementById('timeWatchedProgress').style.width = `${timeWatchedPercent}%`;
    document.getElementById('avgScoreStat').textContent = `${avgScore}%`;
    document.getElementById('avgScoreProgress').style.width = `${avgScore}%`;

    resultsTableBody.innerHTML = '';

    if (user.videos.length === 0) {
        resultsTableBody.innerHTML = '<tr><td colspan="5" class="px-6 py-4 text-center text-gray-500">This user has no videos assigned.</td></tr>';
        return;
    }

    user.videos.forEach(video => {
        const row = document.createElement('tr');
        row.className = "bg-white border-b hover:bg-gray-50";
        const statusBadge = video.watchedTime === 0 ? `<span class="bg-gray-200 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">Not Started</span>`
            : video.watchedTime < video.totalLength ? `<span class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">In Progress</span>`
                : `<span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">Completed</span>`;
        const scoreDisplay = video.testScore === null ? `<span class="text-gray-400">N/A</span>`
            : video.testScore >= 70 ? `<span class="font-bold text-green-700">${video.testScore}%</span>`
                : `<span class="font-bold text-red-700">${video.testScore}%</span>`;
        const hasTestBeenTaken = video.testScore !== null;
        row.innerHTML = `
            <td class="px-6 py-4 font-medium text-gray-900">${video.title}</td>
            <td class="px-6 py-4">${formatTime(video.watchedTime)} / ${formatTime(video.totalLength)}</td>
            <td class="px-6 py-4">${statusBadge}</td>
            <td class="px-6 py-4">${scoreDisplay}</td>
            <td class="px-6 py-4">
                <button class="review-test-btn text-indigo-600 hover:text-indigo-900 font-medium disabled:text-gray-400 disabled:cursor-not-allowed" 
                        data-user-id="${user.id}" data-video-id="${video.id}" 
                        ${!hasTestBeenTaken ? 'disabled' : ''} 
                        title="${!hasTestBeenTaken ? 'No test taken yet' : 'Review this user\'s test'}">
                    Review Test
                </button>
            </td>
        `;
        resultsTableBody.appendChild(row);
    });
};

// --- HELPER FUNCTION ---
const populateUserSelector = (users) => {
    if (userChoices) {
        userChoices.destroy();
    }
    userSelector.innerHTML = '';

    if (users.length === 0) {
        userSelector.innerHTML = '<option>No users found</option>';
        userChoices = new Choices(userSelector, { searchEnabled: false });
        renderDashboard(null);
        return;
    }

    const usersByDept = users.reduce((acc, user) => {
        const dept = user.department || 'Other';
        if (!acc[dept]) acc[dept] = [];
        acc[dept].push(user);
        return acc;
    }, {});

    const sortedDepts = Object.keys(usersByDept).sort();
    sortedDepts.forEach(department => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = department;
        const sortedUsers = sortUsersByName(usersByDept[department], 'asc');
        sortedUsers.forEach(user => {
            const option = document.createElement('option');
            option.value = user.id;
            option.textContent = user.name;
            optgroup.appendChild(option);
        });
        userSelector.appendChild(optgroup);
    });

    userChoices = new Choices(userSelector); // This line fixes the CSS

    const firstDept = sortedDepts[0];
    const firstUser = sortUsersByName(usersByDept[firstDept], 'asc')[0];
    if (firstUser) {
        userChoices.setChoiceByValue(firstUser.id.toString());
        renderDashboard(firstUser.id); // This line fixes the automatic render
    }
};

// --- EVENT LISTENERS ---
closeModalBtn.addEventListener('click', hideModal);
closeModalFooterBtn.addEventListener('click', hideModal);

resultsTableBody.addEventListener('click', (e) => {
    if (e.target.classList.contains('review-test-btn')) {
        const userId = parseInt(e.target.dataset.userId);
        const videoId = parseInt(e.target.dataset.videoId);
        const user = mockData.users.find(u => u.id === userId);
        const video = user?.videos.find(v => v.id === videoId);
        if (user && video) {
            populateAndShowModal(video, user);
        }
    }
});

userSelector.addEventListener('change', (e) => {
    renderDashboard(e.target.value);
});

approveUserBtn.addEventListener('click', (e) => {
    const userIdToApprove = parseInt(e.target.dataset.userId);
    if (!userIdToApprove) return;
    const user = mockData.users.find(u => u.id === userIdToApprove);
    if (user) {
        user.isApproved = true;
    }
    alert(`User '${user.name}' has been approved!`);
    approvalSection.classList.add('hidden');
});



// --- INITIALIZATION ---
const init = () => {
    const allDepartments = [...new Set(mockData.users.map(u => u.department || 'Other'))].sort();
    const allOpt = document.createElement('option');
    allOpt.value = 'all';
    allOpt.textContent = 'All Departments';
    departmentFilter.appendChild(allOpt);
    allDepartments.forEach(dept => {
        const option = document.createElement('option');
        option.value = dept;
        option.textContent = dept;
        departmentFilter.appendChild(option);
    });
    deptChoices = new Choices(departmentFilter, { searchEnabled: false });

    populateUserSelector(mockData.users);

    departmentFilter.addEventListener('change', (e) => {
        const selectedDept = e.target.value;
        const filteredUsers = filterUsersByDept(mockData.users, selectedDept);
        populateUserSelector(filteredUsers);
    });
};




// --- START THE APP ---
document.addEventListener('DOMContentLoaded', () => {
    init();
});