import React from 'react'
import { getInitials } from '../../../utils/getInitials';

const UserProfilePicture = ({ userData, isEditing = false }) => {
  return (
    <div className="flex items-center gap-4 mb-6 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-100">
      <div className="relative">
        {userData.picturePath ? (
          <img
            src={userData.picturePath}
            alt="Profile"
            className="w-16 h-16 rounded-xl object-cover shadow-lg"
          />
        ) : (
          <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-500 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white text-xl font-bold">
              {getInitials(userData.firstName, userData.lastName)}
            </span>
          </div>
        )}
      </div>
      <div>
        <h4 className="font-semibold text-gray-800">{userData.firstName} {userData.lastName}</h4>
        <p className="text-sm text-gray-600">@{userData.username}</p>
        <div className="flex items-center gap-1 mt-1">
          <div className={`w-2 h-2 rounded-full ${userData.isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="text-xs text-gray-500">{userData.isActive ? 'Active' : 'Inactive'}</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePicture;