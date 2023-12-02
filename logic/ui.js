class ui{
    constructor(board_container){
        this.board_container = board_container;
    }

    create_canvas(w, h){
        let board = document.createElement('table');
        board.className = 'game-table'

        for (let x = 0; x < w; x ++ ){
            let row = board.insertRow();
            for (let y = 0; y < h; y++){
                let cell = row.insertCell();
                cell.style.border = '1px solid black';
                cell.style.textAlign = 'center';
                cell.style.verticalAlign = 'middle';
                cell.style.fontSize = '20px';
                cell.style.cursor = 'pointer';
                cell.style.width = String(CELL_SIZE) + 'px';
                cell.style.height = String(CELL_SIZE) + 'px';

                cell.dataset.row = x;
                cell.dataset.column = y;
            }
        }
        this.board_container.append(board);
    }

    render_board(grid){
        const board = document.querySelector('table');

        for (let i = 0; i < grid.length; i++){
            for (let j = 0; j < gameGrid[i].length; j++){
                let cell = board.rows[i].cells[j];
                cell.innerHTML = gameGrid[i][j];
            }
        }
    }
}
