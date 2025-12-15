import { AlertTriangle, Home, RefreshCw } from "lucide-react";

export const ErrorHandlingPage = ({ error, resetError }) => {
  const handleGoHome = () => {
    if (resetError) resetError();
    window.location.href = '/';
  };

  const handleRefresh = () => {
    if (resetError) resetError();
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Error Icon with Animation */}
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-red-100 rounded-full animate-ping opacity-20"></div>
            </div>
            <div className="relative bg-red-100 rounded-full p-6">
              <AlertTriangle className="w-20 h-20 text-red-600" />
            </div>
          </div>

          {/* Error Content */}
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            Something Went Wrong
          </h1>
          <p className="text-gray-600 text-lg mb-6 leading-relaxed">
            We encountered an unexpected error. Don't worry, we've been notified and are working on it.
          </p>

          {/* Error Details (Collapsible) */}
          {error && (
            <details className="mb-6 text-left">
              <summary className="cursor-pointer text-sm font-semibold text-red-600 hover:text-red-700 mb-2">
                Technical Details
              </summary>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-800 overflow-auto max-h-40">
                <pre className="whitespace-pre-wrap break-words">
                  {error?.message || 'Unknown error'}
                  {error?.stack && `\n\n${error.stack}`}
                </pre>
              </div>
            </details>
          )}

          {/* Suggestions */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm font-semibold text-orange-800 mb-2">
              What you can try:
            </p>
            <ul className="text-sm text-orange-700 space-y-1">
              <li>• Refresh the page</li>
              <li>• Clear your browser cache</li>
              <li>• Try again in a few minutes</li>
              <li>• Contact support if the issue persists</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleRefresh}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
            >
              <RefreshCw className="w-5 h-5" />
              Refresh Page
            </button>

            <button
              onClick={handleGoHome}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              <Home className="w-5 h-5" />
              Go Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorHandlingPage;