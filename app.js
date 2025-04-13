let current_player = 'X';
let board_values = ["","","","","","","","",""];
let isActive;

const gameBoard = document.querySelector('.game-board')
const playBtn = document.querySelector('.start');
const resetBtn = document.querySelector('.reset');

let playerStatus = document.querySelector('.status')
const crossSign = document.querySelector('.cross')

const winningCombination = [
    [0,1,2],[3,4,5],
    [6,7,8],[0,3,6],
    [1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
]
let winningCombo;

playBtn.onclick = () => {
    playerStatus.textContent = "Player X's turn"
    isActive = true;
    for (let i = 0; i < 9; i++){
        gameBoard.innerHTML += `<div class="cell" data-index=${i}></div>`
    }
    playerStatus.style.display = 'block';
    playBtn.style.display = 'none'

    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('click', ()=>{
            index = parseInt(cell.getAttribute('data-index'))
            if( isActive && board_values[index] == ""){
                board_values[index] = current_player;
                cell.textContent = current_player;

                if (checkWinner()){
                    winningCombo.forEach(combo => {
                        cells[combo].classList.add('winning-cells')
                    })
                    crossSign.style.transform = "scale(1)";
                    playerStatus.textContent = `Player ${current_player} wins`;
                    isActive = false;
                    resetBtn.style.display = 'inline-block';
                    return
                }

                if(checkDraw()){
                    crossSign.style.transform = "scale(1)";
                    playerStatus.textContent = "It's a Draw";
                    isActive = false;
                    resetBtn.style.display = 'inline-block';
                    return
                }
                current_player = current_player === 'X'? 'O' : 'X';
                playerStatus.textContent = `Player ${current_player}'s turn`;
            }
        });
    })
}

function checkWinner(){
    
    return winningCombination.some(combo => {
        winningCombo = [...combo];
        let [a,b,c] = combo;
        if( board_values[a] && board_values[b] && board_values[c]){
            return (board_values[a] == board_values[b] && board_values[a] == board_values[c])
        } 
    })
}

function checkDraw(){
    return board_values.every(val => val != "")
}

resetBtn.onclick = () => {
    crossSign.style.transform = "scale(0)";
    gameBoard.innerHTML = '';
    current_player = 'X';
    board_values = ["","","","","","","","",""];
    playerStatus.textContent = '';
    playBtn.style.display = 'inline-block';
    resetBtn.style.display = 'none'
}