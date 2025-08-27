import React from 'react'

const MyBalanceListItemIcon = ({ balance, username }) => {
  return (
    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gray-400 to-gray-500 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
      <span className="text-white text-sm sm:text-lg font-bold">
        {username.charAt(0).toUpperCase()}
      </span>
    </div>
  )
}

export default MyBalanceListItemIcon;