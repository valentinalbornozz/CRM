import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import ConfirmModal from '../components/modals/ConfirmModal';
import { useModal } from '../hooks/useModal';
import { useToast } from '../components/modals/Toast';
import * as FiIcons from 'react-icons/fi';

const { FiDollarSign, FiCheck, FiX, FiClock, FiEye, FiDownload, FiCreditCard } = FiIcons;

const PayoutRequests = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedRequests, setSelectedRequests] = useState([]);
  const { isOpen, modalData, openModal, closeModal } = useModal();
  const { showToast, ToastContainer } = useToast();

  const [payoutRequests, setPayoutRequests] = useState([
    {
      id: 'PR-001',
      trader: 'John Doe',
      account: 'ACC-001',
      amount: '$2,341.00',
      profit: '$12,450',
      status: 'pending',
      date: '2024-01-15',
      method: 'Wise Transfer',
      details: 'john.doe@wise.com',
      email: 'john@example.com',
      accountDetails: {
        currency: 'USD',
        country: 'United States',
        bankName: 'Wise USA Inc.',
        accountNumber: '****4567'
      }
    },
    {
      id: 'PR-002',
      trader: 'Sarah Smith',
      account: 'ACC-002',
      amount: '$1,890.50',
      profit: '$8,320',
      status: 'approved',
      date: '2024-01-14',
      method: 'PayPal',
      details: 'sarah.smith@paypal.com',
      email: 'sarah@example.com',
      accountDetails: {
        paypalEmail: 'sarah.smith@paypal.com',
        verified: true
      }
    },
    {
      id: 'PR-003',
      trader: 'Mike Johnson',
      account: 'ACC-003',
      amount: '$3,120.75',
      profit: '$15,670',
      status: 'processing',
      date: '2024-01-13',
      method: 'Cryptocurrency',
      details: 'USDT (TRC-20)',
      email: 'mike@example.com',
      accountDetails: {
        walletAddress: 'TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE',
        network: 'TRON (TRC-20)',
        currency: 'USDT'
      }
    },
    {
      id: 'PR-004',
      trader: 'Emma Wilson',
      account: 'ACC-004',
      amount: '$5,250.00',
      profit: '$21,000',
      status: 'pending',
      date: '2024-01-12',
      method: 'Wise Transfer',
      details: 'emma.wilson@wise.com',
      email: 'emma@example.com',
      accountDetails: {
        currency: 'EUR',
        country: 'Germany',
        bankName: 'Wise Europe SA',
        accountNumber: '****8901'
      }
    }
  ]);

  const handleApproveRequest = (requestId) => {
    openModal({
      title: 'Approve Payout Request',
      message: `Are you sure you want to approve payout request ${requestId}? This action will initiate the payment process.`,
      type: 'success',
      onConfirm: () => {
        setPayoutRequests(prev =>
          prev.map(req =>
            req.id === requestId ? { ...req, status: 'approved' } : req
          )
        );
        showToast(`Payout request ${requestId} approved successfully`, 'success');
      }
    });
  };

  const handleRejectRequest = (requestId) => {
    openModal({
      title: 'Reject Payout Request',
      message: `Are you sure you want to reject payout request ${requestId}? The trader will be notified.`,
      type: 'danger',
      onConfirm: () => {
        setPayoutRequests(prev =>
          prev.map(req =>
            req.id === requestId ? { ...req, status: 'rejected' } : req
          )
        );
        showToast(`Payout request ${requestId} rejected`, 'warning');
      }
    });
  };

  const handleBulkProcess = () => {
    if (selectedRequests.length === 0) {
      showToast('Please select requests to process', 'warning');
      return;
    }

    openModal({
      title: 'Bulk Process Payouts',
      message: `Process ${selectedRequests.length} selected payout requests? This will approve all selected pending requests.`,
      type: 'success',
      onConfirm: () => {
        setPayoutRequests(prev =>
          prev.map(req =>
            selectedRequests.includes(req.id) && req.status === 'pending'
              ? { ...req, status: 'processing' }
              : req
          )
        );
        setSelectedRequests([]);
        showToast(`${selectedRequests.length} payout requests processed`, 'success');
      }
    });
  };

  const handleExportReport = () => {
    showToast('Generating payout report...', 'info');
    setTimeout(() => {
      showToast('Payout report exported successfully', 'success');
    }, 2000);
  };

  const toggleRequestSelection = (requestId) => {
    setSelectedRequests(prev =>
      prev.includes(requestId)
        ? prev.filter(id => id !== requestId)
        : [...prev, requestId]
    );
  };

  const stats = [
    {
      label: 'Pending Requests',
      value: payoutRequests.filter(r => r.status === 'pending').length.toString(),
      color: 'yellow'
    },
    {
      label: 'Total Amount',
      value: '$' + payoutRequests.reduce((sum, req) => sum + parseFloat(req.amount.replace('$', '').replace(',', '')), 0).toLocaleString(),
      color: 'blue'
    },
    {
      label: 'Approved Today',
      value: payoutRequests.filter(r => r.status === 'approved').length.toString(),
      color: 'green'
    },
    {
      label: 'Processing Time',
      value: '2.3 days',
      color: 'purple'
    }
  ];

  const paymentMethods = [
    {
      method: 'Wise Transfer',
      requests: payoutRequests.filter(r => r.method === 'Wise Transfer').length.toString(),
      total: '$' + payoutRequests.filter(r => r.method === 'Wise Transfer').reduce((sum, r) => sum + parseFloat(r.amount.replace('$', '').replace(',', '')), 0).toLocaleString(),
      status: 'active',
      description: 'International bank transfers',
      icon: FiCreditCard,
      color: 'blue'
    },
    {
      method: 'PayPal',
      requests: payoutRequests.filter(r => r.method === 'PayPal').length.toString(),
      total: '$' + payoutRequests.filter(r => r.method === 'PayPal').reduce((sum, r) => sum + parseFloat(r.amount.replace('$', '').replace(',', '')), 0).toLocaleString(),
      status: 'active',
      description: 'Instant PayPal transfers',
      icon: FiDollarSign,
      color: 'green'
    },
    {
      method: 'Cryptocurrency',
      requests: payoutRequests.filter(r => r.method === 'Cryptocurrency').length.toString(),
      total: '$' + payoutRequests.filter(r => r.method === 'Cryptocurrency').reduce((sum, r) => sum + parseFloat(r.amount.replace('$', '').replace(',', '')), 0).toLocaleString(),
      status: 'active',
      description: 'USDT, BTC, ETH supported',
      icon: FiDollarSign,
      color: 'purple'
    }
  ];

  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case 'Wise Transfer':
        return '🏦';
      case 'PayPal':
        return '💳';
      case 'Cryptocurrency':
        return '₿';
      default:
        return '💰';
    }
  };

  return (
    <div className="p-8">
      <ToastContainer />
      
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <SafeIcon icon={FiDollarSign} className="w-8 h-8 text-green-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Payout Requests</h1>
            <p className="text-gray-600">Process trader payouts via Wise Transfer, PayPal, and Cryptocurrency</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleBulkProcess}
            disabled={selectedRequests.length === 0}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedRequests.length > 0
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            Bulk Process ({selectedRequests.length})
          </button>
          <button
            onClick={handleExportReport}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
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
            <h3 className="text-sm font-medium text-gray-500 mb-2">{stat.label}</h3>
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Payment Methods Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {paymentMethods.map((method, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => showToast(`Viewing ${method.method} details...`, 'info')}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-lg bg-${method.color}-50 flex items-center justify-center`}>
                  <span className="text-2xl">{getPaymentMethodIcon(method.method)}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{method.method}</h3>
                  <p className="text-sm text-gray-500">{method.description}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                method.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {method.status}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Requests</p>
                <p className="text-xl font-bold text-gray-800">{method.requests}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total</p>
                <p className="text-xl font-bold text-green-600">{method.total}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Payout Requests */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-800">Recent Payout Requests</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {payoutRequests.map((request, index) => (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <input
                    type="checkbox"
                    checked={selectedRequests.includes(request.id)}
                    onChange={() => toggleRequestSelection(request.id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {request.trader.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{request.trader}</p>
                    <p className="text-sm text-gray-500">{request.account} • {request.date}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-2xl">{getPaymentMethodIcon(request.method)}</span>
                      <span className="text-sm text-gray-600">{request.method}</span>
                      <span className="text-sm text-gray-400">•</span>
                      <span className="text-sm text-gray-600">{request.details}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-800">{request.amount}</p>
                  <p className="text-sm text-gray-500">from {request.profit} profit</p>
                </div>

                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    request.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    request.status === 'approved' ? 'bg-green-100 text-green-700' :
                    request.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {request.status}
                  </span>
                  
                  <button
                    onClick={() => setSelectedRequest(request)}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="View Details"
                  >
                    <SafeIcon icon={FiEye} className="w-4 h-4" />
                  </button>
                  
                  {request.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleApproveRequest(request.id)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Approve"
                      >
                        <SafeIcon icon={FiCheck} className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleRejectRequest(request.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Reject"
                      >
                        <SafeIcon icon={FiX} className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Payout Request Details Modal */}
      {selectedRequest && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedRequest(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">Payout Request Details</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Request ID:</span>
                <span className="font-medium">{selectedRequest.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Trader:</span>
                <span className="font-medium">{selectedRequest.trader}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-medium text-green-600">{selectedRequest.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Method:</span>
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{getPaymentMethodIcon(selectedRequest.method)}</span>
                  <span className="font-medium">{selectedRequest.method}</span>
                </div>
              </div>
              
              {selectedRequest.method === 'Wise Transfer' && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Bank Details</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-600">Bank:</span>
                      <span>{selectedRequest.accountDetails.bankName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-600">Account:</span>
                      <span>{selectedRequest.accountDetails.accountNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-600">Currency:</span>
                      <span>{selectedRequest.accountDetails.currency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-600">Country:</span>
                      <span>{selectedRequest.accountDetails.country}</span>
                    </div>
                  </div>
                </div>
              )}
              
              {selectedRequest.method === 'PayPal' && (
                <div className="bg-green-50 p-3 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">PayPal Details</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-green-600">Email:</span>
                      <span>{selectedRequest.accountDetails.paypalEmail}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-600">Verified:</span>
                      <span className={selectedRequest.accountDetails.verified ? 'text-green-600' : 'text-red-600'}>
                        {selectedRequest.accountDetails.verified ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
              
              {selectedRequest.method === 'Cryptocurrency' && (
                <div className="bg-purple-50 p-3 rounded-lg">
                  <h4 className="font-medium text-purple-800 mb-2">Crypto Details</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-purple-600">Currency:</span>
                      <span>{selectedRequest.accountDetails.currency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-600">Network:</span>
                      <span>{selectedRequest.accountDetails.network}</span>
                    </div>
                    <div className="text-purple-600">Address:</div>
                    <div className="bg-white p-2 rounded border text-xs font-mono break-all">
                      {selectedRequest.accountDetails.walletAddress}
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className={`font-medium capitalize ${
                  selectedRequest.status === 'pending' ? 'text-yellow-600' :
                  selectedRequest.status === 'approved' ? 'text-green-600' :
                  selectedRequest.status === 'processing' ? 'text-blue-600' :
                  'text-red-600'
                }`}>
                  {selectedRequest.status}
                </span>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              {selectedRequest.status === 'pending' && (
                <>
                  <button
                    onClick={() => {
                      handleApproveRequest(selectedRequest.id);
                      setSelectedRequest(null);
                    }}
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <SafeIcon icon={FiCheck} className="w-4 h-4" />
                    <span>Approve</span>
                  </button>
                  <button
                    onClick={() => {
                      handleRejectRequest(selectedRequest.id);
                      setSelectedRequest(null);
                    }}
                    className="flex-1 bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <SafeIcon icon={FiX} className="w-4 h-4" />
                    <span>Reject</span>
                  </button>
                </>
              )}
              <button
                onClick={() => setSelectedRequest(null)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
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

export default PayoutRequests;