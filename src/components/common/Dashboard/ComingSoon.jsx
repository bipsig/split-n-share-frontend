import React from 'react';

const ComingSoonCard = ({ 
  icon: Icon, 
  title, 
  description, 
  colorTheme = "yellow",
  badge = "🚀 Coming Soon"
}) => {
  const colorClasses = {
    yellow: {
      gradient: "from-yellow-500/5 to-orange-500/5",
      background: "from-white via-white to-yellow-50",
      icon: "from-yellow-400 to-yellow-500",
      badge: "bg-yellow-100 text-yellow-800"
    },
    purple: {
      gradient: "from-purple-500/5 to-blue-500/5",
      background: "from-white via-white to-purple-50",
      icon: "from-purple-400 to-purple-500",
      badge: "bg-purple-100 text-purple-800"
    },
    green: {
      gradient: "from-green-500/5 to-teal-500/5",
      background: "from-white via-white to-green-50",
      icon: "from-green-400 to-green-500",
      badge: "bg-green-100 text-green-800"
    }
  };

  const colors = colorClasses[colorTheme] || colorClasses.yellow;

  return (
    <div className={`bg-gradient-to-br ${colors.background} backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 relative overflow-hidden`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} rounded-2xl`}></div>
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
        <div className={`w-16 h-16 bg-gradient-to-br ${colors.icon} rounded-xl flex items-center justify-center mb-6 shadow-lg`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className={`inline-flex items-center px-4 py-2 ${colors.badge} rounded-full font-medium`}>
          {badge}
        </div>
      </div>
    </div>
  );
};

export default ComingSoonCard;