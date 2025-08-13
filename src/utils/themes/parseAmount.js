export const parseAmount = (amount) => {
  const formattedAmount = amount.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDIgits: 2
  });

  return formattedAmount;
}