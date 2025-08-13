import React from 'react'
import { Link } from 'react-router-dom';

const SidebarItemMenu = ({ item, isActive = false }) => {
  const IconComponent = item.icon;
  
  return (
    <li className="relative">
      <Link
        to={item.path}
        className={`
          group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
          transition-all duration-200 ease-in-out
          ${isActive 
            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25' 
            : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
          }
        `}
      >
        <IconComponent 
          size={20} 
          className={`
            transition-transform duration-200
            ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}
            group-hover:scale-110
          `}
        />
        <span className="flex-1">{item.title}</span>
        
        {/* Active indicator */}
        {isActive && (
          <div className="w-2 h-2 bg-white rounded-full opacity-80" />
        )}
      </Link>
    </li>
  );
};

export default SidebarItemMenu;