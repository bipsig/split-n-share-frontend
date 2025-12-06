import { Calendar, CreditCard, FileText, IndianRupee, Info, Tag, Users } from "lucide-react";

const TransactionDetailsModal = ({ transaction }) => {
  if (!transaction) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency || 'INR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  console.log('Rendering TransactionDetails for transaction:', transaction);

  return (
    <div className="space-y-6">
      {/* Amount Section */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100/50 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
            <IndianRupee className="text-white" size={20} />
          </div>
          <span className="text-sm font-medium text-gray-600">Total Amount</span>
        </div>
        <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {formatCurrency(transaction.amount, transaction.currency)}
        </p>
        {/* <div className={`inline-flex items-center gap-2 mt-3 px-3 py-1 rounded-full text-xs font-medium ${
          transaction.isSettled 
            ? 'bg-green-100 text-green-700' 
            : 'bg-amber-100 text-amber-700'
        }`}>
          <div className={`w-2 h-2 rounded-full ${
            transaction.isSettled ? 'bg-green-500' : 'bg-amber-500'
          }`} />
          {transaction.isSettled ? 'Settled' : 'Pending'}
        </div> */}
      </div>

      {/* Basic Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Description */}
        <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-gray-200/50 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="text-gray-500" size={18} />
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Description</span>
          </div>
          <p className="text-gray-900 font-medium">{transaction.description}</p>
        </div>

        {/* Category */}
        <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-gray-200/50 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Tag className="text-gray-500" size={18} />
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Category</span>
          </div>
          <p className="text-gray-900 font-medium">{transaction.category}</p>
        </div>

        {/* Date */}
        <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-gray-200/50 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="text-gray-500" size={18} />
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Date</span>
          </div>
          <p className="text-gray-900 font-medium text-sm">{formatDate(transaction.createdAt)}</p>
        </div>

        {/* Group */}
        <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-gray-200/50 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Users className="text-gray-500" size={18} />
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Group</span>
          </div>
          <p className="text-gray-900 font-medium">{transaction.groupTitle}</p>
        </div>
      </div>

      {/* Paid By */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-100/50 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
            <CreditCard className="text-white" size={16} />
          </div>
          <span className="text-sm font-semibold text-gray-700">Paid By</span>
        </div>
        <div className="flex items-center gap-3 ml-10">
          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
            {transaction.user_paid.username.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-medium text-gray-900">{transaction.user_paid.username}</p>
            <p className="text-xs text-gray-600">Full Amount: {formatCurrency(transaction.amount, transaction.currency)}</p>
          </div>
        </div>
      </div>

      {/* Users Involved */}
      <div className="bg-white/60 backdrop-blur-sm rounded-lg p-5 border border-gray-200/50 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
            <Users className="text-white" size={16} />
          </div>
          <span className="text-sm font-semibold text-gray-700">Split Between</span>
        </div>
        <div className="space-y-3">
          {transaction.users_involved.map((userShare, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-purple-50/30 rounded-lg border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                  {userShare.username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{userShare.username}</p>
                  <p className="text-xs text-gray-500">Share amount</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">{formatCurrency(userShare.share, transaction.currency)}</p>
                <p className="text-xs text-gray-500">{((userShare.share / transaction.amount) * 100).toFixed(1)}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Note (if exists) */}
      {transaction.note && (
        <div className="bg-amber-50/50 backdrop-blur-sm rounded-lg p-4 border border-amber-100/50 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Info className="text-amber-600" size={18} />
            <span className="text-xs font-medium text-amber-700 uppercase tracking-wide">Note</span>
          </div>
          <p className="text-gray-700 text-sm italic">{transaction.note}</p>
        </div>
      )}

      {/* Added By */}
      <div className="bg-gray-50/50 rounded-lg p-3 border border-gray-100">
        <p className="text-xs text-gray-500">
          Added by <span className="font-medium text-gray-700">{transaction.user_added.username}</span>
        </p>
      </div>
    </div>
  );
};

export default TransactionDetailsModal;