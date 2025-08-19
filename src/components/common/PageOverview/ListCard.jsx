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

const ListCard = ({
  icon: Icon, 
  title, 
  colorTheme = 'blue',
  isLoading = false,
  emptyState,
  children,
  className = ''
}) => {

  return (
    <GlassCard colorTheme={colorTheme} className={className}>
      <div className="h-full flex flex-col">
        {isLoading ? (
          <div className="flex justify-center items-center flex-1">
            <Loader2 className={`w-8 h-8 text-${colorTheme}-500 animate-spin`} />
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 bg-gradient-to-br ${iconColorThemes[colorTheme]} rounded-lg flex items-center justify-center shadow-lg`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{title}</h3>
            </div>

            <div className="flex-1 min-h-0 max-h-60 overflow-y-auto custom-scrollbar">
              {children || emptyState}
            </div>
          </>
        )}
      </div>
    </GlassCard>
  );
};

export default ListCard;