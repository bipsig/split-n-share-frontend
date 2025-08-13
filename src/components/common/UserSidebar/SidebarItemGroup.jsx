import React from 'react'
import { Circle, Hash } from 'lucide-react';
import { Link } from 'react-router-dom';


const SidebarItemGroup = ({ group, isActive = false }) => {
  return (
    <li className="relative">
      <Link
        to={`/user/groups/${group.groupId}`}
        className={`
          group flex items-center gap-3 px-3 py-2 rounded-lg text-sm
          transition-all duration-200 ease-in-out
          ${isActive 
            ? 'bg-gray-800 text-white border-l-2 border-blue-500' 
            : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/30'
          }
        `}
      >
        {/* Placeholder group icon */}
        <div className={`
          flex items-center justify-center w-6 h-6 rounded-md text-xs font-medium
          transition-colors duration-200
          ${isActive 
            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' 
            : 'bg-gray-700 text-gray-500 group-hover:bg-gray-600 group-hover:text-gray-300'
          }
        `}>
          <Hash size={14} />
        </div>
        
        <span className="flex-1 truncate">{group.title}</span>
        
        {/* Unread indicator (placeholder) */}
        <Circle 
          size={6} 
          className={`
            fill-current transition-opacity duration-200
            ${isActive ? 'text-blue-300 opacity-60' : 'text-gray-600 opacity-0 group-hover:opacity-40'}
          `}
        />
      </Link>
    </li>
  );
};


export default SidebarItemGroup;