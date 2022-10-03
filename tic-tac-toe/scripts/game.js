function resetGameStatus() {
    activePlayer = 0;
    currentRound = 1;
    gameOverElement.firstElementChild.innerHTML = 
        'You won, <span id="winner-name">PLAYER NAME</span>!';
    gameOverElement.style.display = 'none';

    let gameBoardIndex = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            gameData[i][j] = 0;
            gameBoardElement.children[gameBoardIndex].textContent = '';
            gameBoardElement.children[gameBoardIndex].classList.remove('disabled');
            gameBoardIndex++;
        }
    }
}

function startNewGame() {
    if (players[0].name === '' || players[1].name === '')
    {
        alert('Please set player names first!');
        return;
    }

    resetGameStatus();

    activePlayerNameElement.textContent = players[activePlayer].name;
    gameAreaElement.style.display = 'block';
}

function switchPlayer() {
    if (activePlayer === 0)
        activePlayer = 1;
    else 
        activePlayer = 0;

    activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectGameField(event) {

    const selectedColumn = event.target.dataset.col - 1;
    const selectedRow = event.target.dataset.row - 1;

    if (gameData[selectedRow][selectedColumn] > 0)
        return;

    event.target.textContent = players[activePlayer].symbol;
    event.target.classList.add('disabled');

    gameData[selectedRow][selectedColumn] = activePlayer + 1;

    const winnerID = checkForGameOver();
    if (winnerID !== 0)
        endGame(winnerID);

    currentRound++;
    switchPlayer();
}

function checkForGameOver() {

    for (let i = 0; i < 3; i++)
    {
        if (gameData[i][0] > 0 && 
            gameData[i][0] === gameData[i][1] && 
            gameData[i][1] === gameData[i][2])
            return gameData[i][0];
    }

    for (let i = 0; i < 3; i++)
    {
        if (gameData[0][i] > 0 &&
            gameData[0][i] === gameData[1][i] &&
            gameData[1][i] === gameData[2][i])
            return gameData[0][i];
    }

    if (gameData[0][0] > 0 &&
        gameData[0][0] === gameData[1][1] &&
        gameData[1][1] === gameData[2][2])
        return gameData[0][0];

    if (gameData[2][0] > 0 &&
        gameData[2][0] === gameData[1][1] &&
        gameData[1][1] === gameData[0][2])
        return gameData[0][0];

    if (currentRound === 9)
        return -1;
    return 0;
}

function endGame(winnerID)
{
    gameOverElement.style.display = 'block';

    if (winnerID > 0) 
        gameOverElement.firstElementChild.firstElementChild.textContent = players[winnerID - 1].name;
    else 
        gameOverElement.firstElementChild.textContent = 'It\'s a draw!';
}