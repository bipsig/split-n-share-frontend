import React, { useState } from 'react'
import { X } from 'lucide-react'

// Reusable Mobile Modal Component
const MobileModal = ({ 
  isOpen, 
  onClose, 
  title, 
  subtitle, 
  children,
  footerButton = true,
  footerButtonText = "Close",
  footerButtonAction = null
}) => {
  if (!isOpen) return null;

  const handleFooterClick = () => {
    if (footerButtonAction) {
      footerButtonAction();
    } else {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end justify-center animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white/90 backdrop-blur-md rounded-t-3xl w-full max-w-md shadow-2xl border-t border-white/20 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle bar */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
        </div>
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200/50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent">
                {title}
              </h3>
              {subtitle && (
                <p className="text-xs text-gray-500 mt-0.5">
                  {subtitle}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100/50 rounded-xl transition-colors duration-200"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="px-4 py-3 max-h-[60vh] overflow-y-auto custom-scrollbar">
          {children}
        </div>
        
        {/* Footer Button */}
        {footerButton && (
          <div className="p-4 pt-2 pb-6">
            <button
              onClick={handleFooterClick}
              className="w-full py-3 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-xl font-medium shadow-lg hover:from-gray-800 hover:to-gray-900 transition-all duration-200 active:scale-95"
            >
              {footerButtonText}
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(243, 244, 246, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(156, 163, 175, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(156, 163, 175, 0.7);
        }
      `}</style>
    </div>
  );
};

export default MobileModal;