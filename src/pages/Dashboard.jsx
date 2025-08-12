import React from 'react'
import Tile from '../components/common/CardTiles/Tile'
import { HandCoins, Home, Loader2, Users } from 'lucide-react'
import { useGetFinancialSummaryQuery, useGetGroupsSummaryQuery } from '../redux/slices/api/usersApi';

const Dashboard = () => {
  const { data: financialData, isLoading: isFinancialLoading, isError: isFinancialError } = useGetFinancialSummaryQuery();
  const { data: groupsData, isLoading: isGroupsLoading, isError: isGroupsError } = useGetGroupsSummaryQuery();
  return (
    <div className="w-full h-full space-y-4 lg:space-y-6 bg-gray-50">

      {/* Header */}
      <div className="text-xl lg:text-2xl font-semibold text-gray-900">Dashboard</div>

      {/* Section 1: 3 cards - Stack on mobile, grid on larger screens */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Total Balance - Fixed size */}
        <div className="bg-white shadow-sm rounded-lg p-4 lg:p-6 text-center order-1">
          {isFinancialLoading ? (
            <Loader2 className="w-10 h-10 text-primary-500 animate-spin" />
          ) : (
            <>
              <h3 className="text-xs lg:text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Total Balance
              </h3>
              <p className="text-2xl lg:text-3xl font-bold text-gray-800 mb-1">₹{financialData.balance}</p>
              <p className="text-xs lg:text-sm text-gray-600">
                You are owed <span className="font-medium text-green-600">₹{financialData.youGetBack}</span> and you owe <span className="font-medium text-red-600">₹{financialData.youPay}</span>
              </p>
            </>
          )}
        </div>

        {/* You Owe - Dynamic with max height and scroll */}
        <div className="bg-white shadow-sm rounded-lg p-4 flex flex-col order-2">
          {isFinancialLoading ? (
            <Loader2 className="w-10 h-10 text-primary-500 animate-spin" />
          ) : (
            <>
              <h3 className="text-xs lg:text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                You Owe
              </h3>
              <div className="flex-1 min-h-0 max-h-60 lg:max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                <div className="space-y-1">
                  {financialData?.peopleYouOwe.count == 0 ? (
                    <div className="flex flex-col items-center justify-center h-40 text-gray-500">
                      <div className="p-3 bg-gray-100 rounded-full mb-2">
                        <Home size={20} className="text-gray-400" />
                      </div>
                      <p className="text-sm font-medium">All Clear! 🎉</p>
                      <p className="text-xs text-gray-400">You don’t owe anyone right now</p>
                    </div>
                  ) : (
                    <>
                      {financialData?.peopleYouOwe.data.map((element) => {
                        return (
                          <Tile
                            icon={<Home size={18} className="text-gray-600" />}
                            heading={element.username}
                            subheading={`You owe ₹${element.amount}`}
                            note="pay"
                          />
                        )
                      })}
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="bg-white shadow-sm rounded-lg p-4 flex flex-col order-2">
          {isFinancialLoading ? (
            <Loader2 className="w-10 h-10 text-primary-500 animate-spin" />
          ) : (
            <>
              <h3 className="text-xs lg:text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                You are owed
              </h3>
              <div className="flex-1 min-h-0 max-h-60 lg:max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                <div className="space-y-1">
                  {financialData?.peopleWhoOweYou.count == 0 ? (
                    <div className="flex flex-col items-center justify-center h-40 text-gray-500">
                      <div className="p-3 bg-green-100 rounded-full mb-2">
                        <HandCoins size={20} className="text-green-500" />
                      </div>
                      <p className="text-sm font-medium">No pending payments 💸</p>
                      <p className="text-xs text-gray-400">Everyone’s all settled up</p>
                    </div>
                  ) : (
                    <>
                      {financialData?.peopleWhoOweYou.data.map((element) => {
                        return (
                          <Tile
                            icon={<Home size={18} className="text-gray-600" />}
                            heading={element.username}
                            subheading={`Owes you ₹${element.amount}`}
                            note="remind"
                          />
                        )
                      })}
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Section 2: Recent Activity - Stack on mobile, single column */}
      <div className="bg-white shadow-sm rounded-lg p-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 gap-2">
          <h3 className="text-base lg:text-lg font-semibold text-gray-900">Recent Activity</h3>
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium self-start sm:self-auto">
            View All
          </button>
        </div>
        <div className="space-y-1">
          <Tile
            icon={<Home size={18} className="text-gray-600" />}
            heading="Apartment Rent"
            subheading="with Sarah, Mike, James"
            amount="+₹150.25"
            note="you are owed"
          />
          <Tile
            icon={<Home size={18} className="text-gray-600" />}
            heading="Grocery Shopping"
            subheading="with Mike, James"
            amount="-₹85.50"
            note="you owe"
          />
          <Tile
            icon={<Home size={18} className="text-gray-600" />}
            heading="Movie Night"
            subheading="with Sarah, Alex"
            amount="+₹120.00"
            note="you are owed"
          />
          <Tile
            icon={<Home size={18} className="text-gray-600" />}
            heading="Dinner Out"
            subheading="with Friends"
            amount="-₹75.25"
            note="you owe"
          />
          <Tile
            icon={<Home size={18} className="text-gray-600" />}
            heading="Utilities"
            subheading="with Roommates"
            amount="+₹200.00"
            note="you are owed"
          />
        </div>
      </div>

      {/* Section 3: 2 cards - Stack on mobile, side-by-side on larger screens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white shadow-sm rounded-lg p-4">
          <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-3">Your Groups</h3>
          <div className="space-y-1">
            {isGroupsLoading ? (
              <Loader2 className="w-10 h-10 text-primary-500 animate-spin" />
            ) : (
              <>
                {groupsData?.count === 0 ? (
                  <div className="flex flex-col items-center justify-center h-40 text-gray-500">
                    <div className="p-3 bg-blue-100 rounded-full mb-2">
                      <Users size={22} className="text-blue-500" />
                    </div>
                    <p className="text-sm font-medium">No groups yet</p>
                    <p className="text-xs text-gray-400">Create one to start splitting expenses</p>
                    <button className="mt-3 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded-md transition">
                      + Create Group
                    </button>
                  </div>
                ) : (
                  <>
                    {groupsData.data.map((group) => {
                      let subheading = "with "
                      const members = group.members.length;

                      let i = 0;
                      for (; i < members - 1 && i <= 1; i++) {
                        subheading = subheading.concat (`${group.members[i].username}, `);
                      }

                      subheading = subheading.concat (`${group.members[i].username} `);
                      i++;

                      const diff = members - i;
                      if (diff > 1) {
                        subheading = subheading.concat (`and ${diff} others`)
                      }
                      else if (diff === 1) {
                        subheading = subheading.concat (`and ${diff} other`)
                      }
                      return (
                        <Tile
                          icon={<Home size={18} className="text-gray-600" />}
                          heading={group.name}
                          subheading={subheading}
                          amount={`${group.groupBalance > 0 ? '+' : '-'}₹${Math.abs(group.groupBalance)}`}
                          note={group.type}
                        />
                      )
                    })}
                  </>
                )}
              </>
            )}
          </div>
        </div>
        <div className="bg-white shadow-sm rounded-lg p-4 w-full max-w-full overflow-hidden flex flex-col items-center justify-center text-center">
          <div className="text-lg lg:text-xl font-semibold mb-2 text-gray-900">Monthly Summary</div>
          <span className="text-gray-500 text-sm lg:text-base italic">Coming Soon</span>
        </div>
      </div>

    </div>
  )
}

export default Dashboard
