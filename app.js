document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('dateForm');
    const resultBox = document.getElementById('resultBox');
    const dateResult = document.getElementById('dateResult');
    const resetBtn = document.getElementById('resetBtn');
    const nextBestBtn = document.getElementById('nextBestBtn');

    let dateIdeas = [];
    let rankedMatches = [];
    let currentMatchIndex = 0;
    let timeSelected = '';

    // Fetch the JSON data
    fetch('dates.json')
        .then(response => response.json())
        .then(data => {
            dateIdeas = data;
        })
        .catch(error => console.error('Error loading date ideas:', error));

    // Scoring Algorithm to find the closest match
    function calculateScore(date, user) {
        let score = 0;

        // Vibe/Preference is the most important (+20 points)
        if (date.preference === user.preference) score += 20;

        // Energy is very important (+15 points)
        if (date.energy === user.energy) score += 15;

        // Budget checking
        if (date.budget <= user.budget) {
            score += 10; // Reward for being under/at budget
        } else {
            // Penalize 1 point for every dollar over budget
            score -= (date.budget - user.budget);
        }

        // Time checking
        if (date.min_length <= user.length) {
            score += 10; // Reward for fitting in the time window
        } else {
            // Penalize 5 points for every half hour over time
            score -= ((date.min_length - user.length) * 10);
        }

        return score;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get inputs
        timeSelected = document.getElementById('dayTime').value; 
        const userInputs = {
            energy: document.getElementById('energy').value,
            budget: parseFloat(document.getElementById('budget').value),
            length: parseFloat(document.getElementById('length').value),
            preference: document.getElementById('preference').value
        };

        // Score all dates and sort them from highest score to lowest
        rankedMatches = dateIdeas.map(date => {
            return {
                ...date,
                score: calculateScore(date, userInputs)
            };
        }).sort((a, b) => b.score - a.score);

        // Reset index to show the #1 best match first
        currentMatchIndex = 0;
        displayResult();
    });

    function displayResult() {
        form.classList.add('hidden');
        resultBox.classList.remove('hidden');

        const selectedDate = rankedMatches[currentMatchIndex];
        
        // Format the date/time string
        const dateObj = new Date(timeSelected);
        const formattedTime = dateObj.toLocaleString('en-US', { 
            weekday: 'long', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' 
        });

        // Determine if it's a perfect match or an alternative
        const matchText = currentMatchIndex === 0 ? "Top Match!" : `Alternative Match #${currentMatchIndex + 1}`;

        dateResult.innerHTML = `
            <div class="match-status">${matchText}</div>
            <h3>${selectedDate.title}</h3>
            <p><strong>When:</strong> ${formattedTime}</p>
            <p><strong>Estimated Cost:</strong> $${selectedDate.budget}</p>
            <p><strong>Time Needed:</strong> ${selectedDate.min_length} hours</p>
            <p>${selectedDate.description}</p>
        `;

        // Hide the "Next Best" button if we've shown the top 5 matches
        if (currentMatchIndex >= 4 || currentMatchIndex >= rankedMatches.length - 1) {
            nextBestBtn.classList.add('hidden');
        } else {
            nextBestBtn.classList.remove('hidden');
        }
    }

    nextBestBtn.addEventListener('click', () => {
        currentMatchIndex++;
        displayResult();
    });

    resetBtn.addEventListener('click', () => {
        form.reset();
        resultBox.classList.add('hidden');
        form.classList.remove('hidden');
        currentMatchIndex = 0;
    });
});