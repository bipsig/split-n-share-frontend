import { CreditCard, Receipt } from 'lucide-react';
import React from 'react'
import { getExpenseIcon } from '../../../../utils/getExpenseIcon';
import { getExpenseColor } from '../../../../utils/getExpenseColor';

const TransactionIcon = ({ transaction }) => {
  return (
    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0 ${transaction.type !== 'Expense'
      ? 'bg-gradient-to-br from-green-500 to-green-600'
      : `bg-gradient-to-br ${getExpenseColor(transaction.category)}`
      }`}>
      {transaction.type === 'Expense' ? (
        getExpenseIcon(transaction.category)
      ) : (
        <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      )}
    </div>
  )
}

export default TransactionIcon;