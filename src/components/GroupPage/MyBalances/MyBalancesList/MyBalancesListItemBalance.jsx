import React from 'react'
import { parseAmount } from '../../../../utils/parseAmount';
import { CheckCircle } from 'lucide-react';

const MyBalancesListItemBalance = ({ userBalance }) => {
  return (
    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 sm:gap-2 flex-shrink-0">
      {userBalance !== 0 && (
        <div className="text-center sm:text-right">
          <p className={`text-lg sm:text-2xl font-bold break-all mb-1 ${userBalance > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {userBalance > 0 ? '+' : ''}
            {parseAmount(Math.abs(userBalance))}
          </p>

          {userBalance < 0 ? (
            <button className="text-xs text-blue-600 hover:text-blue-700 underline decoration-dotted underline-offset-2 hover:decoration-solid transition-all duration-200 cursor-pointer">
              settle up
            </button>
          ) : (
            <button className="text-xs text-amber-600 hover:text-amber-700 underline decoration-dotted underline-offset-2 hover:decoration-solid transition-all duration-200 cursor-pointer">
              remind
            </button>
          )}
        </div>
      )}

      {userBalance === 0 && (
        <div className="text-center sm:text-right">
          <div className="flex items-center gap-2 text-green-600 mb-1">
            <CheckCircle size={16} />
            <span className="text-sm font-medium">All settled up!</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyBalancesListItemBalance;