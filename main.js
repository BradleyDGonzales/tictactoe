/*


TODO OPTIONAL: versus AI MACHINE LEARNING (robot)


*/
const Gameboard = (() => {
    const winningBoard = [ [0,1,2],[3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6] ]
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
        merged = [];
        turn = true;
        match = false;
        tie = false;
        winner = ``;
        const selectH2Element = document.getElementById(`winner`);
        selectH2Element.innerText = ``;
    }
    const displayWinner = () => {
        const selectH2Element = document.getElementById(`winner`)
        if (winner === `` || undefined) {
            console.log(`draw`);
            selectH2Element.innerText = `Draw! No one wins this one.`;
        }
        else {
            selectH2Element.innerText = `${winner} is the winner!`
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
        document.addEventListener(`click`, function(e) {
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
                    findCommonElements(Gameboard.winningBoard,Gameboard.playerOneArray);
                    if (match) {
                        winner = Player1.mySign();
                        console.log(`p1 wins`)
                        Gameboard.displayWinner();
                        return;
                    }
                    
                }
                else {
                    sign = 'O';;
                    if (e.target.innerText !== `` || undefined || null) {
                        return;
                    }
                    e.target.innerText = Player2.mySign();
                    let cellID = e.target.getAttribute(`id`).slice(-1);
                    Gameboard.playerTwoArray.push(parseInt(cellID));
                    Gameboard.playerTwoArray.sort();
                    findCommonElements(Gameboard.winningBoard,Gameboard.playerTwoArray);
                    if (match) {
                        winner = Player2.mySign();
                        console.log(`p2 wins`)
                        Gameboard.displayWinner();
                        return;
                    }
                }
                if (tie) {
                    Gameboard.displayWinner();
                }
                turn = !turn;
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
Gameboard.makeBoard();
function findCommonElements (arr1,arr2) {
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

window.onload = Player1.playerMove();