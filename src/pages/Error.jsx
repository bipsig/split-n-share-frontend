import { AlertCircle, RefreshCw, Server } from 'lucide-react';
import React from 'react'

const Error = ({
  onRetry
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Error icon with animation */}
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-28 h-28 bg-red-100 rounded-full animate-pulse"></div>
            </div>
            <div className="relative bg-red-100 rounded-full p-6">
              <AlertCircle className="w-16 h-16 text-red-600" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            Connection Failed
          </h1>
          <p className="text-gray-600 mb-6 leading-relaxed">
            We couldn't connect to the server. Please check your internet connection and try again.
          </p>

          {/* Error details card */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <Server className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="text-left">
                <p className="text-sm font-semibold text-red-800 mb-1">
                  Backend Service Unavailable
                </p>
                <p className="text-xs text-red-600">
                  The server might be temporarily down or undergoing maintenance.
                </p>
              </div>
            </div>
          </div>

          {/* Retry button */}
          <button
            onClick={onRetry}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-lg"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>

          {/* Additional help text */}
          <p className="text-sm text-gray-500 mt-6">
            If the problem persists, please contact support
          </p>
        </div>
      </div>
    </div>
  );
}

export default Error;