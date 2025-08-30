import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import { useToast } from '../components/modals/Toast';
import ConfirmModal from '../components/modals/ConfirmModal';
import { useModal } from '../hooks/useModal';
import * as FiIcons from 'react-icons/fi';

const { FiShield, FiAlertTriangle, FiActivity, FiTrendingDown, FiEye, FiSettings, FiCheckCircle, FiXCircle } = FiIcons;

const RiskManagement = () => {
  const { showToast, ToastContainer } = useToast();
  const { isOpen, modalData, openModal, closeModal } = useModal();
  const [selectedAccount, setSelectedAccount] = useState(null);

  // Accounts under review (passed challenges waiting for risk approval)
  const [accountsUnderReview, setAccountsUnderReview] = useState([
    {
      id: '234975348',
      trader: 'Alejandro Bouchikhi',
      customerId: 'C24893',
      program: 'Instant Funding',
      accountSize: '$25,000',
      balance: '$27,340.25',
      profit: '$2,340.25',
      profitPercentage: '9.36%',
      maxDrawdown: '-1.2%',
      dailyDrawdown: '-0.8%',
      tradingDays: 25,
      winRate: '72%',
      avgWin: '$156',
      avgLoss: '$89',
      riskScore: 7.2,
      violations: [],
      submittedDate: '2024-01-20',
      lastActivity: '2024-01-19 16:45:33',
      status: 'pending_review'
    },
    {
      id: '234975351',
      trader: 'Maria Rodriguez',
      customerId: 'C25104',
      program: '2-Step Evaluation',
      accountSize: '$50,000',
      balance: '$54,120.80',
      profit: '$4,120.80',
      profitPercentage: '8.24%',
      maxDrawdown: '-2.1%',
      dailyDrawdown: '-1.5%',
      tradingDays: 18,
      winRate: '65%',
      avgWin: '$245',
      avgLoss: '$132',
      riskScore: 6.8,
      violations: ['Overnight position held'],
      submittedDate: '2024-01-18',
      lastActivity: '2024-01-18 14:22:15',
      status: 'pending_review'
    }
  ]);

  // Live risk alerts for active funded accounts
  const [riskAlerts] = useState([
    {
      id: 'ALERT_001',
      trader: 'John Doe',
      account: 'ACC-001',
      alert: 'Daily drawdown limit approaching',
      severity: 'high',
      currentDrawdown: '-4.2%',
      limit: '-5%',
      time: '5 min ago',
      status: 'active'
    },
    {
      id: 'ALERT_002',
      trader: 'Sarah Smith',
      account: 'ACC-002',
      alert: 'Position size exceeds limit',
      severity: 'medium',
      currentSize: '2.1%',
      limit: '2%',
      time: '15 min ago',
      status: 'active'
    },
    {
      id: 'ALERT_003',
      trader: 'Mike Johnson',
      account: 'ACC-003',
      alert: 'Unusual trading pattern detected',
      severity: 'low',
      description: 'High frequency trading detected',
      time: '1 hour ago',
      status: 'acknowledged'
    }
  ]);

  const handleApproveAccount = (accountId) => {
    const account = accountsUnderReview.find(acc => acc.id === accountId);
    openModal({
      title: 'Approve Account for Funding',
      message: `Are you sure you want to approve account ${accountId} for ${account.trader}? This will convert it to a funded account.`,
      type: 'success',
      onConfirm: () => {
        setAccountsUnderReview(prev => prev.filter(acc => acc.id !== accountId));
        showToast(`Account ${accountId} approved and funded successfully`, 'success');
      }
    });
  };

  const handleRejectAccount = (accountId) => {
    const account = accountsUnderReview.find(acc => acc.id === accountId);
    openModal({
      title: 'Reject Account',
      message: `Are you sure you want to reject account ${accountId} for ${account.trader}? Please provide feedback to the trader.`,
      type: 'danger',
      onConfirm: () => {
        setAccountsUnderReview(prev => prev.filter(acc => acc.id !== accountId));
        showToast(`Account ${accountId} rejected`, 'warning');
      }
    });
  };

  const handleViewAccountDetails = (account) => {
    setSelectedAccount(account);
  };

  const getRiskScoreColor = (score) => {
    if (score >= 8) return 'red';
    if (score >= 6) return 'yellow';
    return 'green';
  };

  const stats = [
    {
      label: 'Pending Reviews',
      value: accountsUnderReview.length.toString(),
      status: 'warning',
      color: 'yellow'
    },
    {
      label: 'Active Alerts',
      value: riskAlerts.filter(alert => alert.status === 'active').length.toString(),
      status: 'critical',
      color: 'red'
    },
    {
      label: 'Monitored Accounts',
      value: '2,341',
      status: 'good',
      color: 'green'
    },
    {
      label: 'Avg Risk Score',
      value: '6.8/10',
      status: 'moderate',
      color: 'blue'
    }
  ];

  return (
    <div className="p-8">
      <ToastContainer />
      
      <div className="flex items-center space-x-3 mb-8">
        <SafeIcon icon={FiShield} className="w-8 h-8 text-red-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Risk Management</h1>
          <p className="text-gray-600">Review challenge completions and monitor live trading risks</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {stats.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">{metric.label}</h3>
              <div className={`w-3 h-3 rounded-full bg-${metric.color}-500`}></div>
            </div>
            <p className="text-2xl font-bold text-gray-800">{metric.value}</p>
            <p className={`text-sm font-medium capitalize text-${metric.color}-600`}>{metric.status}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Accounts Under Review */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl border border-gray-200"
        >
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-800">Accounts Pending Review</h3>
            <p className="text-gray-600 text-sm">Challenge completions awaiting risk approval</p>
          </div>
          <div className="divide-y divide-gray-200">
            {accountsUnderReview.map((account, index) => (
              <motion.div
                key={account.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">
                        {account.trader.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{account.trader}</p>
                      <p className="text-sm text-gray-500">{account.id} • {account.program}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">{account.profit}</p>
                    <p className="text-sm text-gray-500">{account.profitPercentage} profit</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Risk Score</p>
                    <p className={`text-lg font-bold text-${getRiskScoreColor(account.riskScore)}-600`}>
                      {account.riskScore}/10
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Win Rate</p>
                    <p className="text-lg font-bold text-blue-600">{account.winRate}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Max Drawdown</p>
                    <p className="text-lg font-bold text-red-600">{account.maxDrawdown}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Trading Days</p>
                    <p className="text-lg font-bold text-gray-800">{account.tradingDays}</p>
                  </div>
                </div>

                {account.violations.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-orange-600 mb-2">⚠️ Violations:</p>
                    <ul className="text-sm text-orange-600">
                      {account.violations.map((violation, idx) => (
                        <li key={idx}>• {violation}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleViewAccountDetails(account)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="View Details"
                  >
                    <SafeIcon icon={FiEye} className="w-4 h-4" />
                  </button>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleRejectAccount(account.id)}
                      className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                    >
                      <SafeIcon icon={FiXCircle} className="w-4 h-4" />
                      <span>Reject</span>
                    </button>
                    <button
                      onClick={() => handleApproveAccount(account.id)}
                      className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                    >
                      <SafeIcon icon={FiCheckCircle} className="w-4 h-4" />
                      <span>Approve</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {accountsUnderReview.length === 0 && (
            <div className="p-12 text-center">
              <SafeIcon icon={FiCheckCircle} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No accounts pending review</h3>
              <p className="text-gray-600">All challenge completions have been processed.</p>
            </div>
          )}
        </motion.div>

        {/* Live Risk Alerts */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl border border-gray-200"
        >
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-800">Live Risk Alerts</h3>
            <p className="text-gray-600 text-sm">Real-time monitoring of funded accounts</p>
          </div>
          <div className="divide-y divide-gray-200">
            {riskAlerts.map((alert, index) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start space-x-3">
                  <SafeIcon
                    icon={FiAlertTriangle}
                    className={`w-5 h-5 mt-1 ${
                      alert.severity === 'high' ? 'text-red-600' :
                      alert.severity === 'medium' ? 'text-yellow-600' :
                      'text-blue-600'
                    }`}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-gray-800">{alert.trader}</p>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        alert.severity === 'high' ? 'bg-red-100 text-red-700' :
                        alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {alert.severity}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{alert.account} • {alert.alert}</p>
                    
                    {alert.currentDrawdown && (
                      <div className="text-sm text-gray-500 mb-2">
                        Current: <span className="font-medium text-red-600">{alert.currentDrawdown}</span> / 
                        Limit: <span className="font-medium">{alert.limit}</span>
                      </div>
                    )}
                    
                    {alert.currentSize && (
                      <div className="text-sm text-gray-500 mb-2">
                        Position: <span className="font-medium text-orange-600">{alert.currentSize}</span> / 
                        Limit: <span className="font-medium">{alert.limit}</span>
                      </div>
                    )}
                    
                    {alert.description && (
                      <p className="text-sm text-gray-500 mb-2">{alert.description}</p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500">{alert.time}</p>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => showToast(`Viewing ${alert.trader} account details...`, 'info')}
                          className="text-blue-600 hover:bg-blue-50 p-1 rounded"
                        >
                          <SafeIcon icon={FiEye} className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => showToast(`Opening risk settings for ${alert.trader}...`, 'info')}
                          className="text-gray-600 hover:bg-gray-50 p-1 rounded"
                        >
                          <SafeIcon icon={FiSettings} className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Risk Management Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: 'Real-time Monitoring',
            description: 'Continuous monitoring of all funded accounts',
            icon: FiActivity,
            color: 'blue'
          },
          {
            title: 'Automated Actions',
            description: 'Automatic position closure on rule violations',
            icon: FiShield,
            color: 'red'
          },
          {
            title: 'Risk Analytics',
            description: 'Advanced analytics for risk assessment',
            icon: FiTrendingDown,
            color: 'purple'
          }
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => showToast(`Opening ${feature.title}...`, 'info')}
          >
            <div className={`w-12 h-12 rounded-lg bg-${feature.color}-50 flex items-center justify-center mb-4`}>
              <SafeIcon icon={feature.icon} className={`w-6 h-6 text-${feature.color}-600`} />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Account Details Modal */}
      {selectedAccount && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedAccount(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">Risk Assessment Details</h2>
              <p className="text-gray-600">{selectedAccount.trader} • {selectedAccount.id}</p>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Program:</span>
                      <span className="font-medium">{selectedAccount.program}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Account Size:</span>
                      <span className="font-medium">{selectedAccount.accountSize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current Balance:</span>
                      <span className="font-medium">{selectedAccount.balance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Profit:</span>
                      <span className="font-medium text-green-600">{selectedAccount.profit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Profit %:</span>
                      <span className="font-medium text-green-600">{selectedAccount.profitPercentage}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Risk Metrics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Risk Score:</span>
                      <span className={`font-bold text-${getRiskScoreColor(selectedAccount.riskScore)}-600`}>
                        {selectedAccount.riskScore}/10
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Max Drawdown:</span>
                      <span className="font-medium text-red-600">{selectedAccount.maxDrawdown}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Daily Drawdown:</span>
                      <span className="font-medium text-orange-600">{selectedAccount.dailyDrawdown}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Win Rate:</span>
                      <span className="font-medium text-blue-600">{selectedAccount.winRate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Avg Win:</span>
                      <span className="font-medium text-green-600">{selectedAccount.avgWin}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Avg Loss:</span>
                      <span className="font-medium text-red-600">{selectedAccount.avgLoss}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {selectedAccount.violations.length > 0 && (
                <div className="mt-6 p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-medium text-orange-800 mb-2">Rule Violations</h4>
                  <ul className="text-sm text-orange-700">
                    {selectedAccount.violations.map((violation, idx) => (
                      <li key={idx}>• {violation}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => {
                    handleApproveAccount(selectedAccount.id);
                    setSelectedAccount(null);
                  }}
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <SafeIcon icon={FiCheckCircle} className="w-4 h-4" />
                  <span>Approve for Funding</span>
                </button>
                <button
                  onClick={() => {
                    handleRejectAccount(selectedAccount.id);
                    setSelectedAccount(null);
                  }}
                  className="flex-1 bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <SafeIcon icon={FiXCircle} className="w-4 h-4" />
                  <span>Reject</span>
                </button>
                <button
                  onClick={() => setSelectedAccount(null)}
                  className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
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

export default RiskManagement;