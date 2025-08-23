import React from 'react'
import { HandCoins, Home, Loader2, Users, Plus, TrendingUp, Activity, CreditCard, Bell } from 'lucide-react'
import { useGetFinancialSummaryQuery, useGetGroupsSummaryQuery, useGetRecentTransactionsQuery } from '../redux/slices/api/usersApi';
import { parseTime } from '../utils/parseTime';
import { parseGroupMembers } from '../utils/parseGroupMembers';
import { parseAmount } from '../utils/parseAmount';
import HeaderWithSubtitle from '../components/common/PageHeader/HeaderWithSubtitle';
import PageLayout from '../layouts/PageLayout';
import HeaderButton from '../components/common/PageHeader/HeaderButton';
import PageHeaderSection from '../layouts/PageHeaderSection';
import PageOverviewSection from '../layouts/PageOverviewSection';
import ListCard from '../components/common/PageOverview/ListCard';
import ListItem from '../components/common/PageOverview/ListItem';
import EmptyState from '../components/common/PageOverview/EmptyState';
import StatsCard from '../components/common/PageOverview/StatsCard';
import RecentActivitySection from '../components/common/Dashboard/RecentActivitySection';
import BottomSectionGrid from '../components/common/Dashboard/BottomSectionGrid';

const Dashboard = () => {
  const { data: financialData, isLoading: isFinancialLoading, isError: isFinancialError } = useGetFinancialSummaryQuery();
  const { data: groupsData, isLoading: isGroupsLoading, isError: isGroupsError } = useGetGroupsSummaryQuery();
  const { data: recentTransactions, isLoading: isTransactionsLoading, isError: isTransactionsError } = useGetRecentTransactionsQuery();

  const safeFinancialData = financialData || {
    balance: 0,
    youGetBack: 0,
    youPay: 0,
    peopleYouOwe: { count: 0, data: [] },
    peopleWhoOweYou: { count: 0, data: [] }
  };

  const balance = safeFinancialData.balance || 0;
  const youGetBack = safeFinancialData.youGetBack || 0;
  const youPay = safeFinancialData.youPay || 0;

  return (
    <PageLayout>
      <PageHeaderSection
        heading="Dashboard"
        subtitle="Manage your expenses and track your balance"
      >
        <HeaderButton
          variant='primary'
          icon={Plus}
        >
          Add Expense
        </HeaderButton>

        <HeaderButton
          variant='secondary'
          icon={CreditCard}
        >
          Settle Up
        </HeaderButton>
      </PageHeaderSection>

      {/* Financial Overview Cards */}
      <PageOverviewSection>
        {/* Total Balance Card */}
        <StatsCard
          icon={TrendingUp}
          title="Total Balance"
          value={parseAmount ? parseAmount(balance) : `₹${balance}`}
          subtitle={
            <div className="text-sm text-gray-600 bg-gray-50/80 rounded-lg p-3">
              You get <span className="font-semibold text-green-600">
                {parseAmount ? parseAmount(youGetBack) : `₹${youGetBack}`}
              </span> ·
              You owe <span className="font-semibold text-red-600">
                {parseAmount ? parseAmount(youPay) : `₹${youPay}`}
              </span>
            </div>
          }
          valueClassName={balance > 0 ? "text-green-600" : "text-red-600"}
          colorTheme="gray"
          isLoading={isFinancialLoading}
        />

        {/* You Owe Card */}
        <ListCard
          icon={Home}
          title="You Owe"
          colorTheme="red"
          isLoading={isFinancialLoading}
          emptyState={
            <EmptyState
              icon={Home}
              title="All Clear! 🎉"
              subtitle="You don't owe anyone"
              colorTheme="green"
            />
          }
        >
          {safeFinancialData?.peopleYouOwe?.count > 0 && (
            <div className="space-y-2">
              {safeFinancialData.peopleYouOwe.data.map((element, index) => (
                <ListItem
                  key={index}
                  username={element.username || 'Unknown'}
                  amount={parseAmount ? parseAmount(element.amount) : `₹${element.amount || 0}`}
                  type="owe"
                  actionIcon={CreditCard}
                  actionText="Pay"
                />
              ))}
            </div>
          )}
        </ListCard>

        {/* You Are Owed Card */}
        <ListCard
          icon={HandCoins}
          title="You Are Owed"
          colorTheme="green"
          isLoading={isFinancialLoading}
          emptyState={
            <EmptyState
              icon={HandCoins}
              title="No pending payments 💸"
              subtitle="Everyone's settled up"
              colorTheme="gray"
            />
          }
        >
          {safeFinancialData?.peopleWhoOweYou?.count > 0 && (
            <div className="space-y-2">
              {safeFinancialData.peopleWhoOweYou.data.map((element, index) => (
                <ListItem
                  key={index}
                  username={element.username || 'Unknown'}
                  amount={parseAmount ? parseAmount(element.amount) : `₹${element.amount || 0}`}
                  type="owed"
                  actionIcon={Bell}
                  actionText="Remind"
                />
              ))}
            </div>
          )}
        </ListCard>
      </PageOverviewSection>

      {/* Recent Activity Section */}
      <RecentActivitySection 
        transactions={recentTransactions}
        isLoading={isTransactionsLoading}
      />

      {/* Bottom Section - Groups and Summary */}
      <BottomSectionGrid 
        groupsData={groupsData}
        isGroupsLoading={isGroupsLoading}
      />
    </PageLayout>
  );
};

export default Dashboard