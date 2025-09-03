const board = document.getElementById('board');
const resetBtn = document.getElementById('resetBtn');
const aboutBtn = document.getElementById('aboutBtn');
const difficultySelect = document.getElementById('difficulty');
const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popup-message');
const popupClose = document.getElementById('popup-close');

let cells = [];
let gameState = Array(9).fill(null);
let currentPlayer = 'O';
let gameActive = true;

function showPopup(message) {
    popupMessage.textContent = message;
    popup.style.display = 'flex';
}

popupClose.onclick = () => {
    popup.style.display = 'none';
};

function renderBoard() {
    board.innerHTML = '';
    cells = [];
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.index = i;
        cell.addEventListener('click', onCellClick);
        cells.push(cell);
        board.appendChild(cell);
    }
    updateBoard();
}

function updateBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = cells[i];
        cell.textContent = '';
        cell.classList.remove('active-o', 'active-x', 'disabled');
        if (gameState[i] === 'O') {
            cell.textContent = 'O';
            cell.classList.add('active-o', 'disabled');
        } else if (gameState[i] === 'X') {
            cell.textContent = 'X';
            cell.classList.add('active-x', 'disabled');
        }
    }
}

function onCellClick(e) {
    const idx = +e.target.dataset.index;
    if (!gameActive || gameState[idx]) return;
    gameState[idx] = currentPlayer;
    updateBoard();
    if (checkWinner(currentPlayer)) {
        setTimeout(() => {
            showPopup(`${currentPlayer === 'O' ? 'You' : 'CPU'} wins!`);
            autoReset();
        }, 100);
        gameActive = false;
        return;
    }
    if (gameState.every(cell => cell)) {
        setTimeout(() => {
            showPopup('Draw!');
            autoReset();
        }, 100);
        gameActive = false;
        return;
    }
    currentPlayer = currentPlayer === 'O' ? 'X' : 'O';
    if (currentPlayer === 'X') {
        setTimeout(cpuMove, 400);
    }
}

function cpuMove() {
    if (!gameActive) return;
    let bestMove;
    const difficulty = difficultySelect.value;

    if (difficulty === 'easy') {
        const emptyCells = gameState.map((v, i) => v ? null : i).filter(i => i !== null);
        bestMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    } else if (difficulty === 'medium') {
        bestMove = findBlockingMove(gameState, 'O');
        if (bestMove === null) {
            const emptyCells = gameState.map((v, i) => v ? null : i).filter(i => i !== null);
            bestMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        }
    } else {
        bestMove = findBestMove(gameState);
    }

    if (bestMove !== null) {
        gameState[bestMove] = 'X';
        updateBoard();
        if (checkWinner('X')) {
            setTimeout(() => {
                showPopup('CPU wins!');
                autoReset();
            }, 100);
            gameActive = false;
            return;
        }
        if (gameState.every(cell => cell)) {
            setTimeout(() => {
                showPopup('Draw!');
                autoReset();
            }, 100);
            gameActive = false;
            return;
        }
        currentPlayer = 'O';
    }
}

function findBlockingMove(state, player) {
    for (let i = 0; i < 9; i++) {
        if (!state[i]) {
            state[i] = player;
            if (checkWinner(player, state)) {
                state[i] = null;
                return i;
            }
            state[i] = null;
        }
    }
    return null;
}

function findBestMove(state) {
    let bestScore = -Infinity;
    let move = null;
    for (let i = 0; i < 9; i++) {
        if (!state[i]) {
            state[i] = 'X';
            let score = minimax(state, 0, false);
            state[i] = null;
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    return move;
}

function minimax(state, depth, isMaximizing) {
    if (checkWinner('X', state)) return 10 - depth;
    if (checkWinner('O', state)) return depth - 10;
    if (state.every(cell => cell)) return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (!state[i]) {
                state[i] = 'X';
                let score = minimax(state, depth + 1, false);
                state[i] = null;
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (!state[i]) {
                state[i] = 'O';
                let score = minimax(state, depth + 1, true);
                state[i] = null;
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function checkWinner(player, state = gameState) {
    const winPatterns = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];
    return winPatterns.some(pattern =>
        pattern.every(idx => state[idx] === player)
    );
}

function autoReset() {
    setTimeout(() => {
        gameState = Array(9).fill(null);
        currentPlayer = 'O';
        gameActive = true;
        renderBoard();
    }, 800);
}

resetBtn.onclick = () => {
    gameState = Array(9).fill(null);
    currentPlayer = 'O';
    gameActive = true;
    renderBoard();
};

aboutBtn.onclick = () => {
    showPopup('Tic Tac Toe [XO] game\n\nYou play as O. CPU plays as X.');
};

renderBoard();