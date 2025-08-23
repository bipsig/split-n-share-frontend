export const getCategoryColor = (category) => {
  switch (category) {
    case 'Home': return 'from-blue-500 to-blue-600';
    case 'Trip': return 'from-purple-500 to-purple-600';
    case 'Office': return 'from-green-500 to-green-600';
    case 'Friends': return 'from-pink-500 to-pink-600';
    default: return 'from-gray-500 to-gray-600';
  }
};