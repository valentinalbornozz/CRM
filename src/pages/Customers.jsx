import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import { useToast } from '../components/modals/Toast';
import ConfirmModal from '../components/modals/ConfirmModal';
import { useModal } from '../hooks/useModal';
import * as FiIcons from 'react-icons/fi';

const { FiUsers, FiEye, FiEdit3, FiTrash2, FiPlus, FiSearch, FiDownload, FiMail, FiPhone, FiMapPin, FiCalendar, FiTrendingUp, FiAward } = FiIcons;

const Customers = () => {
  const { showToast, ToastContainer } = useToast();
  const { isOpen, modalData, openModal, closeModal } = useModal();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [customers, setCustomers] = useState([
    {
      id: 'C12281',
      name: 'Natalia Masia',
      email: 'natalia.masia@email.com',
      phone: '+34 612 345 678',
      country: 'Spain',
      city: 'Madrid',
      status: 'Active',
      registrationDate: '2024-01-15',
      lastLogin: '2024-01-20 14:30',
      totalAccounts: 2,
      totalSpent: '$15,000',
      challenges: [
        { type: '2-Step Evaluation', status: 'Passed', progress: 100, account: '234975350' },
        { type: '1-Step Challenge', status: 'In Progress', progress: 65, account: '234975351' }
      ],
      kycStatus: 'Verified',
      riskLevel: 'Low',
      preferredProgram: 'MetaTrader 5',
      notes: 'Experienced trader with consistent performance'
    },
    {
      id: 'C24082',
      name: 'Ronald Toro',
      email: 'ronald.toro@email.com',
      phone: '+1 555 123 4567',
      country: 'USA',
      city: 'New York',
      status: 'Active',
      registrationDate: '2024-01-14',
      lastLogin: '2024-01-19 09:15',
      totalAccounts: 1,
      totalSpent: '$10,000',
      challenges: [
        { type: '3-Step Evaluation', status: 'In Progress', progress: 30, account: '234975349' }
      ],
      kycStatus: 'Pending',
      riskLevel: 'Medium',
      preferredProgram: 'MetaTrader 5',
      notes: 'New trader, needs guidance on risk management'
    },
    {
      id: 'C24893',
      name: 'Alejandro Bouchikhi',
      email: 'alejandro.bouchikhi@email.com',
      phone: '+33 6 12 34 56 78',
      country: 'France',
      city: 'Paris',
      status: 'Active',
      registrationDate: '2024-01-13',
      lastLogin: '2024-01-18 16:45',
      totalAccounts: 3,
      totalSpent: '$75,000',
      challenges: [
        { type: '1-Step Evaluation', status: 'Passed', progress: 100, account: '234975348' },
        { type: '2-Step Challenge', status: 'Passed', progress: 100, account: '234975352' },
        { type: 'Scaling Program', status: 'Active', progress: 45, account: '234975353' }
      ],
      kycStatus: 'Verified',
      riskLevel: 'Low',
      preferredProgram: 'MetaTrader 5',
      notes: 'High-value customer, excellent performance record'
    },
    {
      id: 'C21947',
      name: 'Enrique Martin Alderete',
      email: 'enrique.alderete@email.com',
      phone: '+54 11 1234 5678',
      country: 'Argentina',
      city: 'Buenos Aires',
      status: 'Inactive',
      registrationDate: '2024-01-12',
      lastLogin: '2024-01-16 11:20',
      totalAccounts: 1,
      totalSpent: '$5,000',
      challenges: [
        { type: '3-Step Evaluation', status: 'Failed', progress: 25, account: '234975347' }
      ],
      kycStatus: 'Verified',
      riskLevel: 'High',
      preferredProgram: 'MetaTrader 5',
      notes: 'Needs additional training on risk management'
    }
  ]);

  const handleEditCustomer = (customerId) => {
    const customer = customers.find(cust => cust.id === customerId);
    showToast(`Opening customer editor for ${customer.name}`, 'info');
    setSelectedCustomer(customer);
  };

  const handleDeleteCustomer = (customerId) => {
    const customer = customers.find(cust => cust.id === customerId);
    openModal({
      title: 'Delete Customer',
      message: `Are you sure you want to delete customer ${customer.name}? This action cannot be undone.`,
      type: 'danger',
      onConfirm: () => {
        setCustomers(prev => prev.filter(cust => cust.id !== customerId));
        showToast(`Customer ${customer.name} deleted successfully`, 'success');
      }
    });
  };

  const handleSendEmail = (customer) => {
    showToast(`Opening email composer for ${customer.name}`, 'info');
    // Implementation for email composer
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.id.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || customer.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { label: 'Total Customers', value: customers.length.toString(), color: 'blue', icon: FiUsers },
    { label: 'Active Customers', value: customers.filter(c => c.status === 'Active').length.toString(), color: 'green', icon: FiTrendingUp },
    { label: 'KYC Verified', value: customers.filter(c => c.kycStatus === 'Verified').length.toString(), color: 'purple', icon: FiAward },
    { label: 'Total Revenue', value: '$' + customers.reduce((sum, c) => sum + parseFloat(c.totalSpent.replace('$', '').replace(',', '')), 0).toLocaleString(), color: 'orange', icon: FiTrendingUp }
  ];

  return (
    <div className="p-8">
      <ToastContainer />
      
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <SafeIcon icon={FiUsers} className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Customers</h1>
            <p className="text-gray-600">Manage all registered customers and their challenge progress</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => showToast('Opening customer registration form...', 'info')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <SafeIcon icon={FiPlus} className="w-4 h-4" />
            <span>Add Customer</span>
          </button>
          <button
            onClick={() => showToast('Exporting customer data...', 'info')}
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

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCustomers.map((customer, index) => (
          <motion.div
            key={customer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium">
                      {customer.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{customer.name}</h3>
                    <p className="text-sm text-gray-500">{customer.id}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  customer.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {customer.status}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <SafeIcon icon={FiMail} className="w-4 h-4" />
                  <span>{customer.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <SafeIcon icon={FiPhone} className="w-4 h-4" />
                  <span>{customer.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <SafeIcon icon={FiMapPin} className="w-4 h-4" />
                  <span>{customer.city}, {customer.country}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <SafeIcon icon={FiCalendar} className="w-4 h-4" />
                  <span>Joined {customer.registrationDate}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Accounts</p>
                    <p className="font-semibold text-gray-800">{customer.totalAccounts}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Total Spent</p>
                    <p className="font-semibold text-gray-800">{customer.totalSpent}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">KYC Status</p>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      customer.kycStatus === 'Verified' ? 'bg-green-100 text-green-700' : 
                      customer.kycStatus === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-red-100 text-red-700'
                    }`}>
                      {customer.kycStatus}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-500">Risk Level</p>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      customer.riskLevel === 'Low' ? 'bg-green-100 text-green-700' : 
                      customer.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-red-100 text-red-700'
                    }`}>
                      {customer.riskLevel}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Active Challenges</p>
                <div className="space-y-2">
                  {customer.challenges.slice(0, 2).map((challenge, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{challenge.type}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              challenge.status === 'Passed' ? 'bg-green-500' :
                              challenge.status === 'Failed' ? 'bg-red-500' : 'bg-blue-500'
                            }`}
                            style={{ width: `${challenge.progress}%` }}
                          ></div>
                        </div>
                        <span className={`text-xs font-medium ${
                          challenge.status === 'Passed' ? 'text-green-600' :
                          challenge.status === 'Failed' ? 'text-red-600' : 'text-blue-600'
                        }`}>
                          {challenge.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditCustomer(customer.id)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="View Details"
                  >
                    <SafeIcon icon={FiEye} className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleSendEmail(customer)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    title="Send Email"
                  >
                    <SafeIcon icon={FiMail} className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleEditCustomer(customer.id)}
                    className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                    title="Edit Customer"
                  >
                    <SafeIcon icon={FiEdit3} className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={() => handleDeleteCustomer(customer.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete Customer"
                >
                  <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <div className="text-center py-12">
          <SafeIcon icon={FiUsers} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No customers found</h3>
          <p className="text-gray-600">Try adjusting your search criteria.</p>
        </div>
      )}

      {/* Customer Details Modal */}
      {selectedCustomer && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedCustomer(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Customer Details</h2>
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <SafeIcon icon={FiTrash2} className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-500">Full Name</label>
                      <p className="font-medium text-gray-800">{selectedCustomer.name}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Email</label>
                      <p className="font-medium text-gray-800">{selectedCustomer.email}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Phone</label>
                      <p className="font-medium text-gray-800">{selectedCustomer.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Location</label>
                      <p className="font-medium text-gray-800">{selectedCustomer.city}, {selectedCustomer.country}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Summary</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-500">Customer ID</label>
                      <p className="font-medium text-gray-800">{selectedCustomer.id}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Registration Date</label>
                      <p className="font-medium text-gray-800">{selectedCustomer.registrationDate}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Last Login</label>
                      <p className="font-medium text-gray-800">{selectedCustomer.lastLogin}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Total Spent</label>
                      <p className="font-medium text-gray-800">{selectedCustomer.totalSpent}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Challenge Progress</h3>
                <div className="space-y-4">
                  {selectedCustomer.challenges.map((challenge, idx) => (
                    <div key={idx} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-800">{challenge.type}</h4>
                        <span className={`px-2 py-1 rounded text-sm font-medium ${
                          challenge.status === 'Passed' ? 'bg-green-100 text-green-700' :
                          challenge.status === 'Failed' ? 'bg-red-100 text-red-700' :
                          challenge.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {challenge.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              challenge.status === 'Passed' ? 'bg-green-500' :
                              challenge.status === 'Failed' ? 'bg-red-500' : 'bg-blue-500'
                            }`}
                            style={{ width: `${challenge.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{challenge.progress}%</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">Account: {challenge.account}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Notes</h3>
                <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">{selectedCustomer.notes}</p>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => handleSendEmail(selectedCustomer)}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <SafeIcon icon={FiMail} className="w-4 h-4" />
                  <span>Send Email</span>
                </button>
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

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

export default Customers;