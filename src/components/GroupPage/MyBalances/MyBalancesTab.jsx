import React from 'react'
import MyBalancesHeader from './MyBalancesHeader';
import MyBalancesOverviewSection from './MyBalancesOverviewSection';
import MyBalancesList from './MyBalancesList/MyBalancesList';
// import MyBalancesQuickActions from './MyBalancesQuickActions';
import { generateUserBalanceBreakdown } from '../../../utils/generateUserBalanceBreakdown';

const MyBalancesTab = ({ user, transactionMatrix }) => {
  const userBalances = generateUserBalanceBreakdown(user, transactionMatrix.matrix);
  console.log (userBalances);
  return (
    <div className="space-y-4">
      <MyBalancesHeader />
      <MyBalancesOverviewSection userBalances={userBalances} />

      {/* Individual Balance Cards */}
      <MyBalancesList userBalances={userBalances}/>

      {/* Quick Actions */}
      {/* <MyBalancesQuickActions /> */}
    </div>
  )
}

export default MyBalancesTab;