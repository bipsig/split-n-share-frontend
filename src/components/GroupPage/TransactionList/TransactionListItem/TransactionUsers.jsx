import React, { useState } from 'react'
import { X } from 'lucide-react'
import MobileModal from '../../../modals/MobileModal'

const TransactionUsers = ({ transaction }) => {
  const [showModal, setShowModal] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleUserClick = () => {
    if (isMobile) {
      setShowModal(true)
    }
  }

  return (
    <>
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <span className="text-xs text-gray-500 whitespace-nowrap">
          {transaction.type === 'Expense' ? 'Split among:' : 'Paid to: '}
        </span>
        <div className="flex items-center gap-1">
          {transaction.users_involved.slice(0, 3).map((user, idx) => (
            <div key={idx} className="relative group/user">
              <div 
                onClick={handleUserClick}
                className="w-6 h-6 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0 cursor-pointer hover:scale-110 transition-transform duration-200 active:scale-95"
              >
                {user.username.charAt(0).toUpperCase()}
              </div>

              {/* Desktop Tooltip */}
              {!isMobile && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover/user:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                  {user.username}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              )}
            </div>
          ))}
          {transaction.users_involved.length > 3 && (
            <div className="relative group/more">
              <div 
                onClick={handleUserClick}
                className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 text-xs font-medium flex-shrink-0 cursor-pointer hover:bg-gray-300 transition-colors duration-200 active:scale-95"
              >
                +{transaction.users_involved.length - 3}
              </div>

              {/* Desktop Tooltip for remaining users */}
              {!isMobile && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover/more:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 max-w-48">
                  <div className="space-y-1">
                    <div className="font-medium mb-1">Other users:</div>
                    {transaction.users_involved.slice(3).map((user, idx) => (
                      <div key={idx}>
                        {user.username}
                      </div>
                    ))}
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Modal */}
      <MobileModal
        isOpen={isMobile && showModal}
        onClose={() => setShowModal(false)}
        title={transaction.type === 'Expense' ? 'Split Among' : 'Paid To'}
        subtitle={`${transaction.users_involved.length} ${transaction.users_involved.length === 1 ? 'person' : 'people'}`}
      >
        <div className="space-y-2">
          {transaction.users_involved.map((user, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-3 p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-100 hover:bg-white/80 hover:shadow-md transition-all duration-200"
            >
              <div className="w-11 h-11 bg-gradient-to-br from-gray-400 to-gray-500 rounded-xl flex items-center justify-center text-white font-semibold shadow-lg flex-shrink-0">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-800 truncate">
                  {user.username}
                </div>
                {user.email && (
                  <div className="text-xs text-gray-500 truncate">
                    {user.email}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </MobileModal>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(243, 244, 246, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(156, 163, 175, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(156, 163, 175, 0.7);
        }
      `}</style>
    </>
  )
}

export default TransactionUsers;