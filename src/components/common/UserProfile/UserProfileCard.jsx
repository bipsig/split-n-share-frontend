import React from 'react'
import UserFormField from './UserFormField';
import UserProfileSectionCard from './UserProfileSectionCard';
import UserProfilePicture from './UserProfilePicture';
import { Briefcase, Calendar, Mail, MapPin, Phone, User } from 'lucide-react';
import { parseTime } from '../../../utils/parseTime';

const UserProfileCard = ({ userData, editData, setEditData, isEditing }) => {
  return (
    <UserProfileSectionCard
      icon={User}
      title="Profile Information"
      subtitle="Your personal details and contact information"
      colorTheme="blue"
    >
      <UserProfilePicture userData={userData} isEditing={isEditing} />

      <div className="space-y-4">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UserFormField
            label="First Name"
            value={isEditing ? editData.firstName : userData.firstName}
            onChange={(value) => setEditData({ ...editData, firstName: value })}
            isEditing={isEditing}
          />
          <UserFormField
            label="Last Name"
            value={isEditing ? editData.lastName : userData.lastName}
            onChange={(value) => setEditData({ ...editData, lastName: value })}
            isEditing={isEditing}
          />
        </div>

        {/* Username and Gender */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UserFormField
            label="Username"
            value={`@${userData.username}`}
            isEditing={false}
            disabled={true}
            disabledMessage="Username cannot be changed"
          />
          <UserFormField
            label="Gender"
            value={userData.gender}
            isEditing={false}
            disabled={true}
            disabledMessage="Gender cannot be changed"
          />
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UserFormField
            label="Mobile Number"
            icon={Phone}
            value={isEditing ? editData.mobileNumber : userData.mobileNumber}
            onChange={(value) => setEditData({ ...editData, mobileNumber: value })}
            isEditing={isEditing}
            placeholder="Enter mobile number"
          />
          <UserFormField
            label="Email Address"
            icon={Mail}
            type="email"
            value={isEditing ? editData.email : userData.email}
            onChange={(value) => setEditData({ ...editData, email: value })}
            isEditing={isEditing}
          />
        </div>

        {/* Location and Occupation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UserFormField
            label="Location"
            icon={MapPin}
            value={isEditing ? editData.location : userData.location}
            onChange={(value) => setEditData({ ...editData, location: value })}
            isEditing={isEditing}
            placeholder="Enter your location"
          />
          <UserFormField
            label="Occupation"
            icon={Briefcase}
            value={isEditing ? editData.occupation : userData.occupation}
            onChange={(value) => setEditData({ ...editData, occupation: value })}
            isEditing={isEditing}
            placeholder="Enter your occupation"
          />
        </div>

        {/* Member Since */}
        <UserFormField
          label="Member Since"
          icon={Calendar}
          value={parseTime(userData.createdAt)}
          isEditing={false}
          disabled={true}
        />
      </div>
    </UserProfileSectionCard>
  );
};

export default UserProfileCard;
