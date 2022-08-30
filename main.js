const Gameboard = (() => {
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
    const winningBoard = [ [0,1,2],[3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6] ]
    const playerOneArray = [];
    const playerTwoArray = [];
    return {
        makeBoard, board, winningBoard, playerOneArray, playerTwoArray
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

            if (e.target && e.target.classList == `cells`) {
                if (turn) {
                    console.log(`P1 TURN!!`)
                    sign = 'X'
                    if (e.target.innerText !== `` || undefined || null) {
                        return;
                    }
                    e.target.innerText = Player1.mySign();
                    let cellID = e.target.getAttribute(`id`).slice(-1);
                    Gameboard.board.splice(cellID, 1, sign);
                    console.log(Gameboard.board);
                    Gameboard.playerOneArray.push(cellID);
                    console.log(`playeronearray: `, Gameboard.playerOneArray);
                    
                }
                else {
                    console.log(`P2 TURN!!`);
                    sign = 'O';;
                    if (e.target.innerText !== `` || undefined || null) {
                        return;
                    }
                    e.target.innerText = Player2.mySign();
                    let cellID = e.target.getAttribute(`id`).slice(-1);
                    Gameboard.board.splice(cellID, 1, sign);
                    console.log(Gameboard.board);
                    Gameboard.playerTwoArray.push(cellID);
                    console.log(`playertwoarray: `, Gameboard.playerTwoArray);
                }
                turn = !turn;
            }
        })
        
    }
    return { sign, mySign, playerMove };
}

const Player1 = Player(`X`);
const Player2 = Player(`O`);
let turn = true;
Gameboard.makeBoard();
window.onload = Player1.playerMove();