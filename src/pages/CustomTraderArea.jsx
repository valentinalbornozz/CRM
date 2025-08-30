import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiLayers, FiEdit, FiEye, FiCode } = FiIcons;

const CustomTraderArea = () => {
  return (
    <div className="p-8">
      <div className="flex items-center space-x-3 mb-8">
        <SafeIcon icon={FiLayers} className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Custom Trader Area</h1>
          <p className="text-gray-600">Your space to make your mark in the trading world.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {[
          {
            title: 'Dashboard Builder',
            description: 'Create custom dashboards with drag-and-drop widgets',
            icon: FiLayers,
            color: 'blue'
          },
          {
            title: 'Theme Customizer',
            description: 'Personalize the look and feel of your trading interface',
            icon: FiEdit,
            color: 'purple'
          },
          {
            title: 'Widget Library',
            description: 'Access a library of pre-built trading widgets',
            icon: FiCode,
            color: 'green'
          }
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className={`w-12 h-12 rounded-lg bg-${feature.color}-50 flex items-center justify-center mb-4`}>
              <SafeIcon icon={feature.icon} className={`w-6 h-6 text-${feature.color}-600`} />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-600 mb-4">{feature.description}</p>
            <button className={`w-full bg-${feature.color}-600 text-white py-2 rounded-lg font-medium hover:bg-${feature.color}-700 transition-colors`}>
              Customize
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
          <h3 className="text-xl font-bold text-gray-800 mb-6">Available Widgets</h3>
          <div className="space-y-4">
            {[
              { name: 'P&L Chart', type: 'Analytics', status: 'active' },
              { name: 'Trade History', type: 'Data', status: 'active' },
              { name: 'Risk Meter', type: 'Risk', status: 'inactive' },
              { name: 'News Feed', type: 'Information', status: 'active' },
              { name: 'Economic Calendar', type: 'Information', status: 'active' },
              { name: 'Performance Stats', type: 'Analytics', status: 'inactive' }
            ].map((widget, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${widget.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  <div>
                    <p className="font-medium text-gray-800">{widget.name}</p>
                    <p className="text-sm text-gray-500">{widget.type}</p>
                  </div>
                </div>
                <button className={`px-3 py-1 rounded text-sm font-medium ${
                  widget.status === 'active' 
                    ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}>
                  {widget.status === 'active' ? 'Remove' : 'Add'}
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-6">Theme Presets</h3>
          <div className="space-y-4">
            {[
              { name: 'Dark Mode', preview: 'bg-gray-800', active: false },
              { name: 'Light Mode', preview: 'bg-white border', active: true },
              { name: 'Blue Theme', preview: 'bg-blue-600', active: false },
              { name: 'Green Theme', preview: 'bg-green-600', active: false },
              { name: 'Purple Theme', preview: 'bg-purple-600', active: false },
              { name: 'Custom', preview: 'bg-gradient-to-r from-pink-500 to-orange-500', active: false }
            ].map((theme, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded ${theme.preview}`}></div>
                  <span className="font-medium text-gray-800">{theme.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {theme.active && (
                    <span className="text-green-600 text-sm font-medium">Active</span>
                  )}
                  <button className="p-1 text-gray-600 hover:text-blue-600">
                    <SafeIcon icon={FiEye} className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CustomTraderArea;