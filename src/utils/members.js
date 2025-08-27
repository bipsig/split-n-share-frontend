export const getActiveMembers = (members) => {
  console.log ('In Function', members);
  return members?.filter(member => member.status === 'active').length || 0;
};

export const getPendingMembers = (members) => {
  return members?.filter(member => member.status === 'pending').length || 0;
};