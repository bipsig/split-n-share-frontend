import { Calendar, CheckCircle, Clock, Crown, MoreVertical, UserStar, UserX, XCircle } from 'lucide-react';
import React from 'react'
import { parseTime } from '../../../utils/parseTime';
import useUser from '../../../hooks/useUser';
import { useParams } from 'react-router-dom';
import { useToggleAdminStatusMutation } from '../../../redux/slices/api/groupsApi';
import { useDispatch } from 'react-redux';
import { apiSlice } from '../../../redux/slices/api/apiSlice';
import toast from 'react-hot-toast';

const MemberList = ({ member, isCurrentUserAdmin }) => {
  const { username: currentUsername } = useUser();
  const { id: groupId } = useParams();
  const dispatch = useDispatch();

  const [toggleAdminStatus, { isLoading }] = useToggleAdminStatusMutation();

  const handleToggleAdminStatus = async () => {
    if (!groupId || !member?.username) {
      toast.error("Missing required data to toggle admin status");
      return;
    }

    const newRole = member.role === 'Admin' ? 'Member' : 'Admin';

    // Optimistic update
    const patchResult = dispatch(
      apiSlice.util.updateQueryData('getIndividualGroupDetails', groupId, (draft) => {
        const memberToUpdate = draft.groupData.members.find(m => m.username === member.username);
        if (memberToUpdate) {
          memberToUpdate.role = newRole;
        }
      })
    );

    try {
      await toggleAdminStatus({
        groupId,
        username: member.username,
      }).unwrap();

      toast.success(`${member.username} ${newRole === 'Admin' ? 'promoted to' : 'demoted from'} admin`);
    } catch (err) {
      // Revert optimistic update on error
      patchResult.undo();
      console.error('Error:', err);
      toast.error(`Unable to update user: ${err?.data?.message || err.message}`);
    }
  };

  // Use optimistic role for immediate UI feedback
  const displayRole = member.role;
  const isAdmin = displayRole === 'Admin';

  return (
    <div key={member.user} className="bg-white/60 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-100 hover:bg-white/80 transition-all duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
          <div className="relative flex-shrink-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gray-400 to-gray-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-sm sm:text-lg font-bold">
                {member.username.charAt(0).toUpperCase()}
              </span>
            </div>
            {isAdmin && (
              <Crown size={14} className="sm:w-4 sm:h-4 absolute -top-1 -right-1 text-yellow-500" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <p className="font-bold text-gray-800 text-sm sm:text-base break-words">{member.username}</p>
              <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${isAdmin
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-blue-100 text-blue-700'
                }`}>
                {displayRole}
              </span>
              {isLoading && (
                <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded-full text-xs animate-pulse">
                  Updating...
                </span>
              )}
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs sm:text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar size={12} />
                <span className="break-words">Joined {parseTime(member.joinedAt)}</span>
              </div>
              <div className="flex items-center gap-1">
                {member.status === 'active' && (
                  <>
                    <CheckCircle size={12} className="text-green-500" />
                    <span className="text-green-600">Active</span>
                  </>
                )}
                {member.status === 'pending' && (
                  <>
                    <Clock size={12} className="text-yellow-500" />
                    <span className="text-yellow-600">Pending</span>
                  </>
                )}
                {member.status === 'left' && (
                  <>
                    <XCircle size={12} className="text-red-500" />
                    <span className="text-red-600">Left</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          {member.status === 'pending' && (
            <>
              <button className="px-3 py-1.5 sm:py-2 bg-green-100 text-green-700 rounded-lg text-xs sm:text-sm font-medium hover:bg-green-200 transition-all duration-200 whitespace-nowrap">
                Accept
              </button>
              <button className="px-3 py-1.5 sm:py-2 bg-red-100 text-red-700 rounded-lg text-xs sm:text-sm font-medium hover:bg-red-200 transition-all duration-200 whitespace-nowrap">
                Decline
              </button>
            </>
          )}
          {isCurrentUserAdmin && (
            <div className="relative group">
              {!isAdmin ? (
                <button
                  className={`p-1.5 sm:p-2 rounded-lg transition-all duration-200 ${
                    isLoading 
                      ? "text-gray-300 cursor-not-allowed bg-gray-100"
                      : "text-green-500 hover:text-green-700 hover:bg-green-50 cursor-pointer"
                  }`}
                  onClick={handleToggleAdminStatus}
                  disabled={isLoading}
                >
                  <UserStar size={16} />
                </button>
              ) : (
                <button
                  className={`p-1.5 sm:p-2 rounded-lg transition-all duration-200 ${
                    member.username === currentUsername || isLoading
                      ? "text-gray-300 cursor-not-allowed bg-gray-100"
                      : "text-red-500 hover:text-red-700 hover:bg-red-50 cursor-pointer"
                  }`}
                  onClick={() => member.username !== currentUsername && !isLoading && handleToggleAdminStatus()}
                  disabled={member.username === currentUsername || isLoading}
                >
                  <UserX size={16} />
                </button>
              )}

              {/* Tooltip with fade + slide-up */}
              <span
                className="absolute -top-8 left-1/2 -translate-x-1/2  px-2 py-1 text-xs rounded-md shadow-md  bg-gray-800 text-white  opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out pointer-events-none whitespace-nowrap"
              >
                {
                  member.username === currentUsername
                    ? "Cannot Demote yourself"
                    : isAdmin
                      ? "Demote to Member"
                      : "Promote to Admin"
                }
              </span>
            </div>
          )}
          <button className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-200">
            <MoreVertical size={14} className="sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default MemberList;