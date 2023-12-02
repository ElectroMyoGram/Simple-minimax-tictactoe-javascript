let board = document.getElementById('board')
let ui_instance = new ui(board);
ui_instance.create_canvas(3, 3);
let current_side = 'O'
let gameGrid = [...Array(3)].map(e=>Array(3).fill(''))


let ai_instance = new ai();
let ai_side = 'X';
ai_instance.side = ai_side;
ai_instance.maximising_player = (ai_instance.minimax_sides[ai_side] === Math.max(...Object.values(ai_instance.minimax_sides)));

document.addEventListener('DOMContentLoaded', function(){
    board.addEventListener('click', function(event){
        const clickedElement = event.target;

        //check if the clicked element is a cell
        if (clickedElement.tagName === 'TD') {
            const rowIndex = clickedElement.dataset.row;
            const columnIndex = clickedElement.dataset.column;

            if (!gameGrid[rowIndex][columnIndex]){
                makeMove(columnIndex, rowIndex, clickedElement);
            }
        }
    })
})

function makeMove(x, y, cell){
    gameGrid[y][x] = current_side;
    cell.innerHTML = current_side;
    check_win();
    check_draw();
    switchSide();

}

function switchSide(){
    current_side = current_side === 'X' ? 'O' : 'X';
    if (current_side === ai_side){

        let ai_move = ai_instance.makeAiMove(gameGrid);

        let cell = document.querySelector('table').rows[ai_move[1]].cells[ai_move[0]];
        makeMove(ai_move[0], ai_move[1], cell);
    }
}

function check_draw(){
    const board = document.querySelector('table');
    d = true
    for (let y = 0; y < 3; y++){
        let row = board.rows[y];
        for (let x = 0; x < 3; x++){
            if (row.cells[x].innerHTML === ''){ d = false; break;}
        }
    }
    if (d){
        endGame(true);
    }
}


function check_win(){

    const board = document.querySelector('table');
    // Check rows and columns
    for (let i = 0; i < 3; i++) {
        if (board.rows[i].cells[0].innerHTML === board.rows[i].cells[1].innerHTML && board.rows[i].cells[1].innerHTML === board.rows[i].cells[2].innerHTML && board.rows[i].cells[0].innerHTML !== '') {
            endGame()
        }
        if (board.rows[0].cells[i].innerHTML === board.rows[1].cells[i].innerHTML && board.rows[1].cells[i].innerHTML === board.rows[2].cells[i].innerHTML && board.rows[0].cells[i].innerHTML !== '') {
            endGame()
        }
    }

    // Check diagonals
    if (board.rows[0].cells[0].innerHTML === board.rows[1].cells[1].innerHTML && board.rows[1].cells[1].innerHTML === board.rows[2].cells[2].innerHTML && board.rows[0].cells[0].innerHTML !== '') {
        endGame()
    }
    if (board.rows[0].cells[2].innerHTML === board.rows[1].cells[1].innerHTML && board.rows[1].cells[1].innerHTML === board.rows[2].cells[0].innerHTML && board.rows[0].cells[2].innerHTML !== '') {
        endGame()
    }

}

function endGame(d = false){
    if (d){
        alert("Draw");
    }
    else{
        alert("Winner: " + current_side);
    }
    
    gameGrid.forEach((row)=>{
        row.fill('');
    })
    ui_instance.render_board(gameGrid);
}


function generateMoves(){
    let availableMoves = [];
    for (let y = 0; y < 3; y++){
        for (let x = 0; x < 3; x++){
            let cell = gameGrid[y][x];
            if (cell === ''){
                availableMoves.push([x,y]);
            }
        }
    }
    return availableMoves
}