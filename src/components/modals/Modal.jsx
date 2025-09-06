import React, { useEffect } from 'react';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

const colorThemes = {
  blue: {
    bg: 'from-white via-white to-blue-50',
    overlay: 'from-blue-500/5 to-cyan-500/5',
    border: 'border-blue-200/30',
    iconBg: 'from-blue-500 to-blue-600',
    closeHover: 'hover:bg-blue-100/50'
  },
  purple: {
    bg: 'from-white via-white to-purple-50',
    overlay: 'from-purple-500/5 to-pink-500/5',
    border: 'border-purple-200/30',
    iconBg: 'from-purple-500 to-purple-600',
    closeHover: 'hover:bg-purple-100/50'
  },
  green: {
    bg: 'from-white via-white to-green-50',
    overlay: 'from-green-500/5 to-emerald-500/5',
    border: 'border-green-200/30',
    iconBg: 'from-green-500 to-green-600',
    closeHover: 'hover:bg-green-100/50'
  },
  red: {
    bg: 'from-white via-white to-red-50',
    overlay: 'from-red-500/5 to-orange-500/5',
    border: 'border-red-200/30',
    iconBg: 'from-red-500 to-red-600',
    closeHover: 'hover:bg-red-100/50'
  },
  gray: {
    bg: 'from-white via-white to-gray-50',
    overlay: 'from-blue-500/5 to-purple-500/5',
    border: 'border-gray-200/30',
    iconBg: 'from-gray-500 to-gray-600',
    closeHover: 'hover:bg-gray-100/50'
  },
  yellow: {
    bg: 'from-white via-white to-yellow-50',
    overlay: 'from-yellow-500/5 to-orange-500/5',
    border: 'border-yellow-200/30',
    iconBg: 'from-yellow-500 to-yellow-600',
    closeHover: 'hover:bg-yellow-100/50'
  },
  orange: {
    bg: 'from-white via-white to-orange-50',
    overlay: 'from-orange-500/5 to-red-500/5',
    border: 'border-orange-200/30',
    iconBg: 'from-orange-500 to-orange-600',
    closeHover: 'hover:bg-orange-100/50'
  }
};

const modalSizes = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-6xl'
};

const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  colorTheme = 'blue',
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  icon,
  iconType, // 'success', 'error', 'warning', 'info'
  className = ''
}) => {
  const theme = colorThemes[colorTheme];
  const sizeClass = modalSizes[size];

  // Icon mapping for different types
  const iconTypes = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info
  };

  const IconComponent = icon || (iconType && iconTypes[iconType]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300"
        onClick={handleOverlayClick}
        style={{
          animation: isOpen ? 'fadeIn 0.3s ease-out' : 'fadeOut 0.3s ease-out'
        }}
      />
      
      {/* Modal */}
      <div 
        className={`
          relative w-full ${sizeClass} transform transition-all duration-300
          ${className}
        `}
        style={{
          animation: isOpen ? 'modalSlideIn 0.3s ease-out' : 'modalSlideOut 0.3s ease-out'
        }}
      >
        {/* Glass Card Container */}
        <div className={`
          bg-gradient-to-br ${theme.bg} backdrop-blur-md rounded-2xl shadow-2xl 
          border ${theme.border} relative overflow-hidden max-h-[90vh] flex flex-col
        `}>
          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${theme.overlay} rounded-2xl`} />
          
          {/* Content */}
          <div className="relative z-10 flex flex-col max-h-full">
            {/* Header */}
            {(title || showCloseButton || IconComponent) && (
              <div className="flex items-start justify-between p-6 pb-4 flex-shrink-0">
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  {/* Icon */}
                  {IconComponent && (
                    <div className={`
                      w-12 h-12 bg-gradient-to-br ${theme.iconBg} rounded-xl 
                      flex items-center justify-center shadow-lg flex-shrink-0
                    `}>
                      <IconComponent className="text-white" size={24} />
                    </div>
                  )}
                  
                  {/* Title and Subtitle */}
                  {(title || subtitle) && (
                    <div className="flex-1 min-w-0">
                      {title && (
                        <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent mb-1">
                          {title}
                        </h2>
                      )}
                      {subtitle && (
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {subtitle}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Close Button */}
                {showCloseButton && (
                  <button
                    onClick={onClose}
                    className={`
                      ml-4 p-2 text-gray-500 ${theme.closeHover} rounded-lg 
                      transition-all duration-200 flex-shrink-0
                      hover:text-gray-700 focus:outline-none focus:ring-2 
                      focus:ring-offset-2 focus:ring-blue-500 cursor-pointer
                    `}
                    aria-label="Close modal"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            )}

            {/* Body */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <div className="p-6 pt-2">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        
        @keyframes modalSlideIn {
          from { 
            opacity: 0; 
            transform: scale(0.95) translateY(-10px); 
          }
          to { 
            opacity: 1; 
            transform: scale(1) translateY(0); 
          }
        }
        
        @keyframes modalSlideOut {
          from { 
            opacity: 1; 
            transform: scale(1) translateY(0); 
          }
          to { 
            opacity: 0; 
            transform: scale(0.95) translateY(-10px); 
          }
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

export default Modal;