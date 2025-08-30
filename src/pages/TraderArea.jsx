import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import { useToast } from '../components/modals/Toast';
import * as FiIcons from 'react-icons/fi';

const { FiUsers, FiBarChart, FiDollarSign, FiSettings, FiTrendingUp, FiActivity, FiAward, FiTarget } = FiIcons;

const TraderArea = () => {
  const { showToast, ToastContainer } = useToast();
  
  // Sample trader data - in real app this would come from user authentication
  const [traderData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    memberId: 'T-12345',
    joinDate: '2024-01-15',
    accounts: [
      {
        id: '234975350',
        program: '2-Step Evaluation',
        accountSize: '$10,000',
        phase: 'Challenge',
        balance: '$10,245.50',
        equity: '$10,245.50',
        profit: '$245.50',
        profitPercentage: '2.46%',
        profitTarget: '8%',
        dailyDrawdown: '-0.5%',
        maxDrawdown: '-1.2%',
        daysTraded: 5,
        minDays: 5,
        totalDays: 30,
        status: 'Active',
        login: '234975350',
        server: 'demo\\BW-ORION3-USD-P',
        platform: 'MetaTrader 5'
      },
      {
        id: '234975351',
        program: 'Instant Funding',
        accountSize: '$25,000',
        phase: 'Funded',
        balance: '$27,340.25',
        equity: '$27,340.25',
        profit: '$2,340.25',
        profitPercentage: '9.36%',
        profitTarget: 'No Target',
        dailyDrawdown: '-0.8%',
        maxDrawdown: '-2.1%',
        daysTraded: 25,
        minDays: 0,
        totalDays: 'Unlimited',
        status: 'Active',
        login: '234975351',
        server: 'live\\BW-ORION1-USD-P',
        platform: 'MetaTrader 5'
      }
    ],
    totalProfit: '$2,585.75',
    winRate: '68%',
    totalTrades: 142,
    bestDay: '$340.25',
    payoutHistory: [
      { date: '2024-01-10', amount: '$1,200.00', status: 'Completed', method: 'PayPal' },
      { date: '2024-01-05', amount: '$800.50', status: 'Completed', method: 'Wise Transfer' }
    ]
  });

  const [selectedAccount, setSelectedAccount] = useState(traderData.accounts[0]);
  const [showPayoutModal, setShowPayoutModal] = useState(false);

  const recentTrades = [
    { pair: 'EUR/USD', type: 'Buy', profit: '+$234', time: '2 hours ago', status: 'closed' },
    { pair: 'GBP/JPY', type: 'Sell', profit: '+$189', time: '4 hours ago', status: 'closed' },
    { pair: 'USD/CAD', type: 'Buy', profit: '-$45', time: '6 hours ago', status: 'closed' },
    { pair: 'AUD/USD', type: 'Sell', profit: '+$312', time: '1 day ago', status: 'closed' },
    { pair: 'XAU/USD', type: 'Buy', profit: '+$567', time: '1 day ago', status: 'closed' }
  ];

  const handleRequestPayout = () => {
    if (selectedAccount.phase !== 'Funded') {
      showToast('Payouts are only available for funded accounts', 'warning');
      return;
    }
    
    const availableProfit = parseFloat(selectedAccount.profit.replace('$', '').replace(',', ''));
    if (availableProfit < 100) {
      showToast('Minimum payout amount is $100', 'warning');
      return;
    }
    
    setShowPayoutModal(true);
  };

  const handleDownloadCredentials = (account) => {
    const credentials = `
Account Details for ${account.program}
=====================================
Login: ${account.login}
Server: ${account.server}
Platform: ${account.platform}
Account Size: ${account.accountSize}
Phase: ${account.phase}
Status: ${account.status}

Generated on: ${new Date().toLocaleString()}
    `;
    
    const blob = new Blob([credentials], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `account-${account.id}-credentials.txt`;
    a.click();
    URL.revokeObjectURL(url);
    
    showToast('Account credentials downloaded', 'success');
  };

  return (
    <div className="p-8">
      <ToastContainer />
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <SafeIcon icon={FiUsers} className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Trader Dashboard</h1>
            <p className="text-gray-600">Welcome back, {traderData.name}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Member ID: {traderData.memberId}</p>
          <p className="text-sm text-gray-500">Joined: {traderData.joinDate}</p>
        </div>
      </div>

      {/* Account Overview Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200"
        >
          <div className="flex items-center justify-between mb-4">
            <SafeIcon icon={FiBarChart} className="w-8 h-8 text-blue-600" />
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">Live</span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Total Profit</h3>
          <p className="text-3xl font-bold text-green-600 mb-2">{traderData.totalProfit}</p>
          <p className="text-gray-600">Across all accounts</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200"
        >
          <div className="flex items-center justify-between mb-4">
            <SafeIcon icon={FiDollarSign} className="w-8 h-8 text-green-600" />
            <button
              onClick={handleRequestPayout}
              className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-green-700 transition-colors"
            >
              Request
            </button>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Available Payout</h3>
          <p className="text-3xl font-bold text-green-600 mb-2">
            {selectedAccount.phase === 'Funded' ? selectedAccount.profit : '$0.00'}
          </p>
          <p className="text-gray-600">From funded accounts</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200"
        >
          <div className="flex items-center justify-between mb-4">
            <SafeIcon icon={FiSettings} className="w-8 h-8 text-purple-600" />
            <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">Active</span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Win Rate</h3>
          <p className="text-3xl font-bold text-purple-600 mb-2">{traderData.winRate}</p>
          <p className="text-gray-600">{traderData.totalTrades} total trades</p>
        </motion.div>
      </div>

      {/* Account Selection */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">My Trading Accounts</h2>
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {traderData.accounts.map((account) => (
            <button
              key={account.id}
              onClick={() => setSelectedAccount(account)}
              className={`flex-shrink-0 p-4 rounded-lg border-2 transition-all ${
                selectedAccount.id === account.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="text-left">
                <p className="font-medium text-gray-800">{account.program}</p>
                <p className="text-sm text-gray-500">{account.id}</p>
                <p className="text-sm font-medium text-green-600">{account.profit}</p>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-2 ${
                  account.phase === 'Challenge' ? 'bg-orange-100 text-orange-800' :
                  account.phase === 'Funded' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {account.phase}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Account Details */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">Account Performance</h3>
            <button
              onClick={() => handleDownloadCredentials(selectedAccount)}
              className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
            >
              Download Credentials
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Current Balance</p>
                <p className="text-xl font-bold text-gray-800">{selectedAccount.balance}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Equity</p>
                <p className="text-xl font-bold text-gray-800">{selectedAccount.equity}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Total Profit</p>
                <p className="text-xl font-bold text-green-600">{selectedAccount.profit}</p>
                <p className="text-sm text-green-600">{selectedAccount.profitPercentage}</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Profit Target</p>
                <p className="text-xl font-bold text-blue-600">{selectedAccount.profitTarget}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-red-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Max Drawdown</p>
                <p className="text-xl font-bold text-red-600">{selectedAccount.maxDrawdown}</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Daily Drawdown</p>
                <p className="text-xl font-bold text-orange-600">{selectedAccount.dailyDrawdown}</p>
              </div>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-2">Trading Progress</p>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Days Traded</span>
                <span className="font-medium">
                  {selectedAccount.daysTraded} / {selectedAccount.totalDays === 'Unlimited' ? '∞' : selectedAccount.totalDays}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full" 
                  style={{ 
                    width: selectedAccount.totalDays === 'Unlimited' ? '100%' : 
                           `${(selectedAccount.daysTraded / selectedAccount.totalDays) * 100}%` 
                  }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Minimum days required: {selectedAccount.minDays}
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">Account Credentials</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Login:</span>
                  <span className="font-medium">{selectedAccount.login}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Server:</span>
                  <span className="font-medium">{selectedAccount.server}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Platform:</span>
                  <span className="font-medium">{selectedAccount.platform}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Trades */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Trades</h3>
          <div className="space-y-4">
            {recentTrades.map((trade, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${trade.type === 'Buy' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <div>
                    <p className="font-medium text-gray-800">{trade.pair}</p>
                    <p className="text-sm text-gray-500">{trade.type} • {trade.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${trade.profit.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {trade.profit}
                  </p>
                  <p className="text-sm text-gray-500 capitalize">{trade.status}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Payout History */}
          <div className="mt-8">
            <h4 className="text-lg font-bold text-gray-800 mb-4">Payout History</h4>
            <div className="space-y-3">
              {traderData.payoutHistory.map((payout, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">{payout.amount}</p>
                    <p className="text-sm text-gray-500">{payout.date} • {payout.method}</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm font-medium">
                    {payout.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Payout Request Modal */}
      {showPayoutModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowPayoutModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">Request Payout</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Available Amount</label>
                <p className="text-2xl font-bold text-green-600">{selectedAccount.profit}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option value="paypal">PayPal</option>
                  <option value="wise">Wise Transfer</option>
                  <option value="crypto">Cryptocurrency</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount to Withdraw</label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowPayoutModal(false);
                  showToast('Payout request submitted successfully', 'success');
                }}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Submit Request
              </button>
              <button
                onClick={() => setShowPayoutModal(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default TraderArea;