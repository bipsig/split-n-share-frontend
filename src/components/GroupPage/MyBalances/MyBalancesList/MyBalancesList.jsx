import React from 'react'
import MyBalancesListItem from './MyBalancesListItem';

const MyBalancesList = ({ userBalances, handleSettleUpButtons }) => {
  return (
    <div className="space-y-3">
      {Object.entries(userBalances).map(([username, userBalance]) => (
        <MyBalancesListItem
          key={username}
          username={username}
          userBalance={userBalance}
          handleSettleUpButtons={handleSettleUpButtons}
        />
      ))}
    </div>
  )
}

export default MyBalancesList;