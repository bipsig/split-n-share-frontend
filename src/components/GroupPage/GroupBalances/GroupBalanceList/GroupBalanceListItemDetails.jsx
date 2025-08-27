import React from 'react'

const GroupBalanceListItemDetails = ({ member, balance }) => {
  return (
    <div className="flex-1 min-w-0">
      <p className="font-bold text-gray-800 text-sm sm:text-base break-words">{member.username}</p>
      <p className="text-xs sm:text-sm text-gray-600">
        {balance > 0 ? 'Gets back' : balance < 0 ? 'Owes' : 'Settled up'}
      </p>
    </div>
  )
}

export default GroupBalanceListItemDetails;