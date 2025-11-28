import React from 'react'
import { getCategoryIcon } from '../../../../utils/getCategoryIcon';
import { CreditCard, Receipt } from 'lucide-react';
import { getExpenseColor } from '../../../../utils/getExpenseColor';
import { getExpenseIcon } from '../../../../utils/getExpenseIcon';

const TransactionListItemIcon = ({ transaction }) => {
  return (
    <div className="flex flex-col gap-1 flex-shrink-0">
      <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center shadow-lg ${transaction.type === 'Expense'
        ? `bg-gradient-to-br ${getExpenseColor(transaction.category)}`
        : 'bg-gradient-to-br from-green-500 to-green-600'
        }`}>
        {transaction.type === 'Expense' ? (
          getExpenseIcon(transaction.category)
        ) : (
          <CreditCard className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
        )}
      </div>
    </div>
  )
}

export default TransactionListItemIcon;