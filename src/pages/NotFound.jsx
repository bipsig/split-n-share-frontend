import { ArrowLeft, Home, Search } from "lucide-react";

export const NotFound = () => {
  const goBack = () => window.history.back();
  const goHome = () => window.location.href = '/';

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Animated 404 */}
        <div className="mb-8">
          <div className="relative inline-block">
            <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 animate-pulse">
              404
            </h1>
            <div className="absolute -top-4 -right-4">
              <Search className="w-16 h-16 text-purple-400 animate-bounce" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Page Not Found
          </h2>
          <p className="text-gray-600 text-lg mb-6 leading-relaxed">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>

          {/* Suggestions Box */}
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm font-semibold text-indigo-800 mb-2">
              Here's what you can do:
            </p>
            <ul className="text-sm text-indigo-700 space-y-1">
              <li>• Check if the URL is correct</li>
              <li>• Go back to the previous page</li>
              <li>• Visit the home page</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={goBack}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
            
            <button
              onClick={goHome}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
            >
              <Home className="w-5 h-5" />
              Go Home
            </button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="text-gray-400 text-sm">
          Lost in space? We'll help you find your way back.
        </div>
      </div>
    </div>
  );
};

export default NotFound;