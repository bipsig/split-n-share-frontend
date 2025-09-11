import React from 'react'
import FormInputLabel from './FormInputLabel';

const FormInputField = ({ label, placeholder, type = "text", formObject, formObjectAttribute, required = true, handleChangeFunction }) => {
  return (
    <div>
      <FormInputLabel label={label} required={required} />

      <input
        type={type}
        value={formObject [formObjectAttribute]}
        onChange={(e) => handleChangeFunction(formObjectAttribute, e.target.value)}
        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200"
        placeholder={placeholder}
      />
    </div>
  )
}

export default FormInputField;