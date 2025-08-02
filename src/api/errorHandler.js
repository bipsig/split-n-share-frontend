export function extractErrorMessage(error) {
  if (error.response) {
    return error.response.data?.message || 'Unexpected server error';
  } 
  else if (error.request) {
    return 'No response from server. Check your connection.';
  } 
  else {
    return error.message || 'An unknown error occurred';
  }
}
