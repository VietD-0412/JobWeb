// js/upload/test-handler.js

/**
 * Initializes the form for adding and managing test questions dynamically.
 */
export const initTestQuestionForm = () => {
    const addQuestionBtn = document.getElementById('addQuestionBtn');
    const questionsContainer = document.getElementById('questionsContainer');
    let questionCount = 0;

    if (!addQuestionBtn || !questionsContainer) return;

    addQuestionBtn.addEventListener('click', () => {
        questionCount++;
        const newQuestion = document.createElement('div');
        newQuestion.className = 'p-4 border rounded-lg mt-4 bg-gray-50 relative';
        newQuestion.innerHTML = `
            <button type="button" class="absolute top-2 right-2 text-gray-400 hover:text-red-600 remove-question-btn" title="Remove Question">&times;</button>
            <p class="font-semibold mb-2">Question ${questionCount}</p>
            <div class="grid grid-cols-1 gap-4">
                <div>
                    <label for="question-${questionCount}" class="block text-sm font-medium text-gray-700">Question Text</label>
                    <input type="text" id="question-${questionCount}" name="question-${questionCount}" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="e.g., What is a variable?">
                </div>
                <div>
                    <label for="correct-answer-${questionCount}" class="block text-sm font-medium text-gray-700">Correct Answer</label>
                    <input type="text" id="correct-answer-${questionCount}" name="correct-answer-${questionCount}" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="e.g., A container for storing data">
                </div>
            </div>
        `;
        questionsContainer.appendChild(newQuestion);
    });

    // Add event listener to handle removing questions
    questionsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-question-btn')) {
            e.target.closest('.p-4').remove();
        }
    });
};