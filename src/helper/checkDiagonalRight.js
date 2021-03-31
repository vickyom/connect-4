const checkDiagonalRight = (board) => {
  // Check only if row is 3 or greater AND column is 3 or less
  for (let r = 3; r < 6; r++) {
    for (let c = 0; c < 4; c++) {
      if (board[r][c]) {
        if (
          board[r][c] === board[r - 1][c + 1] &&
          board[r][c] === board[r - 2][c + 2] &&
          board[r][c] === board[r - 3][c + 3]
        ) {
          console.log("C -- >", c, "R:", r);
          console.log(board[r][c], " -- >", c + 1, ":", r - 1);
          console.log(board[r][c], " -- >", c + 2, ":", r - 2);
          console.log(board[r][c], " -- >", c + 3, ":", r - 3);
          console.log("checkDiagonalRight", board[r][c]);

          return board[r][c];
        }
      }
    }
  }
};
export default checkDiagonalRight;
