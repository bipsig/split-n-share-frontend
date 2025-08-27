import { Coins, Receipt, Users, Wallet2 } from 'lucide-react';
import React from 'react'

const TabNavigationBar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'transactions', label: 'Transactions', icon: Receipt },
    { id: 'balances', label: 'My Balances', icon: Wallet2 },
    { id: 'group-balances', label: 'All Balances', icon: Coins },
    { id: 'members', label: 'Members', icon: Users }
  ];

  return (
    <div className="flex border-b border-gray-200/50 overflow-x-auto scrollbar-hide">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-3 sm:py-4 font-medium transition-all duration-200 whitespace-nowrap text-sm sm:text-base ${activeTab === tab.id
            ? 'text-blue-600 bg-blue-50/50 border-b-2 border-blue-600'
            : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50/50'
            }`}
        >
          <tab.icon size={16} className="sm:w-[18px] sm:h-[18px]" />
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  )
}

export default TabNavigationBar;