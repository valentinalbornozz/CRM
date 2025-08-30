import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import { useToast } from '../components/modals/Toast';
import ConfirmModal from '../components/modals/ConfirmModal';
import { useModal } from '../hooks/useModal';
import * as FiIcons from 'react-icons/fi';

const { FiUsers, FiTrendingUp, FiDollarSign, FiLink, FiEye, FiEdit3, FiTrash2, FiPlus, FiSearch, FiDownload, FiCopy, FiMail, FiPhone, FiCalendar, FiPercent } = FiIcons;

const Affiliates = () => {
  const { showToast, ToastContainer } = useToast();
  const { isOpen, modalData, openModal, closeModal } = useModal();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAffiliates, setSelectedAffiliates] = useState([]);
  const [filterTier, setFilterTier] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const [affiliates, setAffiliates] = useState([
    {
      id: 'AFF001',
      name: 'Carlos Rodriguez',
      email: 'carlos.rodriguez@email.com',
      phone: '+34 612 345 678',
      country: 'Spain',
      status: 'Active',
      joinDate: '2024-01-10',
      tier: 'Gold',
      commission: 25,
      totalReferrals: 45,
      activeReferrals: 32,
      totalCommissions: '$12,450.75',
      monthlyCommissions: '$2,340.50',
      conversionRate: 71.1,
      affiliateLink: 'https://propfirm.com/ref/carlos-rodriguez',
      paymentMethod: 'PayPal',
      paymentDetails: 'carlos.rodriguez@paypal.com',
      lastPayout: '2024-01-15',
      nextPayout: '2024-02-01',
      notes: 'Top performer, excellent conversion rates'
    },
    {
      id: 'AFF002',
      name: 'Maria Silva',
      email: 'maria.silva@email.com',
      phone: '+55 11 98765 4321',
      country: 'Brazil',
      status: 'Active',
      joinDate: '2024-01-08',
      tier: 'Silver',
      commission: 20,
      totalReferrals: 28,
      activeReferrals: 19,
      totalCommissions: '$7,890.25',
      monthlyCommissions: '$1,560.80',
      conversionRate: 67.9,
      affiliateLink: 'https://propfirm.com/ref/maria-silva',
      paymentMethod: 'Bank Transfer',
      paymentDetails: 'Bank of Brazil - ****1234',
      lastPayout: '2024-01-15',
      nextPayout: '2024-02-01',
      notes: 'Consistent performer, good social media presence'
    },
    {
      id: 'AFF003',
      name: 'Ahmed Hassan',
      email: 'ahmed.hassan@email.com',
      phone: '+971 50 123 4567',
      country: 'UAE',
      status: 'Active',
      joinDate: '2024-01-12',
      tier: 'Bronze',
      commission: 15,
      totalReferrals: 12,
      activeReferrals: 8,
      totalCommissions: '$2,340.50',
      monthlyCommissions: '$780.25',
      conversionRate: 66.7,
      affiliateLink: 'https://propfirm.com/ref/ahmed-hassan',
      paymentMethod: 'Cryptocurrency',
      paymentDetails: 'USDT - TRC20',
      lastPayout: '2024-01-15',
      nextPayout: '2024-02-01',
      notes: 'New affiliate, showing good potential'
    },
    {
      id: 'AFF004',
      name: 'Jennifer Chen',
      email: 'jennifer.chen@email.com',
      phone: '+1 555 987 6543',
      country: 'USA',
      status: 'Pending',
      joinDate: '2024-01-18',
      tier: 'Bronze',
      commission: 15,
      totalReferrals: 3,
      activeReferrals: 2,
      totalCommissions: '$450.00',
      monthlyCommissions: '$150.00',
      conversionRate: 66.7,
      affiliateLink: 'https://propfirm.com/ref/jennifer-chen',
      paymentMethod: 'PayPal',
      paymentDetails: 'jennifer.chen@paypal.com',
      lastPayout: 'Never',
      nextPayout: '2024-02-01',
      notes: 'Recently joined, needs onboarding support'
    }
  ]);

  const commissionTiers = [
    { name: 'Bronze', referrals: '1-10', commission: '15%', color: 'orange' },
    { name: 'Silver', referrals: '11-25', commission: '20%', color: 'gray' },
    { name: 'Gold', referrals: '26-50', commission: '25%', color: 'yellow' },
    { name: 'Platinum', referrals: '51+', commission: '30%', color: 'purple' }
  ];

  const handleCopyLink = (link) => {
    navigator.clipboard.writeText(link);
    showToast('Affiliate link copied to clipboard', 'success');
  };

  const handleApproveAffiliate = (affiliateId) => {
    openModal({
      title: 'Approve Affiliate',
      message: 'Are you sure you want to approve this affiliate application?',
      type: 'success',
      onConfirm: () => {
        setAffiliates(prev =>
          prev.map(aff =>
            aff.id === affiliateId ? { ...aff, status: 'Active' } : aff
          )
        );
        showToast('Affiliate approved successfully', 'success');
      }
    });
  };

  const handleDeleteAffiliate = (affiliateId) => {
    const affiliate = affiliates.find(aff => aff.id === affiliateId);
    openModal({
      title: 'Delete Affiliate',
      message: `Are you sure you want to delete affiliate ${affiliate.name}? This action cannot be undone.`,
      type: 'danger',
      onConfirm: () => {
        setAffiliates(prev => prev.filter(aff => aff.id !== affiliateId));
        showToast(`Affiliate ${affiliate.name} deleted successfully`, 'success');
      }
    });
  };

  const filteredAffiliates = affiliates.filter(affiliate => {
    const matchesSearch = affiliate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         affiliate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         affiliate.id.includes(searchTerm);
    const matchesTier = filterTier === 'all' || affiliate.tier.toLowerCase() === filterTier.toLowerCase();
    const matchesStatus = filterStatus === 'all' || affiliate.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesTier && matchesStatus;
  });

  const stats = [
    { 
      label: 'Total Affiliates', 
      value: affiliates.length.toString(), 
      color: 'blue', 
      icon: FiUsers 
    },
    { 
      label: 'Active Affiliates', 
      value: affiliates.filter(a => a.status === 'Active').length.toString(), 
      color: 'green', 
      icon: FiTrendingUp 
    },
    { 
      label: 'Total Referrals', 
      value: affiliates.reduce((sum, a) => sum + a.totalReferrals, 0).toString(), 
      color: 'purple', 
      icon: FiUsers 
    },
    { 
      label: 'Total Commissions', 
      value: '$' + affiliates.reduce((sum, a) => sum + parseFloat(a.totalCommissions.replace('$', '').replace(',', '')), 0).toLocaleString(), 
      color: 'orange', 
      icon: FiDollarSign 
    }
  ];

  return (
    <div className="p-8">
      <ToastContainer />
      
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <SafeIcon icon={FiUsers} className="w-8 h-8 text-purple-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Affiliate Program</h1>
            <p className="text-gray-600">Manage affiliates, track referrals, and process commissions</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => showToast('Opening affiliate registration form...', 'info')}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center space-x-2"
          >
            <SafeIcon icon={FiPlus} className="w-4 h-4" />
            <span>Add Affiliate</span>
          </button>
          <button
            onClick={() => showToast('Exporting affiliate data...', 'info')}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center space-x-2"
          >
            <SafeIcon icon={FiDownload} className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => showToast(`Viewing ${stat.label} details...`, 'info')}
          >
            <div className="flex items-center justify-between mb-4">
              <SafeIcon icon={stat.icon} className={`w-8 h-8 text-${stat.color}-600`} />
            </div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">{stat.label}</h3>
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Commission Tiers */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Commission Structure</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {commissionTiers.map((tier, index) => (
            <div key={index} className={`p-4 rounded-lg bg-${tier.color}-50 border border-${tier.color}-200`}>
              <div className="flex items-center justify-between mb-2">
                <h4 className={`font-medium text-${tier.color}-800`}>{tier.name}</h4>
                <SafeIcon icon={FiPercent} className={`w-5 h-5 text-${tier.color}-600`} />
              </div>
              <p className={`text-sm text-${tier.color}-600 mb-1`}>{tier.referrals} referrals</p>
              <p className={`text-lg font-bold text-${tier.color}-800`}>{tier.commission}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search affiliates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent w-80"
              />
            </div>
            <select
              value={filterTier}
              onChange={(e) => setFilterTier(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Tiers</option>
              <option value="bronze">Bronze</option>
              <option value="silver">Silver</option>
              <option value="gold">Gold</option>
              <option value="platinum">Platinum</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>
      </div>

      {/* Affiliates Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Affiliate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tier</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Referrals</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversion</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commissions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAffiliates.map((affiliate, index) => (
                <motion.tr
                  key={affiliate.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-medium text-sm">
                          {affiliate.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{affiliate.name}</div>
                        <div className="text-sm text-gray-500">{affiliate.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{affiliate.email}</div>
                    <div className="text-sm text-gray-500">{affiliate.country}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      affiliate.tier === 'Gold' ? 'bg-yellow-100 text-yellow-800' :
                      affiliate.tier === 'Silver' ? 'bg-gray-100 text-gray-800' :
                      affiliate.tier === 'Bronze' ? 'bg-orange-100 text-orange-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {affiliate.tier} ({affiliate.commission}%)
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{affiliate.totalReferrals} total</div>
                    <div className="text-sm text-gray-500">{affiliate.activeReferrals} active</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{affiliate.conversionRate.toFixed(1)}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{affiliate.totalCommissions}</div>
                    <div className="text-sm text-gray-500">This month: {affiliate.monthlyCommissions}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      affiliate.status === 'Active' ? 'bg-green-100 text-green-800' :
                      affiliate.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {affiliate.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleCopyLink(affiliate.affiliateLink)}
                        className="text-purple-600 hover:text-purple-900 p-1 hover:bg-purple-50 rounded"
                        title="Copy Affiliate Link"
                      >
                        <SafeIcon icon={FiCopy} className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => showToast(`Viewing ${affiliate.name} details...`, 'info')}
                        className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded"
                        title="View Details"
                      >
                        <SafeIcon icon={FiEye} className="w-4 h-4" />
                      </button>
                      {affiliate.status === 'Pending' && (
                        <button
                          onClick={() => handleApproveAffiliate(affiliate.id)}
                          className="text-green-600 hover:text-green-900 p-1 hover:bg-green-50 rounded"
                          title="Approve Affiliate"
                        >
                          <SafeIcon icon={FiTrendingUp} className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => showToast(`Editing ${affiliate.name}...`, 'info')}
                        className="text-gray-600 hover:text-gray-900 p-1 hover:bg-gray-50 rounded"
                        title="Edit Affiliate"
                      >
                        <SafeIcon icon={FiEdit3} className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteAffiliate(affiliate.id)}
                        className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded"
                        title="Delete Affiliate"
                      >
                        <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAffiliates.length === 0 && (
          <div className="text-center py-12">
            <SafeIcon icon={FiUsers} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No affiliates found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={isOpen}
        onClose={closeModal}
        onConfirm={modalData?.onConfirm}
        title={modalData?.title}
        message={modalData?.message}
        type={modalData?.type}
      />
    </div>
  );
};

export default Affiliates;