import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SafeIcon from '../../common/SafeIcon';
import { useToast } from '../modals/Toast';
import { useAuth } from '../../context/AuthContext';
import * as FiIcons from 'react-icons/fi';

const { FiBell, FiUser, FiSettings, FiSearch, FiLogOut, FiMenu } = FiIcons;

const Navbar = () => {
  const navigate = useNavigate();
  const { showToast, ToastContainer } = useToast();
  const { logout, user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      showToast(`Searching for: ${searchQuery}`, 'info');
      setSearchQuery('');
    }
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      navigate('/notifications');
    }
  };

  const handleSettingsClick = () => {
    showToast('Opening settings...', 'info');
    setTimeout(() => navigate('/back-office'), 1000);
  };

  const handleLogout = () => {
    showToast('Logging out...', 'info');
    setTimeout(() => {
      logout();
      showToast('Logged out successfully', 'success');
      navigate('/login');
    }, 1000);
  };

  const userMenuItems = [
    { label: 'Profile', action: () => showToast('Opening profile...', 'info') },
    { label: 'Account Settings', action: () => navigate('/back-office') },
    { label: 'Help & Support', action: () => showToast('Opening help center...', 'info') },
    { label: 'Logout', action: handleLogout }
  ];

  return (
    <>
      <ToastContainer />
      <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 h-16">
        <div className="flex items-center justify-between h-full px-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">PF</span>
              </div>
              <span className="font-bold text-xl text-gray-800">PropFirm CRM</span>
            </div>
          </div>

          <div className="flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative">
              <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search traders, accounts, transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </form>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleNotificationClick}
              className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              title="Notifications"
            >
              <SafeIcon icon={FiBell} className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>

            <button
              onClick={handleSettingsClick}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              title="Settings"
            >
              <SafeIcon icon={FiSettings} className="w-5 h-5" />
            </button>

            <div className="relative">
              <div
                className="flex items-center space-x-2 pl-4 border-l border-gray-200 cursor-pointer"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors">
                  <SafeIcon icon={FiUser} className="w-4 h-4 text-gray-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {user?.name || 'Admin'}
                </span>
              </div>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                  {userMenuItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setShowUserMenu(false);
                        item.action();
                      }}
                      className={`w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors ${
                        item.label === 'Logout' ? 'text-red-600 hover:bg-red-50' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        {item.label === 'Logout' && <SafeIcon icon={FiLogOut} className="w-4 h-4" />}
                        <span>{item.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Click outside to close menus */}
      {(showUserMenu || showNotifications) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowUserMenu(false);
            setShowNotifications(false);
          }}
        />
      )}
    </>
  );
};

export default Navbar;