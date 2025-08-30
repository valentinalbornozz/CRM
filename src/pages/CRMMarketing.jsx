import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiHeart, FiMail, FiUsers, FiTrendingUp } = FiIcons;

const CRMMarketing = () => {
  return (
    <div className="p-8">
      <div className="flex items-center space-x-3 mb-8">
        <SafeIcon icon={FiHeart} className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">CRM & Marketing</h1>
          <p className="text-gray-600">Our solution facilitates integration with your marketing CRM platform.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Leads', value: '3,247', change: '+18%', color: 'blue' },
          { label: 'Conversion Rate', value: '12.4%', change: '+2.1%', color: 'green' },
          { label: 'Active Campaigns', value: '8', change: '+3', color: 'purple' },
          { label: 'Email Open Rate', value: '24.7%', change: '+5.3%', color: 'orange' }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">{stat.label}</h3>
              <span className="text-green-600 text-sm font-medium">{stat.change}</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-6">Lead Management</h3>
          <div className="space-y-4">
            {[
              { name: 'John Smith', email: 'john@example.com', status: 'hot', source: 'Website' },
              { name: 'Sarah Johnson', email: 'sarah@example.com', status: 'warm', source: 'Social Media' },
              { name: 'Mike Davis', email: 'mike@example.com', status: 'cold', source: 'Email Campaign' },
              { name: 'Emma Wilson', email: 'emma@example.com', status: 'hot', source: 'Referral' },
              { name: 'David Brown', email: 'david@example.com', status: 'warm', source: 'Advertisement' }
            ].map((lead, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    lead.status === 'hot' ? 'bg-red-500' :
                    lead.status === 'warm' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`}></div>
                  <div>
                    <p className="font-medium text-gray-800">{lead.name}</p>
                    <p className="text-sm text-gray-500">{lead.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-800 capitalize">{lead.status}</p>
                  <p className="text-xs text-gray-500">{lead.source}</p>
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
          <h3 className="text-xl font-bold text-gray-800 mb-6">Email Campaigns</h3>
          <div className="space-y-4">
            {[
              { name: 'Welcome Series', sent: '1,234', opened: '456', clicked: '89', status: 'active' },
              { name: 'Product Demo', sent: '892', opened: '234', clicked: '45', status: 'completed' },
              { name: 'Risk Management Tips', sent: '567', opened: '178', clicked: '34', status: 'active' },
              { name: 'Monthly Newsletter', sent: '2,341', opened: '789', clicked: '123', status: 'scheduled' }
            ].map((campaign, index) => (
              <div key={index} className="p-4 rounded-lg bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-800">{campaign.name}</h4>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    campaign.status === 'active' ? 'bg-green-100 text-green-700' :
                    campaign.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {campaign.status}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Sent</p>
                    <p className="font-medium">{campaign.sent}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Opened</p>
                    <p className="font-medium">{campaign.opened}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Clicked</p>
                    <p className="font-medium">{campaign.clicked}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: 'WordPress Integration',
            description: 'Seamlessly connect with your WordPress website',
            icon: FiUsers,
            color: 'blue'
          },
          {
            title: 'Email Automation',
            description: 'Automated email sequences for lead nurturing',
            icon: FiMail,
            color: 'green'
          },
          {
            title: 'Analytics Dashboard',
            description: 'Track marketing performance and ROI',
            icon: FiTrendingUp,
            color: 'purple'
          }
        ].map((integration, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className={`w-12 h-12 rounded-lg bg-${integration.color}-50 flex items-center justify-center mb-4`}>
              <SafeIcon icon={integration.icon} className={`w-6 h-6 text-${integration.color}-600`} />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">{integration.title}</h3>
            <p className="text-gray-600 mb-4">{integration.description}</p>
            <button className={`w-full bg-${integration.color}-600 text-white py-2 rounded-lg font-medium hover:bg-${integration.color}-700 transition-colors`}>
              Configure
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CRMMarketing;