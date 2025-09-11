import React from 'react'
import FormInputLabel from './FormInputLabel';
import { Loader2 } from 'lucide-react';

const FormInputSelect = ({
  label,
  required = true,
  formObject,
  formObjectAttribute,
  options = [],
  handleChangeFunction,
  isLoading = false,
  placeholder = "Select an option"
}) => {
  return (
    <div>
      <FormInputLabel label={label} required={required} />
       
      <div className="relative">
        <select
          value={formObject[formObjectAttribute]}
          onChange={(e) => handleChangeFunction(formObjectAttribute, e.target.value)}
          disabled={isLoading}
          className="w-full px-4 py-2 pr-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed appearance-none"
        >
          <option value="" disabled>
            {isLoading ? "Loading..." : placeholder}
          </option>
                   
          {/* Only render options if they exist and not loading */}
          {!isLoading && options.length > 0 && options.map((option) => (
            <option key={option.id || option.value} value={option.value}>
              {option.title}
            </option>
          ))}
                   
          {!isLoading && options.length === 0 && (
            <option value="" disabled>
              No options available
            </option>
          )}
        </select>
                 
        {/* Enhanced Loading State */}
        {isLoading && (
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white via-white to-blue-50 backdrop-blur-md border border-blue-200/30 flex items-center justify-center overflow-hidden">
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-xl" />
            
            {/* Loading Content */}
            <div className="relative z-10 flex items-center gap-3 px-4">
              {/* Animated Spinner with Gradient */}
              <div className="relative">
                <div className="w-5 h-5 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                  <Loader2 className="animate-spin h-3 w-3 text-white" />
                </div>
                {/* Pulsing Ring */}
                <div className="absolute inset-0 w-5 h-5 bg-blue-500/20 rounded-full animate-ping" />
              </div>
              
              {/* Loading Text with Shimmer Effect */}
              <div className="relative">
                <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Loading options...
                </span>
                {/* Shimmer Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" 
                     style={{
                       backgroundSize: '200% 100%',
                       animation: 'shimmer 1.5s infinite'
                     }} 
                />
              </div>
            </div>
            
            {/* Subtle Animated Dots */}
            <div className="absolute top-2 right-3 flex gap-1">
              <div className="w-1 h-1 bg-blue-400/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1 h-1 bg-blue-400/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1 h-1 bg-blue-400/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        {/* Standard Dropdown Arrow (when not loading) */}
        {!isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        )}
      </div>

      {/* CSS for shimmer animation */}
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  )
}

export default FormInputSelect;