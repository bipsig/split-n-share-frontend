import { CheckCircle, TrendingDown, TrendingUp } from 'lucide-react';
import React from 'react'
import { parseAmount } from '../../../utils/parseAmount';
import StatsCard from '../../common/PageOverview/StatsCard';

const MyBalancesOverviewSection = ({ userBalances }) => {
  let youOwe = 0, youAreOwed = 0;

  Object.entries(userBalances).forEach(([username, balance]) => {
    if (balance > 0) {
      youAreOwed += balance;
    }
    else {
      youOwe += (Math.abs(balance));
    }
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
      <StatsCard
        icon={TrendingUp}
        title={"Owed To You"}
        subtitle={
          <p className="text-lg sm:text-xl font-bold text-green-600 break-all">
            {parseAmount(youAreOwed)}
          </p>
        }
        size='small'
        colorTheme='green'
      />

      <StatsCard
        icon={TrendingDown}
        title={"You Owe"}
        subtitle={
          <p className="text-lg sm:text-xl font-bold text-red-600 break-all">
            {parseAmount(youOwe)}
          </p>
        }
        size='small'
        colorTheme='red'
      />


      <StatsCard
        icon={CheckCircle}
        title={"Net Balance"}
        size='small'
        subtitle={
          <p className={`text-lg sm:text-xl font-bold break-all ${youAreOwed - youOwe > 0
            ? 'text-green-600'
            : youAreOwed - youOwe < 0
              ? 'text-red-600'
              : 'text-gray-600'
            }`}>
            {youAreOwed - youOwe > 0 ? '+' : ''}
            {parseAmount(youAreOwed - youOwe)}
          </p>
        }
      />
    </div>
  )
}

export default MyBalancesOverviewSection;