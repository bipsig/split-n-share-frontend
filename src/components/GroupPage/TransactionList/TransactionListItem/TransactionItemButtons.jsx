import { Edit, Eye, Trash2 } from 'lucide-react';
import React from 'react'
import { set } from 'react-hook-form';

const TransactionItemButtons = ({
  transaction,
  setActiveTransaction,
  setIsViewTransactionModalOpen,
  setIsDeleteTransactionModalOpen
}) => {
  const handleViewTransaction = () => {
    setActiveTransaction(transaction);
    setIsViewTransactionModalOpen(true);
  }

  const handleDeleteTransaction = () => {
    setActiveTransaction(transaction);
    setIsDeleteTransactionModalOpen(true);
  }


  return (
    <div className="flex gap-1 sm:gap-2">
      <button 
        className="p-1.5 sm:p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:shadow-sm"
        onClick={handleViewTransaction}
      >
        <Eye size={14} className="sm:w-4 sm:h-4" />
      </button>
      <button className="p-1.5 sm:p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-200 hover:shadow-sm">
        <Edit size={14} className="sm:w-4 sm:h-4" />
      </button>
      <button 
        className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
        onClick={handleDeleteTransaction}
      >
        <Trash2 size={14} className=" text-red-500 sm:w-4 sm:h-4" />
      </button>
    </div>
  )
}

export default TransactionItemButtons;