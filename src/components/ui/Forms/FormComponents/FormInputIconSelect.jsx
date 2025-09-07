import React, { useState } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import FormInputLabel from './FormInputLabel'

const FormInputIconSelect = ({ 
  label, 
  required = true, 
  options, 
  handleChangeFunction, 
  formObject, 
  formObjectAttribute 
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const selectedValue = formObject[formObjectAttribute]
  const selectedOption = options.find(opt => opt.title === selectedValue)

  const handleOptionSelect = (optionTitle) => {
    handleChangeFunction(formObjectAttribute, optionTitle)
    setIsExpanded(false)
  }

  return (
    <div>
      <FormInputLabel label={label} required={required} />
      
      <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
        {/* Selected Item */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-3 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {selectedOption ? (
                <>
                  <selectedOption.icon className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-900">{selectedOption.title}</span>
                  {selectedOption.category && (
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {selectedOption.category}
                    </span>
                  )}
                </>
              ) : (
                <span className="text-gray-500">Select an icon...</span>
              )}
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
          </div>
        </div>

        {/* Options List */}
        {isExpanded && (
          <div className="max-h-48 overflow-y-auto">
            {options.map((option) => {
              const IconComponent = option.icon
              const isSelected = selectedValue === option.title
              
              return (
                <button
                  key={option.title}
                  type="button"
                  onClick={() => handleOptionSelect(option.title)}
                  className={`w-full p-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left ${
                    isSelected ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                  }`}
                >
                  <IconComponent className="w-5 h-5 text-gray-600 flex-shrink-0" />
                  <span className="text-gray-900 flex-grow">{option.title}</span>
                  {option.category && (
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded flex-shrink-0">
                      {option.category}
                    </span>
                  )}
                  {isSelected && (
                    <Check className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  )}
                </button>
              )
            })}
          </div>
        )}
      </div>
      
      <p className="text-xs text-gray-500 mt-2">
        Selected: {selectedValue || 'None'}
      </p>
    </div>
  )
}

export default FormInputIconSelect