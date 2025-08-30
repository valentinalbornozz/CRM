import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCreditCard, FiUsers, FiUserCheck, FiGift, FiShield, FiDollarSign, FiLink, FiBell, FiBarChart3 } = FiIcons;

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/prop-accounts', icon: FiCreditCard, label: 'Prop Accounts' },
    { path: '/customers', icon: FiUserCheck, label: 'Customers' },
    { path: '/trader-area', icon: FiUsers, label: 'Trader Area' },
    { path: '/affiliates', icon: FiGift, label: 'Affiliates' },
    { path: '/accounts-analytics', icon: FiBarChart3, label: 'Analytics' },
    { path: '/risk-management', icon: FiShield, label: 'Risk Management' },
    { path: '/payouts', icon: FiDollarSign, label: 'Payout Requests' },
    { path: '/integrations', icon: FiLink, label: 'Integrations' },
    { path: '/notifications', icon: FiBell, label: 'Notifications' }
  ];

  return (
    <aside className="fixed left-0 top-16 h-screen w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                }`}
              >
                <SafeIcon icon={item.icon} className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;