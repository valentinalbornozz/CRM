import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import { useToast } from '../components/modals/Toast';
import ConfirmModal from '../components/modals/ConfirmModal';
import { useModal } from '../hooks/useModal';
import PropAccountModal from '../components/PropAccountModal';
import * as FiIcons from 'react-icons/fi';

const { FiCreditCard, FiEye, FiEdit3, FiTrash2, FiPlus, FiDownload, FiSearch, FiTrendingUp, FiUsers, FiDollarSign, FiActivity } = FiIcons;

const PropAccounts = () => {
  const { showToast, ToastContainer } = useToast();
  const { isOpen, modalData, openModal, closeModal } = useModal();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterProgram, setFilterProgram] = useState('all');
  const [editingAccount, setEditingAccount] = useState(null);
  const [showAccountModal, setShowAccountModal] = useState(false);

  // Programs/Challenges data
  const [programs] = useState([
    {
      id: 'prog_001',
      name: '2-Step Evaluation',
      description: 'Two-phase evaluation program',
      accountSize: '$10,000',
      profitTarget: '8%',
      dailyDrawdown: '5%',
      maxDrawdown: '10%',
      tradingDays: 30,
      minTradingDays: 5,
      price: '$199',
      participants: 1234,
      passRate: '68%',
      color: 'blue'
    },
    {
      id: 'prog_002',
      name: '1-Step Challenge',
      description: 'Single phase evaluation',
      accountSize: '$50,000',
      profitTarget: '8%',
      dailyDrawdown: '5%',
      maxDrawdown: '10%',
      tradingDays: 30,
      minTradingDays: 4,
      price: '$449',
      participants: 567,
      passRate: '45%',
      color: 'green'
    },
    {
      id: 'prog_003',
      name: 'Instant Funding',
      description: 'Direct funded account',
      accountSize: '$25,000',
      profitTarget: 'No Target',
      dailyDrawdown: '3%',
      maxDrawdown: '6%',
      tradingDays: 'Unlimited',
      minTradingDays: 0,
      price: '$899',
      participants: 890,
      passRate: '100%',
      color: 'purple'
    },
    {
      id: 'prog_004',
      name: 'Scaling Program',
      description: 'Progressive account scaling',
      accountSize: '$100,000+',
      profitTarget: '5%',
      dailyDrawdown: '4%',
      maxDrawdown: '8%',
      tradingDays: 'Flexible',
      minTradingDays: 3,
      price: '$1,299',
      participants: 234,
      passRate: '72%',
      color: 'orange'
    }
  ]);

  const [accounts, setAccounts] = useState([
    {
      id: '234975350',
      customerId: 'C12281',
      orderNr: '30712',
      name: 'Natalia Masia',
      program: '2-Step Evaluation',
      accountSize: '$10,000',
      balance: '$10,000.00',
      equity: '$10,000.00',
      platform: 'MetaTrader5',
      status: 'Active',
      phase: 'Challenge',
      server: 'demo\\BW-ORION3-USD-P',
      created: '2024-01-15',
      lastLogin: '30/08/2025 @ 14:30:24',
      profit: '$0',
      profitTarget: '8%',
      dailyDrawdown: '5%',
      maxDrawdown: '10%',
      daysTraded: 0,
      minDays: 5,
      totalDays: 30,
      login: '234975350',
      password: 'jqV*6VoYCM',
      investorPassword: 'GHWfQ*GZYf'
    },
    {
      id: '234975349',
      customerId: 'C24082',
      orderNr: '39328',
      name: 'Ronald Toro',
      program: '1-Step Challenge',
      accountSize: '$50,000',
      balance: '$50,450.75',
      equity: '$50,450.75',
      platform: 'MetaTrader5',
      status: 'Active',
      phase: 'Funded',
      server: 'demo\\BW-ORION2-USD-P',
      created: '2024-01-14',
      lastLogin: '29/08/2025 @ 09:15:12',
      profit: '$450.75',
      profitTarget: 'No Target',
      dailyDrawdown: '5%',
      maxDrawdown: '10%',
      daysTraded: 12,
      minDays: 4,
      totalDays: 30,
      login: '234975349',
      password: 'mK8*9LpXcN',
      investorPassword: 'QwE2*5RtYu'
    },
    {
      id: '234975348',
      customerId: 'C24893',
      orderNr: '39326',
      name: 'Alejandro Bouchikhi',
      program: 'Instant Funding',
      accountSize: '$25,000',
      balance: '$27,340.25',
      equity: '$27,340.25',
      platform: 'MetaTrader5',
      status: 'Under Review',
      phase: 'Funded',
      server: 'demo\\BW-ORION2-USD-P',
      created: '2024-01-13',
      lastLogin: '28/08/2025 @ 16:45:33',
      profit: '$2,340.25',
      profitTarget: 'No Target',
      dailyDrawdown: '3%',
      maxDrawdown: '6%',
      daysTraded: 25,
      minDays: 0,
      totalDays: 'Unlimited',
      login: '234975348',
      password: 'Zx9*4VbNm2',
      investorPassword: 'As7*8HjKl1'
    }
  ]);

  const handleEditAccount = (accountId) => {
    const account = accounts.find(acc => acc.id === accountId);
    setEditingAccount(account);
    setShowAccountModal(true);
  };

  const handleSaveAccount = (updatedAccount) => {
    setAccounts(prev =>
      prev.map(acc =>
        acc.id === updatedAccount.id ? { ...acc, ...updatedAccount } : acc
      )
    );
    setEditingAccount(null);
    setShowAccountModal(false);
  };

  const handleDeleteAccount = (accountId) => {
    const account = accounts.find(acc => acc.id === accountId);
    openModal({
      title: 'Delete Account',
      message: `Are you sure you want to delete account ${accountId} for ${account.name}? This action cannot be undone.`,
      type: 'danger',
      onConfirm: () => {
        setAccounts(prev => prev.filter(acc => acc.id !== accountId));
        showToast(`Account ${accountId} deleted successfully`, 'success');
      }
    });
  };

  const handleCreateAccount = (programId) => {
    showToast(`Creating new account for program: ${programs.find(p => p.id === programId)?.name}`, 'info');
    // Here you would implement account creation logic
  };

  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.id.includes(searchTerm) ||
                         account.customerId.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || account.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesProgram = filterProgram === 'all' || account.program === filterProgram;
    return matchesSearch && matchesStatus && matchesProgram;
  });

  const stats = [
    { 
      label: 'Total Accounts', 
      value: accounts.length.toString(), 
      color: 'blue',
      icon: FiCreditCard
    },
    { 
      label: 'Active Challenges', 
      value: accounts.filter(acc => acc.phase === 'Challenge').length.toString(), 
      color: 'orange',
      icon: FiActivity
    },
    { 
      label: 'Funded Accounts', 
      value: accounts.filter(acc => acc.phase === 'Funded').length.toString(), 
      color: 'green',
      icon: FiTrendingUp
    },
    { 
      label: 'Total Balance', 
      value: '$' + accounts.reduce((sum, acc) => sum + parseFloat(acc.balance.replace('$', '').replace(',', '')), 0).toLocaleString(), 
      color: 'purple',
      icon: FiDollarSign
    }
  ];

  return (
    <div className="p-8">
      <ToastContainer />
      
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <SafeIcon icon={FiCreditCard} className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Prop Accounts & Programs</h1>
            <p className="text-gray-600">Manage trading programs, challenges, and funded accounts</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => showToast('Exporting accounts data...', 'info')}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center space-x-2"
          >
            <SafeIcon icon={FiDownload} className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => showToast(`Viewing ${stat.label} details...`, 'info')}
          >
            <div className="flex items-center justify-between mb-4">
              <SafeIcon icon={stat.icon} className={`w-8 h-8 text-${stat.color}-600`} />
            </div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">{stat.label}</h3>
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Trading Programs */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Trading Programs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className={`w-12 h-12 rounded-lg bg-${program.color}-50 flex items-center justify-center mb-4`}>
                <SafeIcon icon={FiCreditCard} className={`w-6 h-6 text-${program.color}-600`} />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{program.name}</h3>
              <p className="text-gray-600 mb-4">{program.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Account Size</span>
                  <span className="font-medium">{program.accountSize}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Profit Target</span>
                  <span className="font-medium">{program.profitTarget}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Max Drawdown</span>
                  <span className="font-medium">{program.maxDrawdown}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Participants</span>
                  <span className="font-medium">{program.participants}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Pass Rate</span>
                  <span className="font-medium text-green-600">{program.passRate}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-gray-800">{program.price}</span>
                <button
                  onClick={() => handleCreateAccount(program.id)}
                  className={`px-4 py-2 bg-${program.color}-600 text-white rounded-lg font-medium hover:bg-${program.color}-700 transition-colors flex items-center space-x-2`}
                >
                  <SafeIcon icon={FiPlus} className="w-4 h-4" />
                  <span>Create</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search accounts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="under review">Under Review</option>
              <option value="suspended">Suspended</option>
            </select>
            <select
              value={filterProgram}
              onChange={(e) => setFilterProgram(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Programs</option>
              <option value="2-Step Evaluation">2-Step Evaluation</option>
              <option value="1-Step Challenge">1-Step Challenge</option>
              <option value="Instant Funding">Instant Funding</option>
              <option value="Scaling Program">Scaling Program</option>
            </select>
          </div>
        </div>
      </div>

      {/* Accounts Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-800">Active Accounts</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phase</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAccounts.map((account, index) => (
                <motion.tr
                  key={account.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-blue-600 cursor-pointer hover:text-blue-800"
                           onClick={() => showToast(`Viewing account ${account.id} details...`, 'info')}>
                        {account.id}
                      </div>
                      <div className="text-sm text-gray-500">{account.accountSize}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-medium text-xs">
                          {account.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{account.name}</div>
                        <div className="text-sm text-gray-500">{account.customerId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {account.program}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      account.phase === 'Challenge' ? 'bg-orange-100 text-orange-800' :
                      account.phase === 'Funded' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {account.phase}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{account.balance}</div>
                    <div className="text-sm text-gray-500">{account.equity} equity</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${
                      parseFloat(account.profit.replace('$', '')) >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {account.profit}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {account.daysTraded}/{typeof account.totalDays === 'number' ? account.totalDays : '∞'} days
                    </div>
                    <div className="text-sm text-gray-500">
                      Min: {account.minDays} days
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      account.status === 'Active' ? 'bg-green-100 text-green-800' :
                      account.status === 'Under Review' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {account.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => showToast(`Viewing account ${account.id} details...`, 'info')}
                        className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded"
                        title="View Details"
                      >
                        <SafeIcon icon={FiEye} className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEditAccount(account.id)}
                        className="text-gray-600 hover:text-gray-900 p-1 hover:bg-gray-50 rounded"
                        title="Edit Account"
                      >
                        <SafeIcon icon={FiEdit3} className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteAccount(account.id)}
                        className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded"
                        title="Delete Account"
                      >
                        <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAccounts.length === 0 && (
          <div className="text-center py-12">
            <SafeIcon icon={FiCreditCard} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No accounts found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>

      {/* Account Modal */}
      {showAccountModal && (
        <PropAccountModal
          account={editingAccount}
          isOpen={showAccountModal}
          onClose={() => {
            setShowAccountModal(false);
            setEditingAccount(null);
          }}
          onSave={handleSaveAccount}
        />
      )}

      <ConfirmModal
        isOpen={isOpen}
        onClose={closeModal}
        onConfirm={modalData?.onConfirm}
        title={modalData?.title}
        message={modalData?.message}
        type={modalData?.type}
      />
    </div>
  );
};

export default PropAccounts;