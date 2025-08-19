import React, { useState } from 'react';
import {
  Settings,
  Edit3,
  Save,
  X,
  CheckCircle,
  Users,
  TrendingUp,
  Activity,
} from 'lucide-react';
import { parseAmount } from '../utils/themes/parseAmount';
import useUser from '../hooks/useUser';
import { useUpdateUserDetailsMutation } from '../redux/slices/api/usersApi';
import toast from 'react-hot-toast';
import HeaderWithSubtitle from '../components/common/PageHeader/HeaderWithSubtitle';
import PageLayout from '../layouts/PageLayout';
import HeaderButton from '../components/common/PageHeader/HeaderButton';
import PageHeaderSection from '../layouts/PageHeaderSection';
import PageOverviewSection from '../layouts/PageOverviewSection';
import StatsCard from '../components/common/PageOverview/StatsCard';
import UserProfileCard from '../components/common/UserProfile/UserProfileCard';
import UserSecuritySection from '../components/common/UserProfile/UserSecuritySection';
import UserAccountActions from '../components/common/UserProfile/UserAccountActions';
import UserAccountStatistics from '../components/common/UserProfile/UserAccountStatistics';

const UserProfile = () => {
  const [updateUserDetails, { isLoading, isError, error, isSuccess, data }] = useUpdateUserDetailsMutation();

  // Profile editing state
  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Password change state
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { user } = useUser();

  // Default user data with fallbacks
  const userData = user?.userData || {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    mobileNumber: '',
    location: '',
    occupation: '',
    gender: '',
    picturePath: null,
    isActive: true,
    totalBalance: 0,
    createdAt: new Date().toISOString(),
    groups: [],
    transactions: []
  };

  const [editData, setEditData] = useState(userData);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Profile editing handlers
  const handleEdit = () => {
    setIsEditing(true);
    setEditData(userData);
  };

  const handleSave = async () => {
    const updatedFields = {
      firstName: editData.firstName,
      lastName: editData.lastName,
      email: editData.email,
      mobileNumber: editData.mobileNumber,
      location: editData.location,
      occupation: editData.occupation
    };

    try {
      const result = await updateUserDetails(updatedFields).unwrap();
      setIsEditing(false);
      toast.success('Changes saved successfully!');
    } catch (err) {
      console.error('Error:', err);
      toast.error(`Unable to update user: ${err.data.message}`);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData(userData);
  };

  // Password change handler
  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      // Simulate API call - replace with your actual password change API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsChangingPassword(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setSaveSuccess(true);
      toast.success('Password changed successfully!');
      
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      toast.error('Failed to change password');
    }
  };

  return (
    <PageLayout>
      {/* Success Message */}
      {saveSuccess && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-pulse">
          <CheckCircle size={20} />
          <span>Changes saved successfully!</span>
        </div>
      )}

      {/* Header Section */}
      <PageHeaderSection
        heading="Profile Settings"
        subtitle="Manage your account information and preferences"
      >
        {!isEditing ? (
          <HeaderButton
            variant="primary"
            icon={Edit3}
            onClick={handleEdit}
          >
            Edit Profile
          </HeaderButton>
        ) : (
          <>
            <HeaderButton
              variant="success"
              icon={Save}
              onClick={handleSave}
              loading={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save'}
            </HeaderButton>

            <HeaderButton
              variant="secondary"
              icon={X}
              onClick={handleCancel}
            >
              Cancel
            </HeaderButton>
          </>
        )}
        
        <HeaderButton variant="secondary" icon={Settings}>
          Settings
        </HeaderButton>
      </PageHeaderSection>

      {/* Profile Overview Cards */}
      <PageOverviewSection>
        <StatsCard
          icon={Users}
          title="Groups Joined"
          value={userData.groups?.length || 0}
          subtitle="Active memberships"
          colorTheme="blue"
        />

        <StatsCard
          icon={Activity}
          title="Transactions"
          value={userData.transactions?.length || 0}
          subtitle="Total expenses"
          colorTheme="purple"
        />

        <StatsCard
          icon={TrendingUp}
          title="Total Balance"
          value={parseAmount(userData.totalBalance)}
          subtitle="Current standing"
          valueClassName={userData.totalBalance >= 0 ? 'text-green-600' : 'text-red-600'}
          colorTheme="green"
        />
      </PageOverviewSection>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Information */}
        <UserProfileCard 
          userData={userData}
          editData={editData}
          setEditData={setEditData}
          isEditing={isEditing}
        />

        <div className="space-y-6">
          {/* Security Settings */}
          <UserSecuritySection
            isChangingPassword={isChangingPassword}
            setIsChangingPassword={setIsChangingPassword}
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
          />

          {/* Account Actions */}
          {/* <UserAccountActions userData={userData} /> */}

          {/* Account Statistics */}
          <UserAccountStatistics userData={userData} />
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
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
    </PageLayout>
  );
};

export default UserProfile;