import React from 'react'

const variants = {
  default: 'bg-white/60 hover:bg-white/80',
  danger: 'bg-red-50/60 hover:bg-red-50/80 border-red-200/50'
};

const buttonVariants = {
  default: 'bg-gray-50 text-gray-600 hover:bg-gray-100',
  primary: 'bg-blue-50 text-blue-600 hover:bg-blue-100',
  warning: 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100',
  danger: 'bg-red-100 text-red-600 hover:bg-red-200'
};

const disabledButtonVariants = {
  default: 'bg-gray-100 text-gray-400 cursor-not-allowed',
  primary: 'bg-gray-100 text-gray-400 cursor-not-allowed',
  warning: 'bg-gray-100 text-gray-400 cursor-not-allowed',
  danger: 'bg-gray-100 text-gray-400 cursor-not-allowed'
};

const UserActionItem = ({
  icon: Icon,
  title,
  subtitle,
  actionText,
  onAction,
  variant = 'default',
  iconBg,
  disabled = false
}) => {
  
  return (
    <div className={`p-4 backdrop-blur-sm rounded-xl border border-gray-100 transition-all duration-200 ${variants[variant]}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconBg}`}>
            <Icon size={16} />
          </div>
          <div>
            <p className="font-medium text-gray-800">{title}</p>
            <p className="text-sm text-gray-600">{subtitle}</p>
          </div>
        </div>
        <button
          onClick={onAction}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            disabled ? disabledButtonVariants[variant] : buttonVariants[variant]
          }`}
          disabled={disabled}
        >
          {actionText}
        </button>
      </div>
    </div>
  );
};

export default UserActionItem;