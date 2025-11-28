import React from 'react'
import UserProfileSectionCard from './UserProfileSectionCard';
import UserActionItem from './UserActionItem';
import { Shield, Bell, Lock } from 'lucide-react';
import UserPasswordChangeForm from './UserPasswordChangeForm';

const UserSecuritySection = ({ 
  isChangingPassword, 
  setIsChangingPassword, 
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
  passwordUpdationDate
}) => {
  const lastPasswordChange = Math.floor((new Date() - new Date(passwordUpdationDate)) / (1000 * 60 * 60 * 24));


  return (
    <UserProfileSectionCard
      icon={Shield}
      title="Security Settings"
      subtitle="Manage your account security"
      colorTheme="red"
    >
      {!isChangingPassword ? (
        <div className="space-y-4">
          <UserActionItem
            icon={Lock}
            title="Password"
            subtitle={`Last changed ${lastPasswordChange} days ago`}
            actionText="Change"
            variant="danger"
            iconBg="bg-gray-100 text-gray-600"
            onAction={() => setIsChangingPassword(true)}
          />
          <UserActionItem
            icon={Bell}
            title="Notifications"
            subtitle="Email notifications enabled"
            actionText="Manage"
            variant="default"
            iconBg="bg-gray-100 text-gray-600"
            disabled={true}
          />
        </div>
      ) : (
        <UserPasswordChangeForm
          passwordData={passwordData}
          setPasswordData={setPasswordData}
          showCurrentPassword={showCurrentPassword}
          setShowCurrentPassword={setShowCurrentPassword}
          showNewPassword={showNewPassword}
          setShowNewPassword={setShowNewPassword}
          showConfirmPassword={showConfirmPassword}
          setShowConfirmPassword={setShowConfirmPassword}
          handlePasswordChange={handlePasswordChange}
          isLoading={isLoading}
          onCancel={() => {
            setIsChangingPassword(false);
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
          }}
        />
      )}
    </UserProfileSectionCard>
  );
};

export default UserSecuritySection;