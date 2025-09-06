export const getActiveMembers = (members) => {
  return members?.filter(member => member.status === 'active').length || 0;
};

export const getPendingMembers = (members) => {
  return members?.filter(member => member.status === 'pending').length || 0;
};