import { KeyRound, Loader2 } from 'lucide-react';
import React from 'react'

const PrimaryButton = ({
  isLoading = false,
  loadingText = "Processing...",
  buttonText = "Submit"
}) => {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-medium rounded-xl hover:from-orange-600 hover:to-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:transform-none disabled:shadow-sm"
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>{loadingText}</span>
        </>
      ) : (
        <>
          <KeyRound className="w-5 h-5" />
          <span>{buttonText}</span>
        </>
      )}
    </button>
  )
}

export default PrimaryButton;