import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';
import { useToast } from '../components/modals/Toast';
import * as FiIcons from 'react-icons/fi';

const { FiSettings, FiShield, FiFileText, FiMail, FiBarChart } = FiIcons;

const BackOffice = () => {
  const navigate = useNavigate();
  const { showToast, ToastContainer } = useToast();

  const features = [
    {
      icon: FiShield,
      title: 'Risk Management',
      description: 'Advanced risk assessment and monitoring',
      color: 'red',
      path: '/risk-management'
    },
    {
      icon: FiFileText,
      title: 'Reports',
      description: 'Comprehensive analytics and reporting',
      color: 'blue',
      path: '/accounts-analytics'
    },
    {
      icon: FiMail,
      title: 'Email Automations',
      description: 'Automated communication workflows',
      color: 'green',
      path: '/crm-marketing'
    },
    {
      icon: FiBarChart,
      title: 'Accounts Analytics',
      description: 'In-depth account performance analysis',
      color: 'purple',
      path: '/accounts-analytics'
    }
  ];

  const quickActions = [
    {
      action: 'Generate Monthly Report',
      color: 'blue',
      handler: () => {
        showToast('Generating monthly report...', 'info');
        setTimeout(() => showToast('Monthly report generated successfully!', 'success'), 2000);
      }
    },
    {
      action: 'Process Bulk Payouts',
      color: 'green',
      handler: () => {
        showToast('Processing bulk payouts...', 'info');
        setTimeout(() => navigate('/payouts'), 1000);
      }
    },
    {
      action: 'Update Risk Parameters',
      color: 'red',
      handler: () => {
        showToast('Opening risk parameter settings...', 'warning');
        setTimeout(() => navigate('/risk-management'), 1000);
      }
    },
    {
      action: 'Send Trader Notifications',
      color: 'purple',
      handler: () => {
        showToast('Opening notification center...', 'info');
        setTimeout(() => navigate('/notifications'), 1000);
      }
    },
    {
      action: 'Export Analytics Data',
      color: 'orange',
      handler: () => {
        showToast('Exporting analytics data...', 'info');
        setTimeout(() => showToast('Analytics data exported successfully!', 'success'), 2000);
      }
    },
    {
      action: 'System Backup',
      color: 'gray',
      handler: () => {
        showToast('Starting system backup...', 'info');
        setTimeout(() => showToast('System backup completed successfully!', 'success'), 3000);
      }
    }
  ];

  const systemOverview = [
    { label: 'Active Traders', value: '2,341', status: 'operational' },
    { label: 'Risk Alerts', value: '3', status: 'warning' },
    { label: 'Pending Payouts', value: '47', status: 'pending' },
    { label: 'System Uptime', value: '99.9%', status: 'operational' }
  ];

  return (
    <div className="p-8">
      <ToastContainer />
      
      <div className="flex items-center space-x-3 mb-8">
        <SafeIcon icon={FiSettings} className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Back-Office</h1>
          <p className="text-gray-600">
            A highly automated back office system, tailored prop firms. Enhance expert-grade tools,
            including advanced Risk Management tools, comprehensive Reports, efficient Payout systems,
            Email automations and in-depth Accounts Analytics.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => {
              showToast(`Opening ${feature.title}...`, 'info');
              setTimeout(() => navigate(feature.path), 1000);
            }}
          >
            <div className={`w-12 h-12 rounded-lg bg-${feature.color}-50 flex items-center justify-center mb-4`}>
              <SafeIcon icon={feature.icon} className={`w-6 h-6 text-${feature.color}-600`} />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-600 mb-4">{feature.description}</p>
            <button className={`w-full bg-${feature.color}-600 text-white py-2 rounded-lg font-medium hover:bg-${feature.color}-700 transition-colors`}>
              Access {feature.title}
            </button>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-6">System Overview</h3>
          <div className="space-y-4">
            {systemOverview.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => {
                  if (item.label === 'Active Traders') navigate('/trader-area');
                  else if (item.label === 'Risk Alerts') navigate('/risk-management');
                  else if (item.label === 'Pending Payouts') navigate('/payouts');
                  else showToast(`Viewing ${item.label} details...`, 'info');
                }}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    item.status === 'operational' ? 'bg-green-500' : 
                    item.status === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`}></div>
                  <span className="font-medium text-gray-800">{item.label}</span>
                </div>
                <span className="font-bold text-gray-800">{item.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h3>
          <div className="space-y-3">
            {quickActions.map((item, index) => (
              <button
                key={index}
                onClick={item.handler}
                className={`w-full p-3 rounded-lg bg-${item.color}-50 text-${item.color}-700 font-medium hover:bg-${item.color}-100 transition-colors text-left`}
              >
                {item.action}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BackOffice;