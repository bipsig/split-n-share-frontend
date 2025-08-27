import React from 'react'
import { parseAmount } from '../../../../utils/parseAmount';

const GroupBalanceListItemAmount = ({ member, balance }) => {
  return (
    <p className={`text-lg sm:text-2xl font-bold break-all ${balance > 0 ? 'text-green-600' :
      balance < 0 ? 'text-red-600' : 'text-gray-600'
      }`}>
      {balance > 0 ? '+' : ''}
      {parseAmount(balance)}
    </p>
  )
}

export default GroupBalanceListItemAmount;