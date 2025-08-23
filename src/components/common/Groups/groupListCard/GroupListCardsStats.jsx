import React from 'react'
import { getActiveMembers } from '../../../../utils/members'
import { parseAmount } from '../../../../utils/parseAmount'

const GroupListCardsStats = ({ group }) => {
  return (
    <div className="flex justify-between items-center mb-4 py-3 px-4 bg-gray-50/80 rounded-lg">
      <div className="text-center">
        <p className="text-lg font-bold text-gray-800">{getActiveMembers(group.members)}</p>
        <p className="text-xs text-gray-500">Members</p>
      </div>
      <div className="w-px h-8 bg-gray-300"></div>
      <div className="text-center">
        <p className="text-lg font-bold text-gray-800">{group.transactions?.length || 0}</p>
        <p className="text-xs text-gray-500">Expenses</p>
      </div>
      <div className="w-px h-8 bg-gray-300"></div>
      <div className="text-center">
        <p className="text-lg font-bold text-gray-800">{parseAmount(Math.abs(group.totalBalance))}</p>
        <p className="text-xs text-gray-500">Total</p>
      </div>
    </div>
  )
}

export default GroupListCardsStats
