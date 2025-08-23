import { Plus, Users } from 'lucide-react';
import React from 'react'
import HeaderButton from '../PageHeader/HeaderButton';

const EmptyGroupsLists = ({ searchTerm, filterCategory, filterStatus}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-12">
      <div className="bg-blue-100 text-blue-600 w-16 h-16 flex items-center justify-center rounded-full mb-4 shadow-lg">
        <Users size={32} />
      </div>
      <h4 className="text-gray-800 font-semibold text-lg mb-2">
        {searchTerm || filterCategory !== 'all' || filterStatus !== 'all' ? 'No groups found' : 'No groups yet'}
      </h4>
      <p className="text-gray-500 text-sm max-w-sm mb-6">
        {searchTerm || filterCategory !== 'all' || filterStatus !== 'all'
          ? 'Try adjusting your search or filter criteria'
          : 'Create your first group to start splitting expenses with friends and family'}
      </p>
      {!searchTerm && filterCategory === 'all' && filterStatus === 'all' && (
        <HeaderButton variant='primary' icon={Plus}>
          Create your First Group
        </HeaderButton>
      )}
    </div>
  )
}

export default EmptyGroupsLists;