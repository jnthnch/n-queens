/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function (n) {
  var resultArray = new Board({ 'n': n });
  // for (let i = 0; i < n; i++) {
  //   resultArray.push([])
  //   for (let j = 0; j < n; j++) {
  //     resultArray[i][j] = 0;
  //   }
  // }

  // var randomNum = Math.floor(Math.random() * n);

  resultArray.get(0)[0] = 1;

  for (let rowIdx = 1; rowIdx < n; rowIdx++) {
    for (let colIdx = 0; colIdx < n; colIdx++) {
      resultArray.get(rowIdx)[colIdx] = 1;
      if (resultArray.hasAnyRowConflicts() || resultArray.hasAnyColConflicts()) {
        resultArray.get(rowIdx)[colIdx] = 0;
        continue;
      } else {
        if (rowIdx === n - 1) {
          break;
        }
        continue;
      }
    }
  }

  // we must return an array, not a Board instance;
  var output = [];

  for (let i = 0; i < n; i++) {
    output.push(resultArray.attributes[i]);
  }

  var solution = output; //fixme
  // console.log(solution);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function (n) {

  var board = new Board({ 'n': n });
  var count = 0;
  if (n === 1) {
    count = 1;
    return count;
  }

  //helper function
  var cb = function (board, currentRow) {
    for (let i = 0; i < board.get(currentRow).length; i++) {
      if (currentRow > 0) {
        for (let i = 0; i < board.get(currentRow).length; i++) {
          board.get(currentRow)[i] = 0;
        }
      }
      board.get(currentRow)[i] = 1;
      if (board.hasAnyRowConflicts() ||
        board.hasAnyColConflicts() && currentRow === n - 1 && i === n - 1) {
        return;
      } else if (board.hasAnyRowConflicts() ||
        board.hasAnyColConflicts()) {
        board.get(currentRow)[i] = 0;
        continue;
      } else if (currentRow === n - 1) {
        board.get(currentRow)[i] = 0;
        for (let i = 0; i < board.get(currentRow).length; i++) {
          board.get(currentRow - 1)[i] = 0;
        }
        count++;
        return;
      } else {
        cb(board, currentRow + 1);
      }
    }
  };

  for (let i = 0; i < board.get(0).length; i++) {
    var currentRow = 0;
    board.get(0)[i] = 1;
    cb(board, currentRow + 1);
    board.get(0)[i] = 0;
  }

  var solutionCount = count; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function (n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function (n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
