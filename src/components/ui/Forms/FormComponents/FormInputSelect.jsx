import React from 'react'
import FormInputLabel from './FormInputLabel';

const FormInputSelect = ({
  label,
  required = true,
  formObject,
  formObjectAttribute,
  options = [],
  handleChangeFunction
}) => {
  return (
    <div>
      <FormInputLabel label={label} required={required} />

      <select
        value={formObject[formObjectAttribute]}
        onChange={(e) => handleChangeFunction(formObjectAttribute, e.target.value)}
        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200"
      >
        {options.map((option) => {
          return <option key={option.key} value={option.value}>{option.title}</option>
        })}
      </select>
    </div>
  )
}

export default FormInputSelect;