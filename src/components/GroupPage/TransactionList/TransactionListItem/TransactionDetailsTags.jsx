import React from 'react'

const TransactionDetailsTags = ({ transaction }) => {
  return (
    <>
      {/* <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${transaction.isSettled
        ? 'bg-green-100 text-green-700'
        : 'bg-yellow-100 text-yellow-700'
        }`}>
        {transaction.isSettled ? 'Settled' : 'Pending'}
      </span> */}
      <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${transaction.type === 'Expense'
        ? 'bg-red-100 text-red-700'
        : 'bg-blue-100 text-blue-700'
        }`}>
        {transaction.type}
      </span>
    </>
  )
}

export default TransactionDetailsTags;