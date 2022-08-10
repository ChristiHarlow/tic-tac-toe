let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
];

const updateHTML = () => {
    let html = "<div id='board'>";
    let buttonNum = 1;
    for (const row of board) {
        html += `<div class="row">`;
        for (const col of row) {
            html += `<button onclick="buttonClicked(event)" class="myClassButton" id="b${buttonNum}">${
                col || "&nbsp;&nbsp;"
            }</button>`;
            buttonNum++; //buttonNum = buttonNum + 1;
        }
        html += `</div>`;
    }
    html += `</div>`;

    document.getElementById("container").innerHTML = html;
    //document.getElementById("container").style = "border: 1px solid red;";
    //document.getElementById("container").classList.add("borderClass");
};

// SOURCE: https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
const randomNumberBetween = (min, max) => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const computerRandomTurn = () => {
    let emptyRowIndex, emptyColIndex;
    let numLoopRuns = 0;
    while (!emptyRowIndex && numLoopRuns < 1000) {
        let randomRow = randomNumberBetween(0, 2);
        let randomCol = randomNumberBetween(0, 2);

        if (!board[randomRow][randomCol]) {
            emptyRowIndex = randomRow;
            emptyColIndex = randomCol;
        }

        numLoopRuns++;
    }

    if (numLoopRuns > 999) {
        alert(
            "Infinite loop detected. Computer couldn't find empty spot to play. Everyone panic."
        );
    } else {
        // setTimeout(() => {
        board[emptyRowIndex][emptyColIndex] = "o";
        // updateHTML();
        // }, 2000);
    }
};

const computerBlockOrRandomTurn = () => {
    //check all rows
    if (board[0][0] === "x" && board[0][1] === "x" && board[0][2] !== "o") {
        //top right
        board[0][2] = "o";
    } else if (
        board[0][1] === "x" &&
        board[0][2] === "x" &&
        board[0][0] !== "o"
    ) {
        //top left
        board[0][0] = "o";
    } else if (
        board[0][0] === "x" &&
        board[0][2] === "x" &&
        board[0][1] !== "o"
    ) {
        //top center
        board[0][1] = "o";
    } else if (
        board[1][0] === "x" &&
        board[1][1] === "x" &&
        board[1][2] !== "o"
    ) {
        //middle right
        board[1][2] = "o";
    } else if (
        board[1][1] === "x" &&
        board[1][2] === "x" &&
        board[1][0] !== "o"
    ) {
        //middle left
        board[1][0] = "o";
    } else if (
        board[1][0] === "x" &&
        board[1][2] === "x" &&
        board[1][1] !== "o"
    ) {
        //middle center
        board[1][1] = "o";
    } else if (
        board[2][0] === "x" &&
        board[2][1] === "x" &&
        board[2][2] !== "o"
    ) {
        //bottom right
        board[2][2] = "o";
    } else if (
        board[2][1] === "x" &&
        board[2][2] === "x" &&
        board[2][0] !== "o"
    ) {
        //bottom left
        board[2][0] = "o";
    } else if (
        board[2][0] === "x" &&
        board[2][2] === "x" &&
        board[2][1] !== "o"
    ) {
        //bottom center
        board[2][1] = "o"; //all rows have been checked, now start all cols
    } else if (
        board[0][0] === "x" &&
        board[1][0] === "x" &&
        board[2][0] !== "o"
    ) {
        //bottom left
        board[2][0] = "o";
    } else if (
        board[0][0] === "x" &&
        board[2][0] === "x" &&
        board[1][0] !== "o"
    ) {
        //center left
        board[1][0] = "o";
    } else if (
        board[0][1] === "x" &&
        board[0][2] === "x" &&
        board[0][0] !== "o"
    ) {
        //top left
        board[0][0] = "o";
    } else if (
        board[0][1] === "x" &&
        board[1][1] === "x" &&
        board[2][1] !== "o"
    ) {
        //bottom center
        board[2][1] = "o";
    } else if (
        board[0][1] === "x" &&
        board[2][1] === "x" &&
        board[1][1] !== "o"
    ) {
        //center center
        board[1][1] = "o";
    } else if (
        board[1][1] === "x" &&
        board[2][1] === "x" &&
        board[0][1] !== "o"
    ) {
        //top center
        board[0][1] = "o";
    } else if (
        board[1][2] === "x" &&
        board[2][2] === "x" &&
        board[2][0] !== "o"
    ) {
        //right top
        board[2][0] = "o";
    } else if (
        board[0][2] === "x" &&
        board[2][2] === "x" &&
        board[1][2] !== "o"
    ) {
        //right center
        board[1][2] = "o";
    } else if (
        board[0][2] === "x" &&
        board[1][2] === "x" &&
        board[2][2] !== "o"
    ) {
        //right bottom
        board[2][2] = "o";
    } else {
        //TODO: Block diagonal wins
        computerRandomTurn();
    }
};

const checkGameStatusRefactored = () => {
    /* check all the rows col, by col to see if there is a winner */
    //get each row from the board
    for (const row of board) {
        //assume the winner if the value in the first column
        let winner = row[0];
        //loop through each column
        for (const col of row) {
            //check the current column against the last one we checked
            if (col === winner) {
                //if it's the same, store it so can compare it against the next column
                winner = col;
            } else {
                // if it's not the same, this row is not a winner
                winner = null; //clear winner
                break; //stop running through the col and move onto the next row
            }
        }
        //we've made it out of the column loop, so we must have checked the entire row
        if (winner) {
            //if winner is not an empty string, we must have one so return it out
            return winner;
        }
    }

    /* check each col, row by row, to see if there is a winner */
    //for each column, up to three columns, increment the col index by one
    for (let colIndex = 0; colIndex < 3; colIndex++) {
        //assume the winner is the value in row zero (top of the column) of whatever colIndex are we on
        let winner = board[0][colIndex];
        //loop over each row in the column of the outer for loop
        for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
            //check if the current row & col are equal to the last value (winner)
            if (board[rowIndex][colIndex] === winner) {
                //it matches the last one, so keep track of it so we can compare it to the next on
                winner = board[rowIndex][colIndex];
            } else {
                //it doesn't match so this col isn't a winner, stop the inner loop and move onto the next row
                winner = null;
                break;
            }
        }
        if (winner) {
            return winner;
        }
    }

    //assume winner is letter in the top left col
    let winner = board[0][0];
    //loop over the three diagonal indexes ([0][0], [1][1], and [2][2])
    for (let diagonalIndex = 0; diagonalIndex < 3; diagonalIndex++) {
        //compare the double index to the last letter we checked
        if (board[diagonalIndex][diagonalIndex] === winner) {
            //if it is, then store it compare it to the next diagonal index the next time the loop runs
            winner = board[diagonalIndex][diagonalIndex];
        } else {
            //the letter doesn't match the last one, so there must not be a diagonal win, stop the loop and clear the winner
            winner = null;
            break;
        }
    } //we've made it to the end of the loop, which means we've checked all three diagonal spots
    if (winner) {
        //if the winner hasn't been cleared out here, they must have won diagonally
        return winner;
    }

    /*check the diagonal from right to left*/
    winner = board[0][2]; //assume the top right is the winner
    //loop through each row
    for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
        let colIndex = 2 - rowIndex; //check index 2, then 1, then 0
        // for ( colIndex >= 0; colIndex--) { //we no longer need this loop because we're checking the inverse index of the row
        if (board[rowIndex][colIndex] === winner) {
            //if it is the same of the last one we checked, then store it compare it to the next diagonal index the next time the loop runs
            winner = board[rowIndex][colIndex];
            // break;
        } else {
            //the letter doesn't match the last one, so there must not be a diagonal win, stop the loop and clear the winner
            winner = null;
        }
        // } //the closing curly brace the loop we didn't end up needing
    }
    if (winner) {
        return winner;
    }
};

//depreciated in favor of refactored version using loops
//this function does not check diagonals where the refactor version does
const checkGameStatus = () => {
    if (board[0][0] === "x" && board[0][1] === "x" && board[0][2] === "x") {
        //check first row
        return "x";
    } else if (
        board[1][0] === "x" &&
        board[1][1] === "x" &&
        board[1][2] === "x"
    ) {
        //check second row
        return "x";
    } else if (
        board[2][0] === "x" &&
        board[2][1] === "x" &&
        board[2][2] === "x"
    ) {
        //check third row
        return "x";
    } else if (
        board[0][0] === "x" &&
        board[1][0] === "x" &&
        board[2][0] === "x"
    ) {
        //check first column
        return "x";
    } else if (
        board[0][1] === "x" &&
        board[1][1] === "x" &&
        board[2][1] === "x"
    ) {
        //check second column
        return "x";
    } else if (
        board[0][2] === "x" &&
        board[1][2] === "x" &&
        board[2][2] === "x"
    ) {
        //check third column
        return "x";
    } else if (
        board[0][0] === "x" &&
        board[1][1] === "x" &&
        board[2][2] === "x"
    ) {
        //check left to right diagonal
        return "x";
    } else if (
        board[2][0] === "x" &&
        board[1][1] === "x" &&
        board[0][2] === "x"
    ) {
        //check right to left diagonal
        return "x";
    }

    if (board[0][0] === "o" && board[0][1] === "o" && board[0][2] === "o") {
        //check first row
        return "o";
    } else if (
        board[1][0] === "o" &&
        board[1][1] === "o" &&
        board[1][2] === "o"
    ) {
        //check second row
        return "o";
    } else if (
        board[2][0] === "o" &&
        board[2][1] === "o" &&
        board[2][2] === "o"
    ) {
        //check third row
        return "o";
    } else if (
        board[0][0] === "o" &&
        board[1][0] === "o" &&
        board[2][0] === "o"
    ) {
        //check first column
        return "o";
    } else if (
        board[0][1] === "o" &&
        board[1][1] === "o" &&
        board[2][1] === "o"
    ) {
        //check second column
        return "o";
    } else if (
        board[0][2] === "o" &&
        board[1][2] === "o" &&
        board[2][2] === "o"
    ) {
        //check third column
        return "o";
    } else if (
        board[0][0] === "o" &&
        board[1][1] === "o" &&
        board[2][2] === "o"
    ) {
        //check left to right diagonal
        return "o";
    } else if (
        board[2][0] === "o" &&
        board[1][1] === "o" &&
        board[0][2] === "o"
    ) {
        //check right to left diagonal
        return "o";
    }
};

const alertWinnerAndClearBoard = (gameWinner) => {
    setTimeout(() => {
        alert(`${gameWinner} has won`);
        board = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
        ];
        updateHTML();
    }, 100);
};

//event handler that runs whenever the person clicks on a button in the HTML
//updates the board based off what button they clicked on, checks to see if they won
//then makes the computer block or play a random space, then checks to see if the computer
//won
const buttonClicked = (event) => {
    const buttonID = event.target.id;
    if (buttonID === "b1") {
        board[0][0] = "x";
    } else if (buttonID === "b2") {
        board[0][1] = "x";
    } else if (buttonID === "b3") {
        board[0][2] = "x";
    } else if (buttonID === "b4") {
        board[1][0] = "x";
    } else if (buttonID === "b5") {
        board[1][1] = "x";
    } else if (buttonID === "b6") {
        board[1][2] = "x";
    } else if (buttonID === "b7") {
        board[2][0] = "x";
    } else if (buttonID === "b8") {
        board[2][1] = "x";
    } else if (buttonID === "b9") {
        board[2][2] = "x";
    }

    let gameWinner = checkGameStatusRefactored();
    if (gameWinner) {
        alertWinnerAndClearBoard(gameWinner);
    } else {
        // computerRandomTurn();
        computerBlockOrRandomTurn();
        gameWinner = checkGameStatusRefactored();
        if (gameWinner) {
            alertWinnerAndClearBoard(gameWinner);
        }
    }

    updateHTML();
};

updateHTML();
