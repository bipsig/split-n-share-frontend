import { Loader2 } from 'lucide-react';
import React from 'react'

const variantClasses = {
  primary: "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700",
  success: "bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700",
  secondary: "bg-white/80 backdrop-blur-md text-gray-700 rounded-xl hover:bg-white/90 border border-gray-200/50",
  danger: "bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700",
  warning: "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-xl hover:from-yellow-600 hover:to-yellow-700"
}

const disabledVariantClasses = {
  primary: "bg-gray-400 text-gray-200 rounded-xl cursor-not-allowed",
  success: "bg-gray-400 text-gray-200 rounded-xl cursor-not-allowed",
  secondary: "bg-gray-100 text-gray-400 rounded-xl cursor-not-allowed border border-gray-200",
  danger: "bg-gray-400 text-gray-200 rounded-xl cursor-not-allowed",
  warning: "bg-gray-400 text-gray-200 rounded-xl cursor-not-allowed"
}

const sizeClasses = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-2.5",
  lg: "px-6 py-3 text-lg"
};

const HeaderButton = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconSize = 18,
  loading = false,
  disabled = false,
  onClick,
  className = '',
  hideTextOnMobile = true
}) => {
  const baseClasses = "flex items-center gap-2 font-medium transition-all duration-200";
  const enabledClasses = "shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer";
  const disabledClasses = "shadow-sm";
  
  const stateClasses = disabled || loading ? disabledClasses : enabledClasses;
  const colorClasses = disabled ? disabledVariantClasses[variant] : variantClasses[variant];
  
  const combinedClasses = `${baseClasses} ${stateClasses} ${sizeClasses[size]} ${colorClasses} ${className}`;

  return (
    <button
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <Loader2 size={iconSize} className="animate-spin" />
      ) : Icon ? (
        <Icon size={iconSize} />
      ) : null}
      
      {children && (
        <span className={hideTextOnMobile ? "hidden sm:inline" : ""}>
          {loading && typeof children === 'string' && children.includes('...') 
            ? children 
            : children}
        </span>
      )}
    </button>
  )
}

export default HeaderButton;