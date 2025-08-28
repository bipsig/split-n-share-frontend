import React from 'react'
import { parseAmount } from '../../../../utils/parseAmount';
import { Edit, Eye, Trash2 } from 'lucide-react';
import TransactionItemButtons from '../../../GroupPage/TransactionList/TransactionListItem/TransactionItemButtons';

const TransactionListItemAmount = ({ transaction }) => {
  return (
    <div className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-start gap-3 lg:gap-2 flex-shrink-0">
      <p className={`text-xl lg:text-2xl font-bold ${transaction.type === 'Expense' ? 'text-red-600' : 'text-green-600'
        } break-all text-right`}>
        {transaction.type === 'Payment' ? '+' : ''}
        {parseAmount(transaction.amount)}
      </p>

      <TransactionItemButtons />

    </div>
  )
}

export default TransactionListItemAmount;