import React from 'react'
import { Home } from 'lucide-react' // Assuming you're using lucide-react

const ActivityTimelineParticipants = ({ activity, userData }) => {
  // Get participants from recipients array
  const participants = userData || [];

  if (participants.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 mt-2">
      {/* Participants display */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500 whitespace-nowrap">Participants:</span>
        <div className="flex items-center gap-1">
          {participants.slice(0, 3).map((participant, idx) => (
            <div key={idx} className="relative group/user">
              <div className="w-6 h-6 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0 cursor-pointer hover:scale-110 transition-transform duration-200">
                {participant.username.charAt(0).toUpperCase()}
              </div>

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover/user:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                {participant.username}
                {participant.isRead && (
                  <span className="ml-1 text-green-400">✓</span>
                )}
                {/* Tooltip arrow */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
              </div>
            </div>
          ))}
          {participants.length > 3 && (
            <div className="relative group/more">
              <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 text-xs font-medium flex-shrink-0 cursor-pointer hover:bg-gray-300 transition-colors duration-200">
                +{participants.length - 3}
              </div>

              {/* Tooltip for remaining participants */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover/more:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 max-w-48">
                <div className="space-y-1">
                  <div className="font-medium mb-1">Other participants:</div>
                  {participants.slice(3).map((participant, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span>{participant.username}</span>
                      {participant.isRead && (
                        <span className="ml-2 text-green-400 text-xs">✓</span>
                      )}
                    </div>
                  ))}
                </div>
                {/* Tooltip arrow */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Group info (if exists) */}
      {activity.context?.group && (
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Home size={12} />
          <span>{activity.context.group.groupName}</span>
        </div>
      )}
    </div>
  )
}

export default ActivityTimelineParticipants;