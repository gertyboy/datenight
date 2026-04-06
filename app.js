document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('dateForm');
    const resultBox = document.getElementById('resultBox');
    const dateResult = document.getElementById('dateResult');
    const resetBtn = document.getElementById('resetBtn');
    const nextBestBtn = document.getElementById('nextBestBtn');

    // The JSON data is now stored directly as a JavaScript array
    const dateIdeas = [
        { "id": 1, "title": "Movie Night", "energy": "low", "budget": 0, "min_length": 1.5, "preference": "cozy", "description": "Cozy up with blankets for a movie night in the apartment." },
        { "id": 2, "title": "Car Karaoke", "energy": "high", "budget": 5, "min_length": 0.5, "preference": "cozy", "description": "Singing our favorite songs at the top of our lungs while driving around." },
        { "id": 3, "title": "Cooking", "energy": "medium", "budget": 20, "min_length": 1, "preference": "food", "description": "Let's skip the recipe and invent a new Italian or Asian fusion dish from scratch." },
        { "id": 4, "title": "Board Games", "energy": "low", "budget": 0, "min_length": 1, "preference": "cozy", "description": "Pull out the games—maybe a competitive round of chess." },
        { "id": 5, "title": "Walk in the Park", "energy": "low", "budget": 0, "min_length": 0.5, "preference": "see something new", "description": "A relaxing stroll through a local park." },
        { "id": 6, "title": "Stargazing", "energy": "low", "budget": 0, "min_length": 1, "preference": "cozy", "description": "Lay out a blanket, look at the stars, and just talk." },
        { "id": 7, "title": "Hiking", "energy": "high", "budget": 0, "min_length": 2, "preference": "see something new", "description": "Head up the canyon for a hike and maybe spot some cool bugs." },
        { "id": 8, "title": "Swing Dancing", "energy": "high", "budget": 10, "min_length": 1, "preference": "see something new", "description": "Get moving and learn some new swing dance steps together." },
        { "id": 9, "title": "Find a new restaurant", "energy": "medium", "budget": 30, "min_length": 1.5, "preference": "food", "description": "Explore town and try a restaurant we've never been to." },
        { "id": 10, "title": "Ice Skating", "energy": "high", "budget": 15, "min_length": 1, "preference": "see something new", "description": "Bundle up and hit the ice rink." },
        { "id": 11, "title": "Rollerblading/rollerskating", "energy": "high", "budget": 15, "min_length": 1, "preference": "see something new", "description": "Strap on some skates and try not to fall over." },
        { "id": 12, "title": "Build a fort", "energy": "medium", "budget": 0, "min_length": 1, "preference": "cozy", "description": "Gather all the pillows and blankets in the apartment to make a giant fort." },
        { "id": 13, "title": "Personality Quizzes", "energy": "low", "budget": 0, "min_length": 0.5, "preference": "intellectual", "description": "Take a bunch of online personality quizzes and compare our results." },
        { "id": 14, "title": "Volunteer Together", "energy": "medium", "budget": 0, "min_length": 2, "preference": "intellectual", "description": "Spend a couple of hours giving back to the community." },
        { "id": 15, "title": "Visit a Rest Home", "energy": "low", "budget": 0, "min_length": 1, "preference": "intellectual", "description": "Spend some time visiting and listening to stories from the residents." },
        { "id": 16, "title": "Grocery Shopping", "energy": "medium", "budget": 50, "min_length": 1, "preference": "food", "description": "Make a mundane task a date by picking out fun ingredients for the week." },
        { "id": 17, "title": "Thrifting", "energy": "medium", "budget": 20, "min_length": 1, "preference": "see something new", "description": "Hunt for hidden gems or funny outfits at a local thrift store." },
        { "id": 18, "title": "Double Date", "energy": "medium", "budget": 40, "min_length": 1.5, "preference": "intellectual", "description": "Grab another couple and go out for a fun evening." },
        { "id": 19, "title": "Go to a play", "energy": "low", "budget": 50, "min_length": 2, "preference": "intellectual", "description": "Get dressed up and enjoy a local theater production." },
        { "id": 20, "title": "Hot Chocolate", "energy": "low", "budget": 5, "min_length": 0.5, "preference": "cozy", "description": "Make some rich hot chocolate and relax." },
        { "id": 21, "title": "Sledding", "energy": "high", "budget": 0, "min_length": 1, "preference": "see something new", "description": "Find the nearest snowy hill and race to the bottom." },
        { "id": 22, "title": "Snowball Fight", "energy": "high", "budget": 0, "min_length": 0.5, "preference": "see something new", "description": "A quick, competitive snowball fight outside." },
        { "id": 23, "title": "Painting", "energy": "medium", "budget": 20, "min_length": 1, "preference": "cozy", "description": "Set up some canvases and follow a Bob Ross tutorial." },
        { "id": 24, "title": "Go to a Museum", "energy": "low", "budget": 15, "min_length": 1.5, "preference": "intellectual", "description": "Wander through the exhibits and learn something new." },
        { "id": 25, "title": "Go to an Art Gallery", "energy": "low", "budget": 10, "min_length": 1, "preference": "intellectual", "description": "Walk through a gallery and debate the meaning behind the abstract art." },
        { "id": 26, "title": "Bowling", "energy": "medium", "budget": 20, "min_length": 1, "preference": "see something new", "description": "A classic night of bowling and trying for strikes." },
        { "id": 27, "title": "Go to the Zoo", "energy": "medium", "budget": 20, "min_length": 2, "preference": "see something new", "description": "Spend the afternoon checking out the animal exhibits." },
        { "id": 28, "title": "Read Together", "energy": "low", "budget": 0, "min_length": 1, "preference": "intellectual", "description": "Quiet time just reading our own books side-by-side." },
        { "id": 29, "title": "Baking", "energy": "medium", "budget": 15, "min_length": 1, "preference": "food", "description": "Bake something sweet and enjoy the smells filling the apartment." },
        { "id": 30, "title": "Campfire", "energy": "low", "budget": 0, "min_length": 1, "preference": "cozy", "description": "Build a fire, roast some marshmallows, and enjoy the warmth." },
        { "id": 31, "title": "The Social", "energy": "medium", "budget": 10, "min_length": 0.5, "preference": "see something new", "description": "Head out to a local social event or gathering." },
        { "id": 32, "title": "Cake Making", "energy": "medium", "budget": 20, "min_length": 3, "preference": "food", "description": "Bake and frost a complex cake from scratch." },
        { "id": 33, "title": "Decorate Cookies", "energy": "low", "budget": 10, "min_length": 1, "preference": "food", "description": "Make some icing and get creative decorating sugar cookies." },
        { "id": 34, "title": "Photo Shoot", "energy": "medium", "budget": 0, "min_length": 1, "preference": "see something new", "description": "Find a cool spot in town and take nice photos of Corina and me." },
        { "id": 35, "title": "Go to a Concert", "energy": "high", "budget": 50, "min_length": 2, "preference": "see something new", "description": "Enjoy some live music and a great atmosphere." },
        { "id": 36, "title": "Library Date", "energy": "low", "budget": 0, "min_length": 1, "preference": "intellectual", "description": "Browse the aisles at the library and pick out books for each other." },
        { "id": 37, "title": "Call family members together", "energy": "low", "budget": 0, "min_length": 0.5, "preference": "cozy", "description": "Catch up with our families on a joint phone call." },
        { "id": 38, "title": "Find a New Hobby together", "energy": "medium", "budget": 30, "min_length": 1, "preference": "intellectual", "description": "Pick something neither of us has ever tried and give it a shot." },
        { "id": 39, "title": "Mini Roadtrip", "energy": "medium", "budget": 100, "min_length": 4, "preference": "see something new", "description": "Pick a spot a few hours away and hit the road for the day." },
        { "id": 40, "title": "Discover New Music", "energy": "low", "budget": 0, "min_length": 0.5, "preference": "cozy", "description": "Take turns playing songs the other person has never heard." },
        { "id": 41, "title": "Workout", "energy": "high", "budget": 0, "min_length": 1, "preference": "see something new", "description": "Hit the gym or do a tough home workout together." },
        { "id": 42, "title": "Yoga", "energy": "medium", "budget": 0, "min_length": 1, "preference": "cozy", "description": "Roll out the mats and do a relaxing guided yoga routine." },
        { "id": 43, "title": "Write Notes for Each Other", "energy": "low", "budget": 0, "min_length": 0.5, "preference": "cozy", "description": "Take 30 minutes to write thoughtful, handwritten notes to one another." },
        { "id": 44, "title": "Puzzle", "energy": "low", "budget": 10, "min_length": 1, "preference": "intellectual", "description": "Spread out a 1000-piece puzzle and see how far we get." },
        { "id": 45, "title": "Debate Things we know nothing about", "energy": "medium", "budget": 0, "min_length": 0.5, "preference": "intellectual", "description": "Pick a completely random topic and passionately debate both sides." },
        { "id": 46, "title": "Spa Day", "energy": "low", "budget": 50, "min_length": 2, "preference": "cozy", "description": "Face masks, massages, and total relaxation at home." },
        { "id": 47, "title": "Have a Deep Conversation", "energy": "low", "budget": 0, "min_length": 1, "preference": "intellectual", "description": "Put the phones away and talk about the future, big ideas, or life." },
        { "id": 48, "title": "Just Cuddle", "energy": "low", "budget": 0, "min_length": 0.5, "preference": "cozy", "description": "No agenda, just relaxing and cuddling." },
        { "id": 49, "title": "Righteous Slice", "energy": "medium", "budget": 15, "min_length": 1, "preference": "food", "description": "Grab some great pizza." },
        { "id": 50, "title": "Teton National Park", "energy": "high", "budget": 35, "min_length": 3, "preference": "see something new", "description": "A big outdoor adventure trip up to the Tetons." },
        { "id": 51, "title": "Temple Trip", "energy": "low", "budget": 0, "min_length": 1, "preference": "intellectual", "description": "Take a peaceful walk around the beautiful temple grounds." },
        { "id": 52, "title": "Learn Pottery", "energy": "medium", "budget": 30, "min_length": 2, "preference": "see something new", "description": "Get our hands dirty and try to throw some clay on a wheel." },
        { "id": 53, "title": "French Fry Taste Contest", "energy": "medium", "budget": 10, "min_length": 1, "preference": "food", "description": "Buy fries from three different fast food places and rank them blindfolded." },
        { "id": 54, "title": "Walk through the greenhouses in the Benson building", "energy": "low", "budget": 0, "min_length": 0.5, "preference": "see something new", "description": "Enjoy the plants and greenery in the campus greenhouses." },
        { "id": 55, "title": "Coffee Date", "energy": "low", "budget": 5, "min_length": 0.5, "preference": "coffee", "description": "Brewing a light-roast in the French press with a splash of rose syrup." },
        { "id": 56, "title": "Visit Pioneer Cemetery", "energy": "low", "budget": 0, "min_length": 0.5, "preference": "intellectual", "description": "Walk through a historic cemetery and read the old headstones." },
        { "id": 57, "title": "Try Some Chocolate", "energy": "low", "budget": 10, "min_length": 1.25, "preference": "food", "description": "Buy a few fancy chocolate bars we've never had and do a tasting." },
        { "id": 58, "title": "Latte Making", "energy": "low", "budget": 5, "min_length": 0.5, "preference": "coffee", "description": "Grinding fresh beans with the hand grinder and practicing our latte art." },
        { "id": 59, "title": "Buy a board game", "energy": "medium", "budget": 20, "min_length": 1, "preference": "intellectual", "description": "Go to the store, pick out a brand new game, and learn how to play it." },
        { "id": 60, "title": "Candle Making", "energy": "medium", "budget": 15, "min_length": 1, "preference": "cozy", "description": "Melt some wax and mix our own custom scents for the apartment." },
        { "id": 61, "title": "Pickle Making", "energy": "medium", "budget": 10, "min_length": 1, "preference": "food", "description": "Try our hands at a quick homemade pickle brine." },
        { "id": 62, "title": "Red Onion Pickle Making", "energy": "medium", "budget": 10, "min_length": 1, "preference": "food", "description": "Thinly slice red onions and make a tangy brine for tacos or salads." },
        { "id": 63, "title": "Pretzel Baking", "energy": "medium", "budget": 15, "min_length": 1, "preference": "food", "description": "Twist up some homemade soft pretzels and bake them until golden." },
        { "id": 64, "title": "Picnic", "energy": "low", "budget": 10, "min_length": 1.5, "preference": "cozy", "description": "Pack up some sandwiches and find a nice spot on the grass." },
        { "id": 65, "title": "Adopt a Plant", "energy": "low", "budget": 15, "min_length": 1, "preference": "cozy", "description": "Go to a nursery, pick out a new houseplant, and find a pot for it." },
        { "id": 66, "title": "Attend a cooking class", "energy": "medium", "budget": 50, "min_length": 2, "preference": "food", "description": "Learn a totally new culinary skill from a professional." },
        { "id": 67, "title": "Go to a comedy show", "energy": "medium", "budget": 20, "min_length": 1.5, "preference": "see something new", "description": "Spend the evening laughing at a local stand-up club." },
        { "id": 68, "title": "Wine Tasting", "energy": "low", "budget": 30, "min_length": 2, "preference": "food", "description": "Sample a flight of different wines or sparkling ciders." },
        { "id": 69, "title": "Learn a New Dance Routine", "energy": "high", "budget": 0, "min_length": 1, "preference": "see something new", "description": "Find a YouTube tutorial and try to master a fun piece of choreography." },
        { "id": 70, "title": "Visit a historical site", "energy": "low", "budget": 15, "min_length": 2, "preference": "intellectual", "description": "Take a tour of a local landmark and soak in the history." },
        { "id": 71, "title": "Buy a single fruit", "energy": "low", "budget": 3, "min_length": 0.4, "preference": "food", "description": "Go to the store, pick out the most exotic fruit we can find, and try it." },
        { "id": 72, "title": "Go to a sports game", "energy": "high", "budget": 50, "min_length": 3, "preference": "see something new", "description": "Grab hotdogs and cheer on a local team." },
        { "id": 73, "title": "Attend a Music Festival", "energy": "high", "budget": 100, "min_length": 4, "preference": "see something new", "description": "Make a whole day out of exploring different stages and bands." },
        { "id": 74, "title": "Go to a Drive-in Movie", "energy": "low", "budget": 20, "min_length": 2, "preference": "cozy", "description": "Park the car, tune the radio, and watch a double feature." },
        { "id": 75, "title": "Visit a Farmer's Market", "energy": "medium", "budget": 20, "min_length": 1, "preference": "food", "description": "Stroll through the stalls and pick up some fresh local produce." },
        { "id": 76, "title": "Go on a scenic drive", "energy": "low", "budget": 0, "min_length": 2, "preference": "see something new", "description": "Roll the windows down and cruise through some beautiful landscapes." },
        { "id": 77, "title": "Visit a science museum", "energy": "medium", "budget": 20, "min_length": 2, "preference": "intellectual", "description": "Push the buttons on all the interactive exhibits like kids again." },
        { "id": 78, "title": "Go to a water park", "energy": "high", "budget": 30, "min_length": 3, "preference": "see something new", "description": "Spend the afternoon hitting the slides and the wave pool." },
        { "id": 79, "title": "Attend a theater performance", "energy": "low", "budget": 20, "min_length": 2, "preference": "intellectual", "description": "Enjoy a local community play or musical." },
        { "id": 80, "title": "Go to a jazz club", "energy": "low", "budget": 20, "min_length": 2, "preference": "see something new", "description": "Dress up a bit and enjoy some live, improvisational music." },
        { "id": 81, "title": "Take a scenic hike", "energy": "high", "budget": 0, "min_length": 3, "preference": "see something new", "description": "Pack some water and tackle a longer, rewarding trail." },
        { "id": 82, "title": "Visit an art museum", "energy": "low", "budget": 20, "min_length": 1.5, "preference": "intellectual", "description": "Quietly browse the galleries and pick our favorite pieces." },
        { "id": 83, "title": "Go to a flea market", "energy": "medium", "budget": 10, "min_length": 2, "preference": "see something new", "description": "Dig through the booths looking for antiques or weird finds." },
        { "id": 84, "title": "Attend a food festival", "energy": "medium", "budget": 30, "min_length": 3, "preference": "food", "description": "Eat our way through a bunch of different food trucks or stalls." },
        { "id": 85, "title": "Go to a hot spring", "energy": "low", "budget": 20, "min_length": 2, "preference": "cozy", "description": "Relax and soak in some natural geothermal water." },
        { "id": 86, "title": "Visit a vineyard", "energy": "low", "budget": 30, "min_length": 2, "preference": "see something new", "description": "Walk the vines and enjoy the beautiful scenery." },
        { "id": 87, "title": "Sidewalk Paint", "energy": "low", "budget": 10, "min_length": 1, "preference": "cozy", "description": "Chalk up the sidewalks outside the apartment." },
        { "id": 88, "title": "Take a yoga class", "energy": "medium", "budget": 15, "min_length": 1, "preference": "see something new", "description": "Go to a studio and stretch it out with an instructor." },
        { "id": 89, "title": "Go to a meditation class", "energy": "low", "budget": 10, "min_length": 1, "preference": "intellectual", "description": "Practice mindfulness and deep breathing." },
        { "id": 90, "title": "Visit a wildlife sanctuary", "energy": "medium", "budget": 20, "min_length": 2, "preference": "see something new", "description": "See some rescued animals and learn about conservation." },
        { "id": 91, "title": "Go to a poetry reading", "energy": "low", "budget": 10, "min_length": 1, "preference": "intellectual", "description": "Grab a coffee and listen to some local writers." },
        { "id": 92, "title": "Visit a ghost town", "energy": "medium", "budget": 30, "min_length": 3, "preference": "see something new", "description": "Explore abandoned buildings and a bit of eerie history." },
        { "id": 93, "title": "Go to a renaissance fair", "energy": "high", "budget": 30, "min_length": 5, "preference": "see something new", "description": "Grab a giant turkey leg and watch the jousting." },
        { "id": 94, "title": "Attend a cultural festival", "energy": "medium", "budget": 20, "min_length": 3, "preference": "intellectual", "description": "Experience food, art, and performances from a different culture." },
        { "id": 95, "title": "Go to a car show", "energy": "medium", "budget": 15, "min_length": 2, "preference": "see something new", "description": "Walk the rows checking out classic and custom vehicles." },
        { "id": 96, "title": "Go to a bird sanctuary", "energy": "low", "budget": 10, "min_length": 1.5, "preference": "see something new", "description": "Bring some binoculars and see how many species we can spot." },
        { "id": 97, "title": "Attend a book signing", "energy": "low", "budget": 0, "min_length": 1, "preference": "intellectual", "description": "Meet an author at a local bookstore." },
        { "id": 98, "title": "At home cheese tasting", "energy": "low", "budget": 20, "min_length": 1.5, "preference": "food", "description": "Build a massive charcuterie board and taste-test some intense umami cheeses." },
        { "id": 99, "title": "Visit a chocolate factory", "energy": "medium", "budget": 15, "min_length": 1.5, "preference": "food", "description": "Take a tour and smell the chocolate being made." },
        { "id": 100, "title": "Go to a brewery tour", "energy": "low", "budget": 20, "min_length": 2, "preference": "see something new", "description": "See the vats and learn how the fermentation process works." },
        { "id": 101, "title": "Attend a film festival", "energy": "low", "budget": 50, "min_length": 4, "preference": "intellectual", "description": "Watch a series of indie shorts and discuss them afterward." },
        { "id": 102, "title": "Go to a lantern festival", "energy": "low", "budget": 20, "min_length": 3, "preference": "see something new", "description": "Watch the sky light up with floating paper lanterns." },
        { "id": 103, "title": "Visit a butterfly garden", "energy": "low", "budget": 10, "min_length": 1, "preference": "see something new", "description": "Walk through a greenhouse surrounded by tropical butterflies." },
        { "id": 104, "title": "Go to a tulip festival", "energy": "medium", "budget": 15, "min_length": 2, "preference": "see something new", "description": "Walk through massive fields of blooming flowers." },
        { "id": 105, "title": "Just go for a drive", "energy": "low", "budget": 0, "min_length": 1, "preference": "cozy", "description": "No destination, just driving and talking." }
    ];

    let rankedMatches = [];
    let currentMatchIndex = 0;
    let timeSelected = '';

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