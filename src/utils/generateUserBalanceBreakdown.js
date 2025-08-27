export const generateUserBalanceBreakdown = (username, matrix) => {
  const obj = {};
  
  for (let row in matrix) {
    if (row === username) {
      continue;
    }

    obj [row] = matrix [username][row] - matrix [row][username];
  }

  return obj;
}