document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('dateForm');
    const resultBox = document.getElementById('resultBox');
    const dateResult = document.getElementById('dateResult');
    const resetBtn = document.getElementById('resetBtn');

    let dateIdeas = [];

    // Fetch the JSON data
    // Note: If running locally without a server, fetch() might hit CORS issues. 
    // If that happens, you can copy the JSON array directly into this file as a variable.
    fetch('dates.json')
        .then(response => response.json())
        .then(data => {
            dateIdeas = data;
        })
        .catch(error => console.error('Error loading date ideas:', error));

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get user inputs
        const timeSelected = document.getElementById('dayTime').value; // Saved for display
        const energy = document.getElementById('energy').value;
        const budget = parseFloat(document.getElementById('budget').value);
        const length = parseFloat(document.getElementById('length').value);
        const preference = document.getElementById('preference').value;

        // Filter the JSON data based on inputs
        const perfectDates = dateIdeas.filter(date => {
            return (
                date.energy === energy &&
                date.budget <= budget &&
                date.min_length <= length &&
                date.preference === preference
            );
        });

        displayResult(perfectDates, timeSelected);
    });

    function displayResult(matches, timeSelected) {
        form.classList.add('hidden');
        resultBox.classList.remove('hidden');

        if (matches.length > 0) {
            // Pick a random date from the matching results
            const selectedDate = matches[Math.floor(Math.random() * matches.length)];
            
            // Format the date/time string
            const dateObj = new Date(timeSelected);
            const formattedTime = dateObj.toLocaleString('en-US', { 
                weekday: 'long', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' 
            });

            dateResult.innerHTML = `
                <h3>${selectedDate.title}</h3>
                <p><strong>When:</strong> ${formattedTime}</p>
                <p><strong>Estimated Cost:</strong> $${selectedDate.budget}</p>
                <p>${selectedDate.description}</p>
            `;
        } else {
            dateResult.innerHTML = `
                <h3>No perfect match found!</h3>
                <p>Try slightly adjusting your budget or energy levels, or I need to add more ideas to the database!</p>
            `;
        }
    }

    resetBtn.addEventListener('click', () => {
        form.reset();
        resultBox.classList.add('hidden');
        form.classList.remove('hidden');
    });
});