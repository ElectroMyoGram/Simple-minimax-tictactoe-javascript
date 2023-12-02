class ai{
    constructor(){
        this.depth = 9;
        this.gameGrid = [...Array(3)].map(e=>Array(3).fill(''));
        this.minimax_sides = {
            X: -1,
            O: 1
        }
        this.maximisingPlayer;
        this.side;
        
        
    }

    makeAiMove(current_position){
        this.gameGrid = [...current_position];
        let ai_move_evaluation =this.minimax(this.depth, false, 0);
        let move = this.availableMoves(this.gameGrid)[ai_move_evaluation[0]];
        console.log(JSON.parse(JSON.stringify(this.gameGrid)));

        return move;
    }

    evaluate(){
        let evaluation = 0;
        let check_win = this.checkWin(this.gameGrid)
        if (check_win !== null){
            evaluation = 10 * this.minimax_sides[check_win];
        }
        return evaluation;
    }


    checkWin(board) {
        // Check rows and columns
        for (let i = 0; i < 3; i++) {
            if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== '') {
                return board[i][0]; // Winner in a row
            }
            if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== '') {
                return board[0][i]; // Winner in a column
            }
        }
    
        // Check diagonals
        if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== '') {
            return board[0][0]; // Winner in the first diagonal
        }
        if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== '') {
            return board[0][2]; // Winner in the second diagonal
        }
    
        return null; // No winner yet
    }
    



    minimax(depth, isMaximisingPlayer, indexMove){
        if (depth === 0 || this.checkWin(this.gameGrid) || this.availableMoves().length === 0){
            return [indexMove, this.evaluate()];
        }

        let side = (depth % 2 == 0) ? 'O' : 'X';
        
        let aMoves = this.availableMoves();
        if (isMaximisingPlayer){
            let maxEvaluation = Number.NEGATIVE_INFINITY;
            let maxIndex = 0;

            for (let index = 0; index < aMoves.length; index++){
                this.move(aMoves[index], side, depth);
                let evaluation = this.minimax(depth-1, !isMaximisingPlayer, index);
                if (evaluation[1] > maxEvaluation){
                    maxEvaluation = evaluation[1];
                    maxIndex = index;
                }
                this.unmove(aMoves[index]);
            }
            return [maxIndex,maxEvaluation]; 
        }
        
        else {
            let minEvaluation = Number.POSITIVE_INFINITY;
            let minIndex = 0;

            for (let index = 0; index < aMoves.length; index++){
                this.move(aMoves[index], side, depth);
                let evaluation = this.minimax(depth-1, !isMaximisingPlayer, index);

                if (evaluation[1] < minEvaluation){
                    minEvaluation = evaluation[1];
                    minIndex = index;
                }

                this.unmove(aMoves[index]);
            }
            return [minIndex,minEvaluation]; 
        }    
    }

    availableMoves(){
        let moves = [];
        for (let y = 0; y < 3; y++){
            for (let x = 0; x < 3; x++){
                let cell = this.gameGrid[y][x];
                if (cell === ''){
                    moves.push([x,y]);
                }
            }
        }
        return moves
    }

    move(move, side, depth){

        this.gameGrid[move[1]][move[0]] = side;

    }
    unmove(move){
        this.gameGrid[move[1]][move[0]] = '';
    }
}