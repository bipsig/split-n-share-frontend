export const distributeEqualSplit = (totalAmount, selectedUsers) => {
  if (selectedUsers.length === 0) return {};

  // Calculate base amount (rounded down to nearest cent)
  const baseAmount = Math.floor((totalAmount * 100) / selectedUsers.length) / 100;

  // Calculate remainder in cents
  const totalDistributed = baseAmount * selectedUsers.length;
  const remainder = totalAmount - totalDistributed;
  const remainderCents = Math.round(remainder * 100);

  const distribution = {};
  selectedUsers.forEach((userId, index) => {
    distribution[userId] = index < remainderCents ? baseAmount + 0.01 : baseAmount;
  });

  return distribution;
};