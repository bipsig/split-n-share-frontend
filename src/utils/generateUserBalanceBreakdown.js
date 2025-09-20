export const generateUserBalanceBreakdown = (username, matrix) => {
  if (!matrix || !matrix[username]) {
    return {};
  }

  const obj = {};
  for (let row in matrix) {
    if (row === username) continue;

    obj[row] = (matrix[username][row] || 0) - (matrix[row]?.[username] || 0);
  }

  return obj;
};