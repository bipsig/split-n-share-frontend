import React from 'react'

const FilterSelect = ({ filterType, setFilterType, options}) => {
  return (
    <select
      value={filterType}
      onChange={(e) => setFilterType(e.target.value)}
      className="px-4 py-3 bg-white border-2 border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-600 transition-all duration-200 text-sm font-medium shadow-md"
    >
      {options.map ((option) => {
        return (
          <option value={option.value}>{option.title}</option>
        )
      })}
    </select>
  )
}

export default FilterSelect