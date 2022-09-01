/*


TODO OPTIONAL: make the AI unbeatable;


*/
const Gameboard = (() => {
    const winningBoard = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
    let playerOneArray = [];
    let playerTwoArray = [];
    const board =
        [``, ``, ``,
            ``, ``, ``,
            ``, ``, ``];
    const makeBoard = () => {
        const boardElement = document.getElementById(`board`);
        for (let i = 0; i < board.length; i++) {
            const cell = document.createElement(`div`);
            cell.classList.add(`cells`)
            cell.setAttribute(`id`, `cell${i}`);
            cell.innerText = board[i]
            boardElement.appendChild(cell);
        }
    }
    const resetBoard = () => {
        const boardElement = document.getElementById(`board`);
        while (boardElement.firstChild) {
            boardElement.removeChild(boardElement.lastChild);
        }
        Gameboard.makeBoard();
        Gameboard.playerOneArray = [];
        Gameboard.playerTwoArray = [];
        player1Count = 0;
        player2Count = 0;
        merged = [];
        turn = true;
        match = false;
        tie = false;
        winner = ``;
        if (document.getElementById(`checkbox1`).checked === true) {
            document.getElementById(`checkbox1`).checked = false;
        }
        if (document.getElementById(`checkbox1`).disabled === true) {
            document.getElementById(`checkbox1`).disabled = false;
        }
        if (hidden === true) {
            displaySlider();
        }
        const selectH2Element = document.getElementById(`winner`);
        selectH2Element.innerText = ``;
    }
    const displayWinner = () => {
        const selectH2Element = document.getElementById(`winner`)
        player1Count = 0;
        if (winner === `` || undefined) {
            selectH2Element.innerText = `Draw! No one wins this one.`;
            document.getElementById(`checkbox1`).checked = false;
        }
        else {
            selectH2Element.innerText = `${winner} is the winner!`
            document.getElementById(`checkbox1`).checked = false;
        }
        toggle();
    }
    return {
        makeBoard, board, winningBoard, playerOneArray, playerTwoArray, resetBoard, displayWinner
    };
})();
const Player = (sign) => {
    const mySign = () => {
        if (sign === `X`) {
            return sign;
        }
        else {
            return sign;
        }
    }
    const playerMove = () => {
        document.addEventListener(`click`, function (e) {
            if (match) {
                return;
            }
            if (e.target && e.target.classList == `cells`) {
                if (turn) {
                    sign = 'X'
                    if (e.target.innerText !== `` || undefined || null) {
                        return;
                    }
                    e.target.innerText = Player1.mySign();
                    let cellID = e.target.getAttribute(`id`).slice(-1);
                    Gameboard.playerOneArray.push(parseInt(cellID));
                    Gameboard.playerOneArray.sort();
                    findCommonElements(Gameboard.winningBoard, Gameboard.playerOneArray);
                    player1Count++;
                    if (player1Count === 1 && document.getElementById(`checkbox1`).checked === false) {
                        hideSlider();
                    }
                    if (match) {
                        winner = Player1.mySign();
                        Gameboard.displayWinner();
                        return;
                    }
                    turn = !turn;
                }
                if (document.getElementById(`checkbox1`).checked === true) {
                    document.getElementById(`checkbox1`).disabled = true;
                    if (player1Count === 5 && !match) {
                        tie = true;
                        Gameboard.displayWinner();
                        return;
                    }
                    let randomNumber = Math.floor(Math.random() * 8) + 1;
                    let randomElement = document.getElementById(`cell${randomNumber}`);
                    if (randomElement.innerText === `` && !turn) {
                        randomElement.innerText = Player2.mySign();
                        turn = !turn;
                        Gameboard.playerTwoArray.push(parseInt(randomNumber));
                        Gameboard.playerTwoArray.sort();
                        findCommonElements(Gameboard.winningBoard, Gameboard.playerTwoArray);
                        player2Count++;
                        if (match) {
                            winner = Player2.mySign();
                            Gameboard.displayWinner();
                            return;
                        }
                        return;
                    }
                    else {
                        if (player1Count === 5 && !match) {
                            tie = true;
                            Gameboard.displayWinner()
                            document.getElementById(`checkbox1`).checked = false;
                            return;
                        }
                        else {
                            while (count !== 10) {
                                randomElement.click();
                                count++;
                            }
                        }
                        count = 0;
                    }
                }
                else {
                    if (player1Count === 5 && player2Count === 4 && !match) {
                        tie = true;
                        Gameboard.displayWinner();
                        return;
                    }
                    sign = 'O';
                    if (e.target.innerText !== `` || undefined || null) {
                        return;
                    }
                    e.target.innerText = Player2.mySign();
                    let cellID = e.target.getAttribute(`id`).slice(-1);
                    Gameboard.playerTwoArray.push(parseInt(cellID));
                    Gameboard.playerTwoArray.sort();
                    findCommonElements(Gameboard.winningBoard, Gameboard.playerTwoArray);
                    player2Count++;
                    if (match) {
                        winner = Player2.mySign();
                        Gameboard.displayWinner();
                        return;
                    }
                    turn = !turn;
                }
                if (tie) {
                    Gameboard.displayWinner();
                }
            }
        })

    }
    return { sign, mySign, playerMove };
}
const Player1 = Player(`X`);
const Player2 = Player(`O`);
let match;
let tie;
let turn = true;
let merged;
let winner = ``;
let count = 0;
let player1Count = 0;
let player2Count = 0;
let hidden;
Gameboard.makeBoard();
function findCommonElements(arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
        merged = [].concat.apply([], arr1[i]);
        let filteredArray = arr2.filter(value => merged.includes(value));
        if (filteredArray.length === 3) {
            match = true;
        }
        else if (Gameboard.playerOneArray.length === 5 && Gameboard.playerTwoArray.length === 4) {
            tie = true;
        }
    }
}
function toggle() {
    let blur = document.getElementById(`blur`);
    blur.classList.toggle(`active`);
    let popup = document.getElementById(`popup`);
    popup.classList.toggle(`active`);
}
function hideSlider() {
    hidden = true;
    const slider = document.getElementById(`switch-slider`)
    const sliderText = document.getElementById(`switch-slider-text`)
    slider.style.opacity = 0;
    slider.style.visibility = "hidden";
    sliderText.style.opacity = 0;
    sliderText.style.visibility = "hidden";
}
function displaySlider() {
    hidden = false;
    const slider = document.getElementById(`switch-slider`)
    const sliderText = document.getElementById(`switch-slider-text`)
    slider.style.opacity = 100;
    slider.style.visibility = "visible";
    sliderText.style.opacity = 100;
    sliderText.style.visibility = "visible";

}


window.onload = Player1.playerMove();