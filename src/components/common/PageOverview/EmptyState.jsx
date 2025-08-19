import React from 'react'

const colorClasses = {
  blue: { bg: 'bg-blue-100', icon: 'text-blue-500' },
  green: { bg: 'bg-green-100', icon: 'text-green-500' },
  red: { bg: 'bg-red-100', icon: 'text-red-500' },
  gray: { bg: 'bg-gray-100', icon: 'text-gray-400' }
};


const EmptyState = ({ icon: Icon, title, subtitle, colorTheme = 'gray' }) => {

  const colors = colorClasses[colorTheme];

  return (
    <div className="flex flex-col items-center justify-center h-40 text-gray-500">
      <div className={`p-3 ${colors.bg} rounded-full mb-3 shadow-sm`}>
        <Icon size={20} className={colors.icon} />
      </div>
      <p className="text-sm font-medium text-gray-700">{title}</p>
      <p className="text-xs text-gray-500">{subtitle}</p>
    </div>
  );
};

export default EmptyState;