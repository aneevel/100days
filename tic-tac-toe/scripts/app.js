let editedPlayer = 0;
let activePlayer = 0;
let currentRound = 1;

const players = [
    {
        name: '',
        symbol: 'X'
    },
    {
        name: '',
        symbol: 'O'
    }
];

const gameData = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

const playerConfigOverlayElement = document.getElementById('config-overlay');
const backdropElement = document.getElementById('backdrop');
const formElement = document.querySelector('form');
const errorsOutputElement = document.getElementById('config-errors');
const gameAreaElement = document.getElementById('game');
const activePlayerNameElement = document.getElementById('active-player-name');
const gameOverElement = document.getElementById('game-over');
const gameBoardElement = document.getElementById('game-board');

const editPlayerOneButtonElement = document.getElementById('edit-player-1-btn');
const editPlayerTwoButtonElement = document.getElementById('edit-player-2-btn');
const cancelConfigButtonElement = document.getElementById('cancel-config-btn');
const startNewGameButtonElement = document.getElementById('start-new-game-btn');
const gameFieldElements = document.querySelectorAll('#game-board li');

editPlayerOneButtonElement.addEventListener('click', openPlayerConfig);
editPlayerTwoButtonElement.addEventListener('click', openPlayerConfig);

cancelConfigButtonElement.addEventListener('click', closePlayerConfig);
backdropElement.addEventListener('click', closePlayerConfig);

formElement.addEventListener('submit', savePlayerConfig);

startNewGameButtonElement.addEventListener('click', startNewGame);

for (const gameFieldElement of gameFieldElements)
{
    gameFieldElement.addEventListener('click', selectGameField);
}