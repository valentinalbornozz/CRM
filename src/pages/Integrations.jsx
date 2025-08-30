import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiLink, FiCheck, FiSettings, FiGlobe } = FiIcons;

const Integrations = () => {
  return (
    <div className="p-8">
      <div className="flex items-center space-x-3 mb-8">
        <SafeIcon icon={FiLink} className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Integrations</h1>
          <p className="text-gray-600">Boosting Business Growth with Multiple Integrations - Expand your business by utilizing personalized discount codes and fully-integrated affiliate portal. Through this portal, traders can apply to become affiliates, develop their exclusive affiliate link, and monitor their affiliate commission accurately.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {[
          {
            name: 'WordPress',
            description: 'Complete website integration with forms and tracking',
            status: 'connected',
            icon: FiGlobe,
            color: 'blue'
          },
          {
            name: 'PayPal',
            description: 'Secure payment processing and automated payouts',
            status: 'connected',
            icon: FiCheck,
            color: 'green'
          },
          {
            name: 'Stripe',
            description: 'Credit card processing and subscription management',
            status: 'connected',
            icon: FiCheck,
            color: 'purple'
          },
          {
            name: 'MetaTrader 5',
            description: 'Real-time trading data and account management',
            status: 'connected',
            icon: FiCheck,
            color: 'orange'
          },
          {
            name: 'Mailchimp',
            description: 'Email marketing and automation campaigns',
            status: 'available',
            icon: FiSettings,
            color: 'yellow'
          },
          {
            name: 'Zapier',
            description: 'Connect with 3000+ apps and automate workflows',
            status: 'available',
            icon: FiSettings,
            color: 'red'
          }
        ].map((integration, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg bg-${integration.color}-50 flex items-center justify-center`}>
                <SafeIcon icon={integration.icon} className={`w-6 h-6 text-${integration.color}-600`} />
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                integration.status === 'connected' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {integration.status}
              </span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">{integration.name}</h3>
            <p className="text-gray-600 mb-4">{integration.description}</p>
            <button className={`w-full py-2 rounded-lg font-medium transition-colors ${
              integration.status === 'connected'
                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                : `bg-${integration.color}-600 text-white hover:bg-${integration.color}-700`
            }`}>
              {integration.status === 'connected' ? 'Configure' : 'Connect'}
            </button>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-6">API Configuration</h3>
          <div className="space-y-4">
            {[
              { service: 'WordPress API', endpoint: 'https://yoursite.com/wp-json/', status: 'active' },
              { service: 'PayPal API', endpoint: 'https://api.paypal.com/v1/', status: 'active' },
              { service: 'MT5 Bridge', endpoint: 'ws://localhost:8080/mt5', status: 'active' },
              { service: 'Webhook URL', endpoint: 'https://yourcrm.com/webhook', status: 'pending' }
            ].map((api, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div>
                  <p className="font-medium text-gray-800">{api.service}</p>
                  <p className="text-sm text-gray-500">{api.endpoint}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${
                    api.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
                  }`}></div>
                  <span className="text-sm font-medium text-gray-600 capitalize">{api.status}</span>
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
          <h3 className="text-xl font-bold text-gray-800 mb-6">Affiliate Program</h3>
          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
              <h4 className="font-medium text-gray-800 mb-2">Commission Structure</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tier 1 (1-10 referrals)</span>
                  <span className="font-medium">15%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tier 2 (11-25 referrals)</span>
                  <span className="font-medium">20%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tier 3 (25+ referrals)</span>
                  <span className="font-medium">25%</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Active Affiliates</span>
                <span className="font-medium text-gray-800">142</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Referrals</span>
                <span className="font-medium text-gray-800">1,234</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Commission Paid</span>
                <span className="font-medium text-green-600">$45,670</span>
              </div>
            </div>

            <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Manage Affiliates
            </button>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 border border-gray-200"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-6">Automated Certificates & Tailored Excellence</h3>
        <p className="text-gray-600 mb-6">
          Automatic and custom certificate generation. Certificates are instantly issued upon any 
          milestone and completion, with customizable templates that perfectly convey a perfect 
          tool for marketing tool brand awareness and recognitions, enhancing user engagement.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Funding Certificate', issued: '1,234', template: 'Standard' },
            { title: 'Profit Certificate', issued: '567', template: 'Premium' },
            { title: 'Achievement Badge', issued: '890', template: 'Custom' }
          ].map((cert, index) => (
            <div key={index} className="p-4 rounded-lg bg-gray-50">
              <h4 className="font-medium text-gray-800 mb-2">{cert.title}</h4>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Issued: {cert.issued}</span>
                <span className="text-blue-600">{cert.template}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Integrations;