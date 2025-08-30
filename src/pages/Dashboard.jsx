import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';
import ConfirmModal from '../components/modals/ConfirmModal';
import { useModal } from '../hooks/useModal';
import { useToast } from '../components/modals/Toast';
import * as FiIcons from 'react-icons/fi';

const { FiTrendingUp, FiUsers, FiDollarSign, FiActivity } = FiIcons;

const Dashboard = () => {
  const navigate = useNavigate();
  const { isOpen, modalData, openModal, closeModal } = useModal();
  const { showToast, ToastContainer } = useToast();

  const stats = [
    { label: 'Total Traders', value: '2,341', change: '+12%', icon: FiUsers, color: 'blue' },
    { label: 'Active Accounts', value: '1,892', change: '+8%', icon: FiActivity, color: 'green' },
    { label: 'Total Payouts', value: '$842,300', change: '+23%', icon: FiDollarSign, color: 'purple' },
    { label: 'Monthly Growth', value: '34%', change: '+5%', icon: FiTrendingUp, color: 'orange' }
  ];

  const quickActions = [
    { 
      label: 'Add Trader', 
      color: 'blue', 
      action: () => {
        showToast('Redirecting to trader registration...', 'info');
        setTimeout(() => navigate('/trader-area'), 1000);
      }
    },
    { 
      label: 'Process Payout', 
      color: 'green', 
      action: () => {
        openModal({
          title: 'Process Payout',
          message: 'This will redirect you to the payout processing page. Continue?',
          type: 'success',
          onConfirm: () => {
            showToast('Redirecting to payout processing...', 'success');
            setTimeout(() => navigate('/payouts'), 1000);
          }
        });
      }
    },
    { 
      label: 'View Reports', 
      color: 'purple', 
      action: () => {
        showToast('Redirecting to analytics...', 'info');
        setTimeout(() => navigate('/accounts-analytics'), 1000);
      }
    },
    { 
      label: 'Manage Risk', 
      color: 'red', 
      action: () => {
        openModal({
          title: 'Risk Management',
          message: 'This will open the risk management dashboard. Continue?',
          type: 'warning',
          onConfirm: () => {
            showToast('Opening risk management...', 'warning');
            setTimeout(() => navigate('/risk-management'), 1000);
          }
        });
      }
    }
  ];

  const handleConfirm = () => {
    if (modalData?.onConfirm) {
      modalData.onConfirm();
    }
  };

  return (
    <div className="p-8">
      <ToastContainer />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Grow With Our Prop Firm Technology
        </h1>
        <p className="text-gray-600 max-w-4xl">
          Our comprehensive technology encompasses various aspects of a prop firm's activities,
          including trading infrastructure, risk management, data analytics, and collaboration tools.
          Continue scrolling to view our modern prop firm solutions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => {
              showToast(`Viewing ${stat.label} details...`, 'info');
              if (stat.label === 'Total Traders') navigate('/trader-area');
              else if (stat.label === 'Active Accounts') navigate('/accounts-analytics');
              else if (stat.label === 'Total Payouts') navigate('/payouts');
              else if (stat.label === 'Monthly Growth') navigate('/accounts-analytics');
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-${stat.color}-50`}>
                <SafeIcon icon={stat.icon} className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <span className="text-green-600 text-sm font-medium">{stat.change}</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
            <p className="text-gray-600">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: 'New trader registered', time: '2 minutes ago', type: 'success' },
              { action: 'Payout request approved', time: '15 minutes ago', type: 'info' },
              { action: 'Risk limit breached', time: '1 hour ago', type: 'warning' },
              { action: 'Account funded', time: '2 hours ago', type: 'success' }
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => showToast(`Viewing activity: ${activity.action}`, 'info')}
              >
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'success' ? 'bg-green-500' : 
                  activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-gray-800 font-medium">{activity.action}</p>
                  <p className="text-gray-500 text-sm">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className={`p-4 rounded-lg bg-${action.color}-50 text-${action.color}-700 font-medium hover:bg-${action.color}-100 transition-colors`}
              >
                {action.label}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { 
            title: 'Accounts Management', 
            description: 'Monitor and manage all trader accounts with comprehensive analytics.', 
            color: 'blue',
            path: '/accounts-analytics'
          },
          { 
            title: 'Risk Management', 
            description: 'Advanced risk assessment and real-time monitoring capabilities.', 
            color: 'red',
            path: '/risk-management'
          },
          { 
            title: 'Payout Processing', 
            description: 'Streamlined payout system with automated processing.', 
            color: 'green',
            path: '/payouts'
          }
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => {
              showToast(`Opening ${feature.title}...`, 'info');
              setTimeout(() => navigate(feature.path), 1000);
            }}
          >
            <div className={`w-12 h-12 rounded-lg bg-${feature.color}-50 flex items-center justify-center mb-4`}>
              <div className={`w-6 h-6 rounded bg-${feature.color}-500`}></div>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      <ConfirmModal
        isOpen={isOpen}
        onClose={closeModal}
        onConfirm={handleConfirm}
        title={modalData?.title}
        message={modalData?.message}
        type={modalData?.type}
      />
    </div>
  );
};

export default Dashboard;