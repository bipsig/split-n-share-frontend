import React from 'react'
import FormInputLabel from './FormInputLabel';

const FormInputTextArea = ({
  label,
  placeholder,
  required = true,
  formObject,
  formObjectAttribute,
  handleChangeFunction,
  rowSize = 3
}) => {
  return (
    <div>
      <FormInputLabel label={label} required={required} />

      <textarea
        value={formObject[formObjectAttribute]}
        onChange={(e) => handleChangeFunction(formObjectAttribute, e.target.value)}
        rows={rowSize}
        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200 resize-none"
        placeholder={placeholder}
      />
    </div>
  )
}

export default FormInputTextArea;