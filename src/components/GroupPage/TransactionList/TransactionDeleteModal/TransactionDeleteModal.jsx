import React from 'react'
// import { useDeleteTransactionMutation } from '../../../../redux/slices/api/transactionsApi';
import { useDeleteTransactionMutation } from "../../../../redux/slices/api/transactionsApi"
import toast from 'react-hot-toast';

const TransactionDeleteModal = ({
  transaction,
  setIsDeleteTransactionModalOpen,
  setActiveTransaction,
  refetchAPIFunction
}) => {
  const [deleteTransaction, { isLoading: deleteTransactionLoading, isError: deleteTransactionIsError, error: deleteTransactionError, isSuccess: deleteTransactionSuccess, data: deleteTransactionData }] = useDeleteTransactionMutation();


  const handleDeleteTransaction = async () => {
    try {
      const result = await deleteTransaction(transaction._id).unwrap();

      if (result.success) {
        setIsDeleteTransactionModalOpen(false);
        setActiveTransaction(null);
        toast.success('Transaction deleted successfully');

        if (refetchAPIFunction) {
          refetchAPIFunction();
        }
      }
    }
    catch (err) {
      console.error('Error:', err);
      toast.error(`Unable to add a new expense: ${err.data.message}`);
    }
  }


  return (
    <div className='space-y-6'>
      <p>Are you sure you want to delete this transaction? This action cannot be undone.</p>

      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
        <button
          type='button'
          onClick={() => {
            setIsDeleteTransactionModalOpen(false);
            setActiveTransaction(null);
          }}
          disabled={deleteTransactionLoading}
          className="px-6 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          No
        </button>

        <button
          type="button"
          onClick={handleDeleteTransaction}
          disabled={deleteTransactionLoading}
          className="flex items-center justify-center px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 min-w-[120px]"
        >
          Yes, Delete
        </button>
      </div>

    </div >
  )
}

export default TransactionDeleteModal;