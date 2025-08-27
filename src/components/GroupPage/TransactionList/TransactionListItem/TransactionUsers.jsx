import React from 'react'

const TransactionUsers = ({ transaction }) => {
  return (
    <div className="flex items-center gap-2 mb-2 flex-wrap">
      <span className="text-xs text-gray-500 whitespace-nowrap">{transaction.type === 'Expense' ? 'Split among:' : 'Paid to: '}</span>
      <div className="flex items-center gap-1">
        {transaction.users_involved.slice(0, 3).map((user, idx) => (
          <div key={idx} className="relative group/user">
            <div className="w-6 h-6 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0 cursor-pointer hover:scale-110 transition-transform duration-200">
              {user.username.charAt(0).toUpperCase()}
            </div>

            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover/user:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
              {user.username}
              {/* Tooltip arrow */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
          </div>
        ))}
        {transaction.users_involved.length > 3 && (
          <div className="relative group/more">
            <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 text-xs font-medium flex-shrink-0 cursor-pointer hover:bg-gray-300 transition-colors duration-200">
              +{transaction.users_involved.length - 3}
            </div>

            {/* Tooltip for remaining users */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover/more:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 max-w-48">
              <div className="space-y-1">
                <div className="font-medium mb-1">Other users:</div>
                {transaction.users_involved.slice(3).map((user, idx) => (
                  <div key={idx}>
                    {user.username}
                  </div>
                ))}
              </div>
              {/* Tooltip arrow */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TransactionUsers;