import React from 'react'

const GroupBalanceListItemButton = ({ member, balance }) => {
  return (
    <button className={`mt-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${balance < 0
      ? 'bg-red-100 text-red-700 hover:bg-red-200'
      : 'bg-green-100 text-green-700 hover:bg-green-200'
      }`}>
      {balance < 0 ? 'Settle Up' : 'Request'}
    </button>
  )
}

export default GroupBalanceListItemButton
