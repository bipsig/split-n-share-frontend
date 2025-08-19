import React from 'react'

const ListItem = ({ 
  username, 
  amount, 
  type = 'owe', // 'owe' or 'owed'
  onActionClick,
  actionIcon: ActionIcon,
  actionText  
}) => {
  const isOwe = type === 'owe';
  const colorClass = isOwe ? 'text-red-600' : 'text-green-500';
  const bgClass = isOwe ? 'border-red-300/50 text-red-600 bg-red-50/60 hover:bg-red-100/80' : 'border-green-300/50 text-green-600 bg-green-50/60 hover:bg-green-100/80';

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-100 hover:bg-white/80 transition-all duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-medium">
              {username.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="font-medium text-gray-800">{username}</p>
            <p className="text-xs text-gray-500">{isOwe ? 'You owe' : 'Owes you'}</p>
          </div>
        </div>
        <div className="text-right">
          <p className={`font-bold ${colorClass}`}>{amount}</p>
          {ActionIcon && actionText && (
            <button 
              onClick={onActionClick}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full border hover:shadow-md transition-all duration-200 text-xs font-medium ${bgClass}`}
            >
              <ActionIcon size={12} />
              {actionText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListItem;