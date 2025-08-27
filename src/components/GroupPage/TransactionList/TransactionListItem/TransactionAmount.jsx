import React from 'react'
import { parseAmount } from '../../../../utils/parseAmount';
import TransactionItemButtons from './TransactionItemButtons';

const TransactionAmount = ({ transaction }) => {
  return (
    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 sm:gap-2 flex-shrink-0">
      <p className={`text-xl sm:text-2xl font-bold ${transaction.type === 'Expense' ? 'text-red-600' : 'text-green-600'
        } break-all text-right`}>
        {transaction.type === 'Payment' ? '+' : ''}
        {parseAmount(transaction.amount)}
      </p>

      <TransactionItemButtons />
    </div>
  )
}

export default TransactionAmount;