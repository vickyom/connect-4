const checkVertical = (board) => {
  // Check only if row is 3 or greater
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 7; c++) {
      if (board[r][c]) {
        if (
          board[r][c] === board[r + 1][c] &&
          board[r][c] === board[r + 2][c] &&
          board[r][c] === board[r + 3][c]
        ) {
          console.log("r     -- >", r, ":", c);
          console.log("r - 1 -- >", r - 1, ":", c);
          console.log("r - 2 -- >", r - 2, ":", c);
          console.log("r - 3 -- >", r - 3, ":", c);

          console.log("checkVertical -- >", board[r][c]);
          console.log("board -- >", board);
          return board[r][c];
        }
      }
    }
  }
};
export default checkVertical;
