import React from 'react'
import { parseAmount } from '../../../../utils/parseAmount'
import { Minus } from 'lucide-react'

const GroupListCardBalance = ({ group }) => {
  return (
    <div className="mb-4 text-center">
      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Your Balance</p>
      <div className={`text-2xl font-bold ${group.userBalance > 0 ? 'text-green-600' :
        group.userBalance < 0 ? 'text-red-600' : 'text-gray-600'
        }`}>
        {group.userBalance === 0 ? (
          <div className="flex items-center justify-center gap-2">
            <Minus size={20} />
            <span>Settled</span>
          </div>
        ) : (
          <>
            {group.userBalance > 0 ? '+' : ''}
            {parseAmount(group.userBalance)}
          </>
        )}
      </div>
      {group.userBalance !== 0 ? (
        <p className="text-xs text-gray-500 mt-1">
          {group.userBalance > 0 ? "You'll get back" : "You owe"}
        </p>
      ) : (
        <p className="text-xs text-white mt-1">
          ~~~~~~~~~~~~~
        </p>
      )}
    </div>
  )
}

export default GroupListCardBalance
