export function extractErrorMessage(error) {
  if (error.response) {
    // Server responded with a status code outside 2xx
    return error.response.data?.message || 'Server Error';
  } else if (error.request) {
    // Request made but no response
    return 'No response from server. Please check your connection.';
  } else {
    // Error before request (e.g., setup)
    return error.message;
  }
}