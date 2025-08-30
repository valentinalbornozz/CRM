import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTrendingUp, FiTarget, FiSettings, FiUsers } = FiIcons;

const DynamicPrograms = () => {
  return (
    <div className="p-8">
      <div className="flex items-center space-x-3 mb-8">
        <SafeIcon icon={FiTrendingUp} className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dynamic Programs</h1>
          <p className="text-gray-600">Powerful program management with precision.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {[
          {
            title: 'Evaluation Program',
            description: 'Two-phase evaluation with customizable targets',
            participants: '1,234',
            success_rate: '68%',
            color: 'blue'
          },
          {
            title: 'Instant Funding',
            description: 'Direct access to funded accounts',
            participants: '567',
            success_rate: '45%',
            color: 'green'
          },
          {
            title: 'Scaling Program',
            description: 'Progressive account scaling based on performance',
            participants: '890',
            success_rate: '72%',
            color: 'purple'
          }
        ].map((program, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className={`w-12 h-12 rounded-lg bg-${program.color}-50 flex items-center justify-center mb-4`}>
              <SafeIcon icon={FiTarget} className={`w-6 h-6 text-${program.color}-600`} />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">{program.title}</h3>
            <p className="text-gray-600 mb-4">{program.description}</p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Participants</span>
                <span className="font-medium text-gray-800">{program.participants}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Success Rate</span>
                <span className="font-medium text-green-600">{program.success_rate}</span>
              </div>
            </div>
            <button className={`w-full mt-4 bg-${program.color}-600 text-white py-2 rounded-lg font-medium hover:bg-${program.color}-700 transition-colors`}>
              Manage Program
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
          <h3 className="text-xl font-bold text-gray-800 mb-6">Program Performance</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Evaluation Pass Rate</span>
                <span className="font-semibold text-gray-800">68%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-blue-600 h-3 rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Active Participants</span>
                <span className="font-semibold text-gray-800">2,691</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-green-600 h-3 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Revenue Growth</span>
                <span className="font-semibold text-gray-800">+23%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-purple-600 h-3 rounded-full" style={{ width: '76%' }}></div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-6">Program Settings</h3>
          <div className="space-y-4">
            {[
              { setting: 'Profit Target', value: '8%', editable: true },
              { setting: 'Max Drawdown', value: '4%', editable: true },
              { setting: 'Trading Days', value: '30 days', editable: true },
              { setting: 'Minimum Days', value: '5 days', editable: true },
              { setting: 'Account Size', value: '$100K', editable: true },
              { setting: 'Profit Split', value: '80/20', editable: true }
            ].map((setting, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <span className="font-medium text-gray-800">{setting.setting}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">{setting.value}</span>
                  {setting.editable && (
                    <SafeIcon icon={FiSettings} className="w-4 h-4 text-blue-600 cursor-pointer" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DynamicPrograms;