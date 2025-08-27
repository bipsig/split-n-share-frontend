import React, { useState } from 'react'
import GroupBalanceListItemIcon from './GroupBalanceListItemIcon';
import GroupBalanceListItemDetails from './GroupBalanceListItemDetails';
import GroupBalanceListItemAmount from './GroupBalanceListItemAmount';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { generateUserBalanceBreakdown } from '../../../../utils/generateUserBalanceBreakdown';
import GroupBalanceBreakdown from './GroupBalanceBreakdown';

const GroupBalanceList = ({ member, transactionMatrix }) => {

  const [isExpanded, setIsExpanded] = useState(false);

  const currentUserBalance = transactionMatrix.rowSum[member.username] - transactionMatrix.colSum[member.username];

  const userBreakdown = generateUserBalanceBreakdown(member.username, transactionMatrix.matrix);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  }

  return (
    <div key={member.userId} className="bg-white/60 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-100 hover:bg-white/80 transition-all duration-200">
      <div
        className={`p-4 sm:p-6 cursor-pointer`}
        onClick={toggleExpanded}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
            <GroupBalanceListItemIcon member={member} />
            <GroupBalanceListItemDetails
              member={member}
              balance={currentUserBalance}
            />
          </div>

          <div className="text-right flex-shrink-0">
            <GroupBalanceListItemAmount member={member} balance={currentUserBalance} />
          </div>
          <div className="ml-2">
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </div>

        </div>
        {isExpanded && (
          <div className="px-4 sm:px-6 pb-4 sm:pb-6 border-t border-gray-100">
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">
                Breakdown:
              </h4>
              <GroupBalanceBreakdown
                member={member}
                breakdown={userBreakdown}
                balance={currentUserBalance}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default GroupBalanceList;