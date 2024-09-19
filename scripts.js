const board = document.querySelector('.game-board');
const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
let cards = [];
let firstCard, secondCard;
let lockBoard = false;

function createCard(value) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;

    const img = document.createElement('img');
    img.src = `https://via.placeholder.com/100?text=${value}`;
    card.appendChild(img);

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
    if (lockBoard || this === firstCard) return;

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

setupBoard();
