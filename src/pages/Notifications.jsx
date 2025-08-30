import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import { useNotifications } from '../hooks/useNotifications';
import { useToast } from '../components/modals/Toast';
import * as FiIcons from 'react-icons/fi';

const { FiBell, FiMail, FiSmartphone, FiCheck, FiX } = FiIcons;

const Notifications = () => {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAllNotifications
  } = useNotifications();
  
  const { showToast, ToastContainer } = useToast();

  const channels = [
    { type: 'Email', sent: '2,341', delivered: '2,298', color: 'blue' },
    { type: 'SMS', sent: '567', delivered: '552', color: 'green' },
    { type: 'In-App', sent: '4,123', delivered: '4,123', color: 'purple' }
  ];

  const notificationSettings = [
    { category: 'Account Events', email: true, sms: false, push: true },
    { category: 'Risk Alerts', email: true, sms: true, push: true },
    { category: 'Payout Updates', email: true, sms: false, push: true },
    { category: 'System Updates', email: false, sms: false, push: true },
    { category: 'Marketing', email: true, sms: false, push: false }
  ];

  const orderMetrics = [
    { title: 'Orders Today', value: '1,247', change: '+8%' },
    { title: 'Execution Speed', value: '12ms', change: '-2ms' },
    { title: 'Success Rate', value: '99.8%', change: '+0.1%' },
    { title: 'Volume Processed', value: '$2.4M', change: '+15%' }
  ];

  const handleNotificationAction = (id, action) => {
    if (action === 'approve') {
      markAsRead(id);
      showToast('Notification approved and marked as read', 'success');
    } else if (action === 'dismiss') {
      removeNotification(id);
      showToast('Notification dismissed', 'info');
    }
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead();
    showToast('All notifications marked as read', 'success');
  };

  const handleClearAll = () => {
    clearAllNotifications();
    showToast('All notifications cleared', 'info');
  };

  return (
    <div className="p-8">
      <ToastContainer />
      
      <div className="flex items-center space-x-3 mb-8">
        <SafeIcon icon={FiBell} className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
          <p className="text-gray-600">
            Notifications with One-Click Insight - Keep traders informed about their achievements 
            and performance with real-time notifications and detailed summaries.
          </p>
        </div>
        {unreadCount > 0 && (
          <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            {unreadCount} unread
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {channels.map((channel, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => showToast(`Viewing ${channel.type} analytics...`, 'info')}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{channel.type}</h3>
              <SafeIcon
                icon={channel.type === 'Email' ? FiMail : channel.type === 'SMS' ? FiSmartphone : FiBell}
                className={`w-6 h-6 text-${channel.color}-600`}
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Sent</span>
                <span className="font-medium">{channel.sent}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivered</span>
                <span className="font-medium text-green-600">{channel.delivered}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Success Rate</span>
                <span className="font-medium">
                  {Math.round((parseInt(channel.delivered.replace(',', '')) / parseInt(channel.sent.replace(',', ''))) * 100)}%
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">Recent Notifications</h3>
            <div className="space-x-2">
              <button
                onClick={handleMarkAllAsRead}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-colors"
              >
                Mark All Read
              </button>
              <button
                onClick={handleClearAll}
                className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200 transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg ${notification.read ? 'bg-gray-50' : 'bg-blue-50'} border-l-4 ${
                  notification.type === 'success' ? 'border-green-500' : 
                  notification.type === 'warning' ? 'border-yellow-500' : 'border-blue-500'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800 mb-1">{notification.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                    <p className="text-xs text-gray-500">{notification.time}</p>
                  </div>
                  <div className="flex space-x-1 ml-4">
                    <button
                      onClick={() => handleNotificationAction(notification.id, 'approve')}
                      className="p-1 text-green-600 hover:bg-green-100 rounded transition-colors"
                      title="Approve"
                    >
                      <SafeIcon icon={FiCheck} className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleNotificationAction(notification.id, 'dismiss')}
                      className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                      title="Dismiss"
                    >
                      <SafeIcon icon={FiX} className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {notifications.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No notifications to display
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-6">Notification Settings</h3>
          <div className="space-y-6">
            {notificationSettings.map((setting, index) => (
              <div key={index} className="space-y-3">
                <h4 className="font-medium text-gray-800">{setting.category}</h4>
                <div className="grid grid-cols-3 gap-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={setting.email}
                      onChange={(e) => {
                        showToast(`${setting.category} email notifications ${e.target.checked ? 'enabled' : 'disabled'}`, 'info');
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600">Email</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={setting.sms}
                      onChange={(e) => {
                        showToast(`${setting.category} SMS notifications ${e.target.checked ? 'enabled' : 'disabled'}`, 'info');
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600">SMS</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={setting.push}
                      onChange={(e) => {
                        showToast(`${setting.category} push notifications ${e.target.checked ? 'enabled' : 'disabled'}`, 'info');
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600">Push</span>
                  </label>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-medium text-gray-800 mb-4">Quick Actions</h4>
            <div className="space-y-2">
              <button
                onClick={handleMarkAllAsRead}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Mark All as Read
              </button>
              <button
                onClick={handleClearAll}
                className="w-full bg-gray-600 text-white py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors"
              >
                Clear All Notifications
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 border border-gray-200"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-6">Streamlined Order Integration & Execution</h3>
        <p className="text-gray-600 mb-6">
          Seamlessly handle orders with our advanced integration. From order placement to execution,
          our system ensures efficient processing and real-time updates for optimal trading experience.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {orderMetrics.map((metric, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={() => showToast(`Viewing ${metric.title} details...`, 'info')}
            >
              <h4 className="text-sm text-gray-500 mb-1">{metric.title}</h4>
              <p className="text-xl font-bold text-gray-800">{metric.value}</p>
              <p className="text-sm text-green-600">{metric.change}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Notifications;