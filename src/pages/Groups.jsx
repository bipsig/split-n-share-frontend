import React, { useState } from 'react';
import {
  Users,
  Plus,
  Settings,
  Search,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import { parseAmount } from '../utils/parseAmount';
import PageLayout from '../layouts/PageLayout';
import PageHeaderSection from '../layouts/PageHeaderSection';
import HeaderButton from '../components/common/PageHeader/HeaderButton';
import PageOverviewSection from '../layouts/PageOverviewSection';
import StatsCard from '../components/common/PageOverview/StatsCard';
import { useGetCompleteGroupsSummaryQuery } from '../redux/slices/api/groupsApi';
import SearchFilterSkeleton from '../components/skeleton/SearchFilterSkeleton';
import GroupsListSkeleton from '../components/skeleton/GroupsListSkeleton';
import GroupsListSection from '../layouts/GroupsListSection';
import EmptyGroupsLists from '../components/common/Groups/EmptyGroupsLists';
import GroupListCard from '../components/common/Groups/GroupListCard';
import SearchBar from '../components/common/SearchBar/SearchBar';
import FilterSelect from '../components/common/FilterSelect/FilterSelect';
import Modal from '../components/modals/Modal';
import NewGroupForm from '../components/ui/Forms/NewGroupForm/CreateNewGroupForm';
import BufferLength from '../layouts/BufferLength';

const Groups = () => {
  const { data, isLoading: isGroupsDataLoading, isError: isGroupsDataError, refetch } = useGetCompleteGroupsSummaryQuery();
  const [isNewGroupModalOpen, setIsNewGroupModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const groupsData = data ? data.groupsSummary : [];

  const categoryOptions = [
    { id: 1, value: 'all', title: 'All Categories' },
    { id: 2, value: 'Home', title: 'Home' },
    { id: 3, value: 'Trip', title: 'Trip' },
    { id: 4, value: 'Office', title: 'Office' },
    { id: 5, value: 'Friends', title: 'Friends' },
    { id: 6, value: 'Other', title: 'Other' },
  ]

  const statusOptions = [
    { id: 1, value: 'all', title: 'All Status' },
    { id: 2, value: 'active', title: 'Active' },
    { id: 3, value: 'inactive', title: 'Inactive' }
  ];

  const filteredGroups = groupsData.filter(group => {
    const matchesSearch = group.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || group.category === filterCategory;
    const matchesStatus = filterStatus === 'all' ||
      (filterStatus === 'active' && group.isActive) ||
      (filterStatus === 'inactive' && !group.isActive);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <PageLayout>

      <PageHeaderSection
        heading="Your Groups"
        subtitle="Manage your expense groups and track spending"
      >
        <HeaderButton
          variant='primary'
          icon={Plus}
          onClick={() => setIsNewGroupModalOpen(true)}
        >
          New Group
        </HeaderButton>
        <HeaderButton variant='secondary' icon={Settings}>
          Settings
        </HeaderButton>
      </PageHeaderSection>

      {/* Search and Filter Section - Show skeleton when loading */}
      {isGroupsDataLoading ? (
        <SearchFilterSkeleton />
      ) : (
        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search Bar */}
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder="Search groups..." />

            {/* Filters */}

            <div className="flex gap-3 w-full lg:w-auto">
              <FilterSelect
                filterType={filterCategory}
                setFilterType={setFilterCategory}
                options={categoryOptions}
              />

              <FilterSelect
                filterType={filterStatus}
                setFilterType={setFilterStatus}
                options={statusOptions}
              />
            </div>
          </div>
        </div>
      )}

      {/* Overview Section - Use isLoading prop */}
      <PageOverviewSection>
        <StatsCard
          icon={Users}
          title="Total Groups"
          value={`${groupsData.length}`}
          subtitle={
            <p className="text-sm text-gray-600 text-center">{groupsData.filter(g => g?.isActive).length} active</p>
          }
          isLoading={isGroupsDataLoading}
        />

        <StatsCard
          icon={TrendingUp}
          title="Total You'are Owed"
          value={`${parseAmount(groupsData.reduce((sum, group) => sum + (group?.userBalance > 0 ? group.userBalance : 0), 0))}`}
          subtitle={
            <p className="text-sm text-gray-600 text-center">Across all groups</p>
          }
          valueClassName='text-green-600'
          colorTheme="green"
          isLoading={isGroupsDataLoading}
        />

        <StatsCard
          icon={TrendingDown}
          title="Total You Owe"
          value={`${parseAmount(Math.abs(groupsData.reduce((sum, group) => sum + (group?.userBalance < 0 ? group.userBalance : 0), 0)))}`}
          subtitle={
            <p className="text-sm text-gray-600 text-center">Across all groups</p>
          }
          valueClassName='text-red-600'
          colorTheme="red"
          isLoading={isGroupsDataLoading}
        />
      </PageOverviewSection>

      {/* Groups List - Show skeleton when loading */}
      {isGroupsDataLoading ? (
        <GroupsListSkeleton />
      ) : (
        <GroupsListSection>
          {filteredGroups.length === 0 ? (
            <EmptyGroupsLists
              searchTerm={searchTerm}
              filterCategory={filterCategory}
              filterStatus={filterStatus}
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredGroups.map((group) => (
                <GroupListCard
                  group={group}
                />
              ))}
            </div>
          )}
        </GroupsListSection>
      )}

      <BufferLength />

      {isNewGroupModalOpen && (
        <Modal
          isOpen={isNewGroupModalOpen}
          onClose={() => setIsNewGroupModalOpen(false)}
          title={"Create a Group"}
          subtitle={"Create a Group Subtitle"}
        >
          <NewGroupForm setIsNewGroupModalOpen={setIsNewGroupModalOpen} refetchFunction={refetch} />
        </Modal>
      )}

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
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </PageLayout>
  );
};

export default Groups;