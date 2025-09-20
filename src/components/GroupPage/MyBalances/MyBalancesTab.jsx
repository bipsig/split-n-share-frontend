import React from 'react'
import MyBalancesHeader from './MyBalancesHeader';
import MyBalancesOverviewSection from './MyBalancesOverviewSection';
import MyBalancesList from './MyBalancesList/MyBalancesList';
// import MyBalancesQuickActions from './MyBalancesQuickActions';
import { generateUserBalanceBreakdown } from '../../../utils/generateUserBalanceBreakdown';

const MyBalancesTab = ({ userBalances, handleSettleUpButtons }) => {
  return (
    <div className="space-y-4">
      <MyBalancesHeader />
      <MyBalancesOverviewSection userBalances={userBalances} />

      {/* Individual Balance Cards */}
      <MyBalancesList userBalances={userBalances} handleSettleUpButtons={handleSettleUpButtons} />

      {/* Quick Actions */}
      {/* <MyBalancesQuickActions /> */}
    </div>
  )
}

export default MyBalancesTab;