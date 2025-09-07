import React from 'react'

const FormInputLabel = ({ label, required = true }) => {
  return (
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label} {required && <span className='text-red-500'>*</span>}
    </label>
  )
}

export default FormInputLabel