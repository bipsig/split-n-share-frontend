import React, { useState } from 'react';
import {
  Filter,
  CreditCard,
  DollarSign,
  ArrowUpDown,
  Plus
} from 'lucide-react';
import { parseAmount } from '../utils/parseAmount';
import PageLayout from '../layouts/PageLayout';
import PageHeaderSection from '../layouts/PageHeaderSection';
import HeaderButton from '../components/common/PageHeader/HeaderButton';
import PageOverviewSection from '../layouts/PageOverviewSection';
import StatsCard from '../components/common/PageOverview/StatsCard';
import SearchBar from '../components/common/SearchBar/SearchBar';
import FilterSelect from '../components/common/FilterSelect/FilterSelect';
import { useGetUserTransactionDetailsQuery } from '../redux/slices/api/usersApi';
import AllExpensesPageSkeleton from '../components/skeleton/AllExpensesPage/AllExpensesSkeleton';
import TransactionListHeader from '../components/common/AllExpenses/TransactionList/TransactionListHeader';
import useUser from '../hooks/useUser';
import EmptyTransactionList from '../components/common/AllExpenses/TransactionList/EmptyTransactionList';
import TransactionListItem from '../components/common/AllExpenses/TransactionList/TransactionListItem';
import QuickStatsSection from '../components/common/AllExpenses/QuickStatsSection';
import Modal from '../components/modals/Modal';
import AddExpenseForm from '../components/ui/Forms/AddExpenseForm/AddExpenseForm';

const Expenses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);

  const { username: currentUsername } = useUser();

  const { data: transactions, isLoading: isTransactionsLoading, isError: isTransactionsError, refetch: refetchTransactions } = useGetUserTransactionDetailsQuery();

  const transactionsData = transactions ? transactions.transactionsData : [];

  const refetchAllData = async () => {
    console.log ("Refething all data");
    try {
      await Promise.all([
        refetchTransactions()
      ]);
    }
    catch (err) {
      console.error('Error refetching dashboard data:', err);
    }
  }

  const transactionTypeOptions = [
    { id: 1, value: 'all', title: 'All Types' },
    { id: 2, value: 'expense', title: 'Expenses' },
    { id: 3, value: 'payment', title: 'Payments' }
  ];

  const categoryTypeOptions = [
    { id: 1, value: 'all', title: 'All Categories' },
    { id: 2, value: 'Home', title: 'Home' },
    { id: 3, value: 'Trip', title: 'Trip' },
    { id: 4, value: 'Office', title: 'Office' },
    { id: 5, value: 'Friends', title: 'Friends' },
    { id: 6, value: 'Other', title: 'Other' },
  ]

  const sortingOptions = [
    { id: 1, value: 'newest', title: 'Newest First' },
    { id: 2, value: 'oldest', title: 'Oldest First' },
    { id: 3, value: 'amount-high', title: 'Amount: High to Low' },
    { id: 4, value: 'amount-low', title: 'Amount: Low to High' },
  ]

  const categories = ['all', 'Home', 'Trip', 'Office', 'Friends', 'Other'];

  // Filter and sort transactions
  const filteredTransactions = transactionsData.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.note.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.groupName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || transaction.type.toLowerCase() === filterType;
    const matchesCategory = filterCategory === 'all' || transaction.category === filterCategory;

    return matchesSearch && matchesType && matchesCategory;
  });

  // Sort transactions
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'amount-high':
        return b.amount - a.amount;
      case 'amount-low':
        return a.amount - b.amount;
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  // Calculate summary statistics
  const totalExpenses = transactionsData.filter(t => t.type === 'Expense').reduce((sum, t) => sum + t.amount, 0);
  const totalPayments = transactionsData.filter(t => t.type === 'Payment').reduce((sum, t) => sum + t.amount, 0);
  const yourExpenses = transactionsData.filter(t => t.user_paid.username === currentUsername).reduce((sum, t) => sum + t.amount, 0);

  if (isTransactionsLoading) {
    return <AllExpensesPageSkeleton />
  }

  if (isTransactionsError) {
    return <PageLayout><p className="text-red-500">Failed to load transactions data.</p></PageLayout>;
  }

  return (
    <PageLayout>

      <PageHeaderSection
        heading="All Expenses"
        subtitle="Track all your transactions across groups"
      >
        <HeaderButton variant='primary' icon={Plus} onClick={() => setIsAddExpenseModalOpen(true)}>
          Add Expense
        </HeaderButton>
      </PageHeaderSection>

      <PageOverviewSection>
        <StatsCard
          icon={DollarSign}
          title={"Total Expenses"}
          value={parseAmount(totalExpenses)}
          subtitle={
            <p className="text-sm text-gray-600 text-center">Across all groups</p>
          }
        />

        <StatsCard
          icon={CreditCard}
          value={parseAmount(yourExpenses)}
          title={'Your Share'}
          colorTheme='green'
          subtitle={
            <p className="text-sm text-gray-600 text-center">Across all groups</p>
          }
        />

        <StatsCard
          icon={DollarSign}
          title={"Transactions"}
          colorTheme='purple'
          value={transactionsData.length}
          subtitle={
            <p className="text-sm text-gray-600 text-center">Across all groups</p>
          }
        />
      </PageOverviewSection>

      {/* Filters and Search */}
      <div className="bg-white/70 backdrop-blur-md rounded-xl shadow-lg border border-white/20 p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder={"Search transactions, groups or notes..."}
          />

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-500" />
              <FilterSelect
                filterType={filterType}
                setFilterType={setFilterType}
                options={transactionTypeOptions}
              />

              <FilterSelect
                filterType={filterCategory}
                setFilterType={setFilterCategory}
                options={categoryTypeOptions}
              />

              <ArrowUpDown size={20} className="text-gray-500" />

              <FilterSelect
                filterType={sortBy}
                setFilterType={setSortBy}
                options={sortingOptions}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white/70 backdrop-blur-md rounded-xl shadow-lg border border-white/20 overflow-hidden">
        <div className="p-4 lg:p-6 border-b border-gray-200/50">
          <TransactionListHeader sortedTransactions={sortedTransactions} />
        </div>

        <div className="p-3 lg:p-6">
          <div className="space-y-3 lg:space-y-4">
            {sortedTransactions.length === 0 ? (
              <EmptyTransactionList searchTerm={searchTerm} filterType={filterType} filterCategory={filterCategory} />
            ) : (
              sortedTransactions.map((transaction) => (
                <TransactionListItem transaction={transaction} />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <QuickStatsSection sortedTransactions={sortedTransactions} transactionsData={transactionsData} totalExpenses={totalExpenses} totalPayments={totalPayments} />

      <Modal
        isOpen={isAddExpenseModalOpen}
        onClose={() => setIsAddExpenseModalOpen(false)}
        title="Add Expense"
        subtitle="Add Expense Subtitle"
      >
        <AddExpenseForm
          setIsAddExpenseModalOpen={setIsAddExpenseModalOpen}
          refetchAPIFunction={refetchAllData}
        />
      </Modal>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
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
    </PageLayout>
  );
};

export default Expenses;