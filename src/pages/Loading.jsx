import { Loader2 } from 'lucide-react';
import React from 'react'

const Loading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="relative inline-block mb-8">
          {/* Animated circles */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 border-4 border-blue-200 rounded-full animate-ping opacity-20"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 border-4 border-purple-200 rounded-full animate-ping opacity-30" style={{ animationDelay: '0.2s' }}></div>
          </div>

          {/* Main loader */}
          <div className="relative bg-white rounded-full p-6 shadow-xl">
            <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Connecting to Server
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Please wait while we establish connection...
        </p>

        {/* Animated dots */}
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;