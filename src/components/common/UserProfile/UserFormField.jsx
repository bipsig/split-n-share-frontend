import React from 'react'

const UserFormField = ({ 
  label, 
  value, 
  onChange, 
  isEditing, 
  icon: Icon, 
  type = 'text',
  placeholder,
  disabled = false,
  disabledMessage,
  className = ''
}) => {
  return (
    <div className={className}>
      <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
        {Icon && <Icon size={16} />}
        {label}
      </label>
      {isEditing && !disabled ? (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
          placeholder={placeholder}
        />
      ) : (
        <div className="px-4 py-3 bg-gray-50/80 rounded-xl border border-gray-200/50">
          <p className="text-gray-800">{value || 'Not provided'}</p>
          {disabled && disabledMessage && (
            <p className="text-xs text-gray-500 mt-1">{disabledMessage}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserFormField;