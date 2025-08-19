import React from 'react'

const colorThemes = {
  blue: {
    bg: 'from-white via-white to-gray-50',
    overlay: 'from-blue-500/5 to-purple-500/5',
    iconBg: 'from-blue-500 to-blue-600'
  },
  red: {
    bg: 'from-white via-white to-red-50',
    overlay: 'from-red-500/5 to-orange-500/5',
    iconBg: 'from-red-500 to-red-600'
  },
  yellow: {
    bg: 'from-white via-white to-yellow-50',
    overlay: 'from-yellow-500/5 to-orange-500/5',
    iconBg: 'from-yellow-500 to-yellow-600'
  },
  purple: {
    bg: 'from-white via-white to-purple-50',
    overlay: 'from-purple-500/5 to-pink-500/5',
    iconBg: 'from-purple-500 to-purple-600'
  }
};

const UserProfileSectionCard = ({
  icon: Icon,
  title,
  subtitle,
  colorTheme = 'blue',
  children,
  className = ''
}) => {

  const theme = colorThemes[colorTheme];

  return (
    <div className={`bg-gradient-to-br ${theme.bg} backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 relative overflow-hidden ${className}`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${theme.overlay} rounded-2xl`}></div>
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className={`w-10 h-10 bg-gradient-to-br ${theme.iconBg} rounded-lg flex items-center justify-center shadow-lg`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-600">{subtitle}</p>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default UserProfileSectionCard;