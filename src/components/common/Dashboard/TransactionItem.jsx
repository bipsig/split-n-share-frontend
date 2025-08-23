import React from 'react';
import { Home } from 'lucide-react';
import { parseAmount } from '../../../utils/parseAmount';
import { parseTime } from '../../../utils/parseTime';


const TransactionItem = ({ transaction, index }) => {
  const time = parseTime(transaction.creationTime);

  return (
    <div 
      key={index} 
      className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-100 hover:bg-white/80 transition-all duration-200 hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-500 rounded-lg flex items-center justify-center shadow-sm">
            <Home className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <p className="font-semibold text-gray-800">{transaction.title}</p>
              <span className="text-gray-400">•</span>
              <p className="text-sm text-gray-600">{transaction.groupName.name}</p>
            </div>
            <p className="text-xs text-gray-500">
              {transaction.userPaid} paid {parseAmount(transaction.amount)}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">{time}</p>
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;