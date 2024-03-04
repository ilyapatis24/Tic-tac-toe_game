"use strict";

let players = ['x', 'o'];
let activePlayer = 0;
let board = [];

let makeField = () => {
    let scale;
    do {
        scale = +prompt(
            "Введите ширину поля для игры в количестве клеток (не менее 3):"
        );
    } while ((scale <= 2 && scale) || !scale);
    return scale;
}

function checkFullField(field) {
    if (board.length > field) {
        board = [];
    }
}

// Создание игрового поля:
let drawField = (arr, number) => {
    for (let i = 0; i < number; i++) {
        arr[i] = [];
        for (let j = 0; j < number; j++) {
            arr[i][j] = "";
        }
    }
}

let checkActivePlayer = () => {
    if (activePlayer === 0) {
        activePlayer = 1;
    } else {
        activePlayer = 0;
    }
}

let checkWin = (board, row, column) => {
    let countRow = 0;
    let countColumn = 0;
    let countStepDown = 0;
    let countStepUp = 0;

    for (let i = 0; i < board.length; i++) {
        // Проверка строк:
        if (board[row][i] === players[activePlayer]) {
            countRow += 1;
        }
        // Проверка столбцов:
        if (board[i][column] === players[activePlayer]) {
            countColumn += 1;
        }
        // Проверка главной диагонали:
        if (board[i][i] === players[activePlayer]) {
            countStepDown += 1;
        }
        // Проверка побочной диагонали:
        let j = board[i].length - 1 - i;
        if (board[j][i] === players[activePlayer]) {
            countStepUp += 1;
        }
    }

    if (
        countRow === board.length ||
        countColumn === board.length ||
        countStepDown === board.length ||
        countStepUp === board.length
        ) {
        showWinner(activePlayer);
    }
}

let startGame = () => {
    let field = makeField();

    checkFullField(field);

    drawField(board, field);

    activePlayer = 0;

    renderBoard(board);
}

let click = (row, column) => {
    board[row][column] = players[activePlayer];
    checkWin(board, row, column);

    renderBoard(board);
    console.log(board);

    checkActivePlayer();
}


