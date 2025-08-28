import React from 'react'
import { getCategoryIcon } from '../../../../utils/getCategoryIcon';
import { CreditCard, Receipt } from 'lucide-react';

const TransactionListItemIcon = ({ transaction }) => {
  return (
    <div className="flex flex-col gap-1 flex-shrink-0">
      <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center shadow-lg ${transaction.type === 'Expense'
        ? 'bg-gradient-to-br from-red-500 to-red-600'
        : 'bg-gradient-to-br from-green-500 to-green-600'
        }`}>
        {transaction.type === 'Expense' ? (
          <Receipt className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
        ) : (
          <CreditCard className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
        )}
      </div>
      <div className="w-6 h-6 lg:w-8 lg:h-8 bg-white rounded-lg flex items-center justify-center shadow-md self-center">
        {getCategoryIcon(transaction.category)}
      </div>
    </div>
  )
}

export default TransactionListItemIcon;