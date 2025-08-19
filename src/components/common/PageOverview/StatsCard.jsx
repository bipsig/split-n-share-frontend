import React from 'react'
import GlassCard from '../GlassCard/GlassCard';
import { Loader2 } from 'lucide-react';

const iconColorThemes = {
  blue: 'from-blue-500 to-blue-600',
  purple: 'from-purple-500 to-purple-600',
  green: 'from-green-500 to-green-600',
  red: 'from-red-500 to-red-600',
  gray: 'from-gray-500 to-gray-600'
};

const StatsCard = ({
  icon: Icon, 
  title, 
  value, 
  subtitle, 
  colorTheme = 'blue',
  isLoading = false,
  valueClassName = '',
  className = ''
}) => {
  return (
    <GlassCard colorTheme={colorTheme} className={className}>
      <div className="text-center">
        {isLoading ? (
          <div className="flex justify-center items-center h-24">
            <Loader2 className={`w-8 h-8 text-${colorTheme}-500 animate-spin`} />
          </div>
        ) : (
          <>
            <div className={`w-12 h-12 bg-gradient-to-br ${iconColorThemes[colorTheme]} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
              {title}
            </h3>
            <p className={`text-3xl lg:text-4xl font-bold mb-3 ${valueClassName || 'text-gray-800'}`}>
              {value}
            </p>
            <p className="text-sm text-gray-600">{subtitle}</p>
          </>
        )}
      </div>
    </GlassCard>
  )
}

export default StatsCard;