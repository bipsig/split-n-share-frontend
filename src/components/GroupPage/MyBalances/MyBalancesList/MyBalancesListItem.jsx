import React from 'react'
import MyBalanceListItemIcon from './MyBalanceListItemIcon';
import MyBalancesListItemDetails from './MyBalancesListItemDetails';
import MyBalancesListItemBalance from './MyBalancesListItemBalance';

const MyBalancesListItem = ({ key, username, userBalance }) => {
  return (
    <div key={key} className="bg-white/60 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-100 hover:bg-white/80 transition-all duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
          <MyBalanceListItemIcon username={username}/>

          <MyBalancesListItemDetails username={username} userBalance={userBalance} />
        </div>

        <MyBalancesListItemBalance userBalance={userBalance} />
      </div>
    </div>
  )
}

export default MyBalancesListItem;