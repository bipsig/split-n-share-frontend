import React from 'react'

const colorThemes = {
  blue: {
    bg: 'from-white via-white to-blue-50',
    overlay: 'from-blue-500/5 to-cyan-500/5'
  },
  purple: {
    bg: 'from-white via-white to-purple-50',
    overlay: 'from-purple-500/5 to-pink-500/5'
  },
  green: {
    bg: 'from-white via-white to-green-50',
    overlay: 'from-green-500/5 to-emerald-500/5'
  },
  red: {
    bg: 'from-white via-white to-red-50',
    overlay: 'from-red-500/5 to-orange-500/5'
  },
  gray: {
    bg: 'from-white via-white to-gray-50',
    overlay: 'from-blue-500/5 to-purple-500/5'
  },
  yellow: {
    bg: 'from-white via-white to-yellow-50',
    overlay: 'from-yellow-500/5 to-orange-500/5'
  }
};

const GlassCard = ({
  children,
  colorTheme = 'blue',
  className = ''
}) => {
  const theme = colorThemes[colorTheme];

  return (
    <div className={`bg-gradient-to-br ${theme.bg} backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 relative overflow-hidden ${className}`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${theme.overlay} rounded-2xl`}></div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

export default GlassCard;