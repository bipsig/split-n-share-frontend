import React from 'react'

const Dashboard = () => {
  return (
    <div className="w-full h-full p-6 space-y-6">

      {/* Header */}
      <div className="text-2xl font-semibold">Dashboard</div>

      {/* Section 1: 3 vertical cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow rounded p-4">Total Balance</div>
        <div className="bg-white shadow rounded p-4">You Owe</div>
        <div className="bg-white shadow rounded p-4">You Are Owed</div>
      </div>

      {/* Section 2: full width card */}
      <div className="bg-white shadow rounded p-4">Recent Activity</div>

      {/* Section 3: 2 side-by-side cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white shadow rounded p-4">Your Groups</div>
        <div className="bg-white shadow rounded p-4">Monthly Summary</div>
      </div>

    </div>
  )
}

export default Dashboard
