const gameBoard = document.querySelector('.game-board')
const playMulBtn = document.querySelector('.start-human');
const playComBtn = document.querySelector('.start-computer');
const resetBtn = document.querySelector('.reset');
let playerStatus = document.querySelector('.status');

let current_player = 'X';
let board_values = ["","","","","","","","",""];
let isActive;

const winningCombination = [
    [0,1,2],[3,4,5],
    [6,7,8],[0,3,6],
    [1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
]
let winningCombo;

// ########################################### Playing with Human start here ###################################################
playMulBtn.onclick = ()=>{
    playComBtn.style.display = 'none';
    playMulBtn.style.display = 'none'
    multiplayerHuman()
}
function multiplayerHuman(){
    playerStatus.textContent = "Player X's turn"
    isActive = true;
    for (let i = 0; i < 9; i++){
        gameBoard.innerHTML += `<div class="cell" data-index=${i}></div>`
    }
    playerStatus.style.display = 'block';

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
                    drawLine(winningCombo, cells);
                    playerStatus.textContent = `Player ${current_player} wins`;
                    isActive = false;
                    resetBtn.style.display = 'inline-block';
                    return
                }

                if(checkDraw()){
                    playerStatus.textContent = "It's a Draw";
                    isActive = false;
                    resetBtn.style.display = 'inline-block';
                    return
                }
                current_player = current_player === 'X'? 'O' : 'X';
                playerStatus.textContent = `Player ${current_player}'s turn`;
            }
        });
    });
    resetBtn.onclick = () => {
        resetGame()
    }
}
// ########################################### Playing with Human end here ###################################################


// ########################################### Playing with Computer start here ###################################################
playComBtn.onclick = ()=>{
    playComBtn.style.display = 'none';
    playMulBtn.style.display = 'none';
    multiplayerComputer()
}
let whosTurn = 'Your'
function multiplayerComputer(){
    playerStatus.textContent = "Your turn"
    isActive = true;
    for (let i = 0; i < 9; i++){
        gameBoard.innerHTML += `<div class="cell" data-index=${i}></div>`
    }
    playerStatus.style.display = 'block';

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
                    drawLine(winningCombo, cells);
                    playerStatus.textContent = `You win`;
                    isActive = false;
                    resetBtn.style.display = 'inline-block';
                    return
                }

                if(checkDraw()){
                    playerStatus.textContent = "It's a Draw";
                    isActive = false;
                    resetBtn.style.display = 'inline-block';
                    return
                }
                whosTurn = whosTurn === 'Your'? "Computer's" : 'Your';
                playerStatus.textContent = `${whosTurn} turn`;
                setTimeout(()=>{
                    computerTurn(cells)
                },400);
            }
        });
    });
    resetBtn.onclick = () => {
        resetGame()
    }
}

function computerTurn(cells){
    let rightMove = getRightMove()

    if (rightMove != null){
        board_values[rightMove] = "O";
        cells[rightMove].textContent = "O"

        if (checkWinner()){
            winningCombo.forEach(combo => {
                cells[combo].classList.add('winning-cells')
            })
            drawLine(winningCombo, cells);
            playerStatus.textContent = `Computer Win`;
            isActive = false;
            resetBtn.style.display = 'inline-block';
            return
        }
    
        if(checkDraw()){
            playerStatus.textContent = "It's a Draw";
            isActive = false;
            resetBtn.style.display = 'inline-block';
            return
        }

        whosTurn = whosTurn === 'Your'? "Computer's" : 'Your';
        playerStatus.textContent = `${whosTurn} turn`;
    }
}
// ########################################### Playing with Computer end here ###################################################


// ########################################## necessary functions #############################################
function getRightMove(){
    // move to win
    for(let combo of winningCombination){
        let [a,b,c] = combo;
        let values = [board_values[a], board_values[b], board_values[c]];
        if(values.filter(val => val === "O").length > 1  && values.includes("")){
            return combo[values.indexOf("")]
        }
    }

    // move to block the win of user
    for(let combo of winningCombination){
        let [a,b,c] = combo;
        let values = [board_values[a], board_values[b], board_values[c]];
        if(values.filter(val => val === "X").length > 1  && values.includes("")){
            return combo[values.indexOf("")]
        }
    }

    // if nothing happens in those 2 then pick a random move
    let indexToPick = board_values.map((val,index) => val == ""? index : null)
                      .filter(val => val != null);
    if(board_values[4] == ""){
        return 4
    }
    else if(indexToPick){
        let randomIndex = Math.floor(Math.random() * indexToPick.length);
        return indexToPick[randomIndex]
    }

    return null

}


function checkWinner(){
    return winningCombination.some(combo => {
        winningCombo = [...combo];
        let [a,b,c] = combo;
        if( board_values[a] && board_values[b] && board_values[c]){
            return (board_values[a] == board_values[b] && board_values[a] == board_values[c])
        } 
    })
};

function checkDraw(){
    return board_values.every(val => val != "")
};

function resetGame(){
    gameBoard.innerHTML = '';
    board_values = ["","","","","","","","",""];
    playerStatus.textContent = '';
    playMulBtn.style.display = 'inline-block';
    playComBtn.style.display = 'inline-block'
    resetBtn.style.display = 'none'
};

function drawLine(combo, cells){
    if(combo[1] == 1 || combo[1] == 7){
        cells[combo[1]].style.position = 'relative';
        cells[combo[1]].innerHTML += `<div class='lineH'></div>`;
        setTimeout(()=>{
            document.querySelector('.lineH').style.transform = 'scale(1)'
        },50)
    }
    else if(combo[1] == 3 || combo[1] == 5){
        cells[combo[1]].style.position = 'relative';
        cells[combo[1]].innerHTML += `<div class='lineV'></div>`;
        setTimeout(()=>{
            document.querySelector('.lineV').style.transform = 'scale(1)'
        },50)
    }else{
        if(combo[1] == 4){
            switch(true){
                case combo[0] == 1:
                    cells[4].style.position = 'relative';
                    cells[4].innerHTML += `<div class='lineV'></div>`;
                    setTimeout(()=>{
                        document.querySelector('.lineV').style.transform = 'scale(1)'
                    },50)
                    return
                case combo[0] == 3:
                    cells[4].style.position = 'relative';
                    cells[4].innerHTML += `<div class='lineH'></div>`;
                    setTimeout(()=>{
                        document.querySelector('.lineH').style.transform = 'scale(1)'
                    },50);
                    return
                case combo[0] == 0:
                    cells[4].style.position = 'relative';
                    cells[4].innerHTML += "<div class='line-DLB'></div>";
                    setTimeout(()=>{
                        document.querySelector('.line-DLB').style.transform = 'rotate(-45deg) scale(1)'
                    },50) 
                    return
                case combo[0] == 2:
                    cells[4].style.position = 'relative';
                    cells[4].innerHTML += "<div class='line-DRB'></div>";
                    setTimeout(()=>{
                        document.querySelector('.line-DRB').style.transform = 'rotate(45deg) scale(1)'
                    },50)
                    return
            }
        }
    }
}