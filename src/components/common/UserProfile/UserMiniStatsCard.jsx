import React from 'react'

const colorThemes = {
  blue: 'from-blue-500 to-blue-600',
  green: 'from-green-500 to-green-600',
  purple: 'from-purple-500 to-purple-600',
  yellow: 'from-yellow-500 to-yellow-600'
};

const UserMiniStatsCard = ({ icon: Icon, value, label, colorTheme = 'blue' }) => {

  return (
    <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-100">
      <div className={`w-8 h-8 bg-gradient-to-br ${colorThemes[colorTheme]} rounded-lg flex items-center justify-center mx-auto mb-3`}>
        <Icon className="w-4 h-4 text-white" />
      </div>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      <p className="text-xs text-gray-600">{label}</p>
    </div>
  );
};

export default UserMiniStatsCard;