import React from 'react'

const MyBalancesListItemDetails = ({ username, userBalance }) => {
  return (
    <div className="flex-1 min-w-0">
      <div className="flex flex-wrap items-center gap-2 mb-1">
        <p className="font-bold text-gray-800 text-sm sm:text-base break-words">{username}</p>
        {userBalance === 0 && (
          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium whitespace-nowrap">
            Settled
          </span>
        )}
      </div>

      <p className="text-xs sm:text-sm text-gray-600">
        {
          userBalance === 0 ?
            'No Outstanding Balance' :
            userBalance < 0 ?
              'YOu Owe' :
              'Owes You'
        }
      </p>
    </div>
  )
}

export default MyBalancesListItemDetails;