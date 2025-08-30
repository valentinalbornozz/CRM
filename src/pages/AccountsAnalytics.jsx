import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiBarChart3, FiTrendingUp, FiUsers, FiActivity } = FiIcons;

const AccountsAnalytics = () => {
  return (
    <div className="p-8">
      <div className="flex items-center space-x-3 mb-8">
        <SafeIcon icon={FiBarChart3} className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Accounts Analytics</h1>
          <p className="text-gray-600">Overview of all active accounts, enabling you to monitor traders growth and activities.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Total Accounts</h3>
            <SafeIcon icon={FiUsers} className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-gray-800 mb-2">2,341</div>
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiTrendingUp} className="w-4 h-4 text-green-500" />
            <span className="text-green-500 text-sm font-medium">+12% this month</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Active Trading</h3>
            <SafeIcon icon={FiActivity} className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-gray-800 mb-2">1,892</div>
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiTrendingUp} className="w-4 h-4 text-green-500" />
            <span className="text-green-500 text-sm font-medium">+8% this week</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Profit Factor</h3>
            <SafeIcon icon={FiBarChart3} className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-3xl font-bold text-gray-800 mb-2">1.34</div>
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiTrendingUp} className="w-4 h-4 text-green-500" />
            <span className="text-green-500 text-sm font-medium">+0.12 improvement</span>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-6">Account Performance</h3>
          <div className="space-y-4">
            {[
              { name: 'John Doe', account: 'ACC-001', profit: '+$12,450', status: 'profitable' },
              { name: 'Sarah Smith', account: 'ACC-002', profit: '+$8,320', status: 'profitable' },
              { name: 'Mike Johnson', account: 'ACC-003', profit: '-$2,100', status: 'loss' },
              { name: 'Emma Wilson', account: 'ACC-004', profit: '+$15,670', status: 'profitable' },
              { name: 'David Brown', account: 'ACC-005', profit: '+$4,890', status: 'profitable' }
            ].map((trader, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">{trader.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{trader.name}</p>
                    <p className="text-sm text-gray-500">{trader.account}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${trader.status === 'profitable' ? 'text-green-600' : 'text-red-600'}`}>
                    {trader.profit}
                  </p>
                  <p className="text-sm text-gray-500 capitalize">{trader.status}</p>
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
          <h3 className="text-xl font-bold text-gray-800 mb-6">Trading Activity</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Daily Volume</span>
                <span className="font-semibold text-gray-800">$2.4M</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Winning Trades</span>
                <span className="font-semibold text-gray-800">68%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Risk Utilization</span>
                <span className="font-semibold text-gray-800">45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Account Growth</span>
                <span className="font-semibold text-gray-800">23%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '23%' }}></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AccountsAnalytics;