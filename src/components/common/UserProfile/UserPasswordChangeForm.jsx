import React from 'react'
import UserPasswordInput from './UserPasswordInput';
import { Lock, Loader2 } from 'lucide-react';

const UserPasswordChangeForm = ({
  passwordData,
  setPasswordData,
  showCurrentPassword,
  setShowCurrentPassword,
  showNewPassword,
  setShowNewPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  handlePasswordChange,
  isLoading,
  onCancel
}) => {
  return (
    <div className="space-y-4">
      <UserPasswordInput
        label="Current Password"
        value={passwordData.currentPassword}
        onChange={(value) => setPasswordData({ ...passwordData, currentPassword: value })}
        show={showCurrentPassword}
        onToggle={() => setShowCurrentPassword(!showCurrentPassword)}
        placeholder="Enter current password"
      />
      
      <UserPasswordInput
        label="New Password"
        value={passwordData.newPassword}
        onChange={(value) => setPasswordData({ ...passwordData, newPassword: value })}
        show={showNewPassword}
        onToggle={() => setShowNewPassword(!showNewPassword)}
        placeholder="Enter new password"
      />
      
      <UserPasswordInput
        label="Confirm New Password"
        value={passwordData.confirmPassword}
        onChange={(value) => setPasswordData({ ...passwordData, confirmPassword: value })}
        show={showConfirmPassword}
        onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
        placeholder="Confirm new password"
      />

      <div className="flex gap-3 pt-2">
        <button
          onClick={handlePasswordChange}
          disabled={isLoading}
          className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Lock size={18} />}
          {isLoading ? 'Changing...' : 'Change Password'}
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UserPasswordChangeForm;