const board = document.querySelector('.game-board');
const timerElement = document.getElementById('time');
const startBtn = document.getElementById('startBtn');
const toggleBtn = document.getElementById('toggleBtn');
const tryAgainBtn = document.getElementById('tryAgainBtn');

const cardValues = ['🍎', '🍊', '🍋', '🍉', '🍇', '🍓', '🍒', '🍍', '🥭', '🍑', '🍌', '🍐', '🍎', '🍊', '🍋', '🍉', '🍇', '🍓', '🍒', '🍍', '🥭', '🍑', '🍌', '🍐'];
let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let timeLeft = 180; // Timer set to 3 minutes (180 seconds)
let timer;
let gameStarted = false;
let isPaused = false;

function createCard(value) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;

    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');
    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');
    cardBack.textContent = value;

    card.appendChild(cardFront);
    card.appendChild(cardBack);

    card.addEventListener('click', flipCard);
    return card;
}

function setupBoard() {
    const shuffledValues = cardValues.sort(() => Math.random() - 0.5);
    shuffledValues.forEach(value => {
        const card = createCard(value);
        cards.push(card);
        board.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard || this === firstCard || !gameStarted) return; // Check if the game has started

    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.value === secondCard.dataset.value;

    if (isMatch) {
        firstCard.classList.add('correct');
        secondCard.classList.add('correct');
        resetBoard();
    } else {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1000);
    }
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timer);
            alert("Time's up!");
            tryAgainBtn.classList.remove('hidden');
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timer);
    tryAgainBtn.classList.remove('hidden');
}

function resumeTimer() {
    startTimer();
}

function toggleTimer() {
    if (isPaused) {
        resumeTimer();
        toggleBtn.textContent = 'Pause';
    } else {
        pauseTimer();
        toggleBtn.textContent = 'Resume';
    }
    isPaused = !isPaused;
}

function resetGame() {
    // Clear the game board
    board.innerHTML = '';
    cards = [];
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    timeLeft = 180; // Reset time to 3 minutes
    timerElement.textContent = timeLeft; // Update timer display

    // Set up a new game board
    setupBoard();

    // Reset button visibility
    tryAgainBtn.classList.add('hidden'); // Hide Try Again button
    toggleBtn.classList.add('hidden'); // Hide toggle button
    startBtn.classList.remove('hidden'); // Show Start button

    // Reset game state
    gameStarted = false;
    isPaused = false; // Reset pause state

    // Clear any existing timer
    clearInterval(timer);
}

// Setup event listeners for the buttons
startBtn.addEventListener('click', () => {
    if (!gameStarted) {
        startTimer(); // Start the timer
        gameStarted = true;
        startBtn.classList.add('hidden'); // Hide Start button
        toggleBtn.classList.remove('hidden'); // Show toggle button
        toggleBtn.disabled = false; // Enable toggle button
    }
});

toggleBtn.addEventListener('click', toggleTimer);
tryAgainBtn.addEventListener('click', resetGame);

// Initialize the game board
setupBoard();
