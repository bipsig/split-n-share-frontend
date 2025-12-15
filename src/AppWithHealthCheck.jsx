import { useEffect, useState } from "react";
import Error from "./pages/Error";
import Loading from "./pages/Loading";

const AppWithHealthCheck = ({ children }) => {
  const [status, setStatus] = useState('loading'); // 'loading' | 'success' | 'error'
  const [retryCount, setRetryCount] = useState(0);

  const checkBackendHealth = async () => {
    setStatus('loading');

    try {
      const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
      console.log('Checking backend health at:', `${baseUrl}health`);
      const response = await fetch(`${baseUrl}health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Add a timeout
        signal: AbortSignal.timeout(100000), // 10 second timeout
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Backend health check failed:', error);
      setStatus('error');
    }
  };

  useEffect(() => {
    checkBackendHealth();
  }, [retryCount]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  if (status === 'loading') {
    return <Loading />;
  }

  if (status === 'error') {
    return <Error onRetry={handleRetry} />;
  }

  return children;
};

export default AppWithHealthCheck;