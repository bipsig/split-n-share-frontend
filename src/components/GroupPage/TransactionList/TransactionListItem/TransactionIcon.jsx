import { CreditCard, Receipt } from 'lucide-react';
import React from 'react'

const TransactionIcon = ({ transaction }) => {
  return (
    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0 ${transaction.type === 'Expense'
      ? 'bg-gradient-to-br from-red-500 to-red-600'
      : 'bg-gradient-to-br from-green-500 to-green-600'
      }`}>
      {transaction.type === 'Expense' ? (
        <Receipt className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      ) : (
        <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      )}
    </div>
  )
}

export default TransactionIcon;