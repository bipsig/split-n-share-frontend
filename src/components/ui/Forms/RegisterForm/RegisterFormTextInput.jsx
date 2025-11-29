import React from 'react'

const RegisterFormTextInput = ({
  type = "text",
  label,
  Icon,
  field,
  handleInputChange,
  formData,
  required = true,
  placeholder,
  showPasswordToggle,
  passwordStrengthMeter
}) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Icon className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type={type}
          name={field}
          value={formData[field]}
          onChange={handleInputChange}
          required
          className="w-full pl-12 pr-4 py-3 bg-white/50 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200 text-gray-800 placeholder-gray-400"
          placeholder={placeholder}
        />
        {showPasswordToggle && (
          showPasswordToggle
        )}
      </div>
      {passwordStrengthMeter && (
        passwordStrengthMeter
      )}
    </div>
  )
}

export default RegisterFormTextInput;