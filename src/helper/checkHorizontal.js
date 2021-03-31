const checkHorizontal = (board) => {
  // Check only if column is 3 or less
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 4; c++) {
      // User can web
      if (board[r][c]) {
        console.log(c + 1);
        console.log(c + 2);
        console.log(c + 3);
        if (
          board[r][c] === board[r][c + 1] &&
          board[r][c] === board[r][c + 2] &&
          board[r][c] === board[r][c + 3]
        ) {
          console.log("C     -- >", c, ":", r);
          console.log("c + 1 -- >", c + 1, ":", r);
          console.log("c + 2 -- >", c + 2, ":", r);
          console.log("c + 3 -- >", c + 3, ":", r);
          console.log("checkHorizontal", board[r][c]);
          return board[r][c];
        }
      }
    }
  }
};
export default checkHorizontal;
