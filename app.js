const gameBoard = document.querySelector('.game-board')
const playBtn = document.querySelector('.start');
const resetBtn = document.querySelector('.reset');

let current_player = 'X';
let board_values = ["","","","","","","","",""];
let isActive;

let playerStatus = document.querySelector('.status');

const winningCombination = [
    [0,1,2],[3,4,5],
    [6,7,8],[0,3,6],
    [1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
]
let winningCombo;

function multiplayerHuman(){

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
            gameBoard.innerHTML = '';
            board_values = ["","","","","","","","",""];
            playerStatus.textContent = '';
            playBtn.style.display = 'inline-block';
            resetBtn.style.display = 'none'
            multiplayerHuman()
        }
    }
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

function drawLine(combo, cells){
    
    if(combo[1] == 1){
        cells[1].style.position = 'relative';
        cells[1].innerHTML += `<div class='lineH'></div>`;
        setTimeout(()=>{
            document.querySelector('.lineH').style.transform = 'scale(1)'
        },50)
    }else if(combo[1] == 7){
        cells[7].style.position = 'relative';
        cells[7].innerHTML += `<div class='lineH'></div>`;
        setTimeout(()=>{
            document.querySelector('.lineH').style.transform = 'scale(1)'
        },50)
    }else if(combo[1] == 3){
        cells[3].style.position = 'relative';
        cells[3].innerHTML += `<div class='lineV'></div>`;
        setTimeout(()=>{
            document.querySelector('.lineV').style.transform = 'scale(1)'
        },50)
    }else if(combo[1] == 5){
        cells[5].style.position = 'relative';
        cells[5].innerHTML += `<div class='lineV'></div>`;
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

multiplayerHuman();