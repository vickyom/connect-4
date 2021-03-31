const checkDiagonalLeft = (board) => {
  // Check only if row is 3 or greater AND column is 3 or greater
  for (let r = 3; r < 6; r++) {
    for (let c = 3; c < 7; c++) {
      if (board[r][c]) {
        if (
          board[r][c] === board[r - 1][c - 1] &&
          board[r][c] === board[r - 2][c - 2] &&
          board[r][c] === board[r - 3][c - 3]
        ) {
          console.log("C -- >", c, "R:", r);
          console.log("c - 1 -- >", c - 1, ":", r - 1);
          console.log("c - 2 -- >", c - 2, ":", r - 2);
          console.log("c - 3 -- >", c - 3, ":", r - 3);
          console.log("checkDiagonalLeft", board[r][c]);
          return board[r][c];
        }
      }
    }
  }
};
export default checkDiagonalLeft;
