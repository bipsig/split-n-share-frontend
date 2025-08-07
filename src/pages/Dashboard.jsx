import React from 'react'
import Tile from '../components/common/CardTiles/Tile'
import { Home } from 'lucide-react'

const Dashboard = () => {
  return (
    <div className="w-full h-full space-y-4 lg:space-y-6 bg-gray-50">

      {/* Header */}
      <div className="text-xl lg:text-2xl font-semibold text-gray-900">Dashboard</div>

      {/* Section 1: 3 cards - Stack on mobile, grid on larger screens */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Total Balance - Fixed size */}
        <div className="bg-white shadow-sm rounded-lg p-4 lg:p-6 text-center order-1">
          <h3 className="text-xs lg:text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Total Balance
          </h3>
          <p className="text-2xl lg:text-3xl font-bold text-gray-800 mb-1">₹245.50</p>
          <p className="text-xs lg:text-sm text-gray-600">
            You are owed <span className="font-medium text-green-600">₹320.75</span> and you owe <span className="font-medium text-red-600">₹75.25</span>
          </p>
        </div>

        {/* You Owe - Dynamic with max height and scroll */}
        <div className="bg-white shadow-sm rounded-lg p-4 flex flex-col order-2">
          <h3 className="text-xs lg:text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            You Owe
          </h3>
          <div className="flex-1 min-h-0 max-h-60 lg:max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <div className="space-y-1">
              <Tile
                icon={<Home size={18} className="text-gray-600" />}
                heading="Apartment"
                subheading="with Sarah, Mike, James"
                amount="-₹75.25"
                note="you owe"
              />
              <Tile
                icon={<Home size={18} className="text-gray-600" />}
                heading="Groceries"
                subheading="with Mike"
                amount="-₹25.00"
                note="you owe"
              />
              <Tile
                icon={<Home size={18} className="text-gray-600" />}
                heading="Utilities"
                subheading="with Sarah, James"
                amount="-₹150.50"
                note="you owe"
              />
              <Tile
                icon={<Home size={18} className="text-gray-600" />}
                heading="Internet"
                subheading="with Roommates"
                amount="-₹50.00"
                note="you owe"
              />
              <Tile
                icon={<Home size={18} className="text-gray-600" />}
                heading="Dinner"
                subheading="with Friends"
                amount="-₹80.75"
                note="you owe"
              />
            </div>
          </div>
        </div>

        {/* You Are Owed - Dynamic with max height and scroll */}
        <div className="bg-white shadow-sm rounded-lg p-4 flex flex-col order-3">
          <h3 className="text-xs lg:text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            You Are Owed
          </h3>
          <div className="flex-1 min-h-0 max-h-60 lg:max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <div className="space-y-1">
              <Tile
                icon={<Home size={18} className="text-gray-600" />}
                heading="Apartment"
                subheading="with Sarah, Mike, James"
                amount="+₹150.25"
                note="you are owed"
              />
              <Tile
                icon={<Home size={18} className="text-gray-600" />}
                heading="Movie Tickets"
                subheading="with Alex, John"
                amount="+₹170.50"
                note="you are owed"
              />
              <Tile
                icon={<Home size={18} className="text-gray-600" />}
                heading="Lunch"
                subheading="with Sarah"
                amount="+₹45.00"
                note="you are owed"
              />
            </div>
          </div>
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
            <Tile
              icon={<Home size={18} className="text-gray-600" />}
              heading="Apartment"
              subheading="with Sarah, Mike, James"
              amount="+₹150.25"
              note="you are owed"
            />
            <Tile
              icon={<Home size={18} className="text-gray-600" />}
              heading="Weekend Trip"
              subheading="with College Friends"
              amount="-₹200.50"
              note="you owe"
            />
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
