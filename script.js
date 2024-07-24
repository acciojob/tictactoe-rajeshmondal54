document.addEventListener('DOMContentLoaded', () => {
    const player1Input = document.getElementById('player1');
    const player2Input = document.getElementById('player2');
    const submitButton = document.getElementById('submit');
    const gameBoard = document.getElementById('game-board');
    const playerSetup = document.getElementById('player-setup');
    const cells = document.querySelectorAll('.cell');
    const messageDiv = document.querySelector('.message');
    
    let currentPlayer = 'X';
    let player1Name = '';
    let player2Name = '';
    let boardState = Array(9).fill(null);

    submitButton.addEventListener('click', () => {
        player1Name = player1Input.value.trim();
        player2Name = player2Input.value.trim();

        if (player1Name && player2Name) {
            playerSetup.classList.add('hidden');
            gameBoard.classList.remove('hidden');
            messageDiv.textContent = `${player1Name}, you're up`;
        } else {
            alert('Please enter names for both players');
        }
    });

    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            const cellId = parseInt(cell.id) - 1;

            if (boardState[cellId] || checkWinner()) return;

            boardState[cellId] = currentPlayer;
            cell.textContent = currentPlayer;

            if (checkWinner()) {
                messageDiv.textContent = `${currentPlayer === 'X' ? player1Name : player2Name} congratulations you won!`;
                return;
            }

            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            messageDiv.textContent = `${currentPlayer === 'X' ? player1Name : player2Name}, you're up`;
        });
    });

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                cells[a].classList.add('winner');
                cells[b].classList.add('winner');
                cells[c].classList.add('winner');
                return true;
            }
        }

        return boardState.every(cell => cell) ? alert("It's a draw!") : false;
    }
});
