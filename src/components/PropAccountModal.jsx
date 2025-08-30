import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import { useToast } from './modals/Toast';
import * as FiIcons from 'react-icons/fi';

const { FiX, FiSave, FiEye, FiEyeOff, FiCopy, FiRefreshCw } = FiIcons;

const PropAccountModal = ({ account, isOpen, onClose, onSave }) => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState(account || {
    id: '',
    name: '',
    labels: '',
    balance: '',
    leverage: '',
    maxTradingDays: '',
    inactivityPeriod: '',
    dailyDrawdown: '',
    maxDrawdown: '',
    type: 'Previous day balance / equity',
    static: false,
    automaticUpgrade: false,
    upgradeAfterDays: '',
    requireStopLoss: false,
    allowExpertAdvisor: false,
    liquidateProfit: false,
    upgradeIsRequired: false,
    contractRequired: false,
    contractTemplate: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('account');

  if (!isOpen) return null;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    onSave(formData);
    showToast('Account settings saved successfully', 'success');
    onClose();
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    handleInputChange('password', password);
    showToast('New password generated', 'success');
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    showToast('Copied to clipboard', 'success');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Edit Prop Account</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <SafeIcon icon={FiX} className="w-6 h-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('account')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'account'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Prop Account
          </button>
          <button
            onClick={() => setActiveTab('platform')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'platform'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Platform Settings
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {activeTab === 'account' && (
            <div className="space-y-6">
              {/* Rules & Objectives */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800 mb-4">Rules & Objectives</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Plan Description</label>
                    <input
                      type="text"
                      value={formData.labels || ''}
                      onChange={(e) => handleInputChange('labels', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="2SF-MT5-$10K"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Profit Target %</label>
                    <input
                      type="number"
                      value={formData.profitTarget || 0}
                      onChange={(e) => handleInputChange('profitTarget', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Min. Trading Days</label>
                    <input
                      type="number"
                      value={formData.minTradingDays || 4}
                      onChange={(e) => handleInputChange('minTradingDays', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Max. Trading Days</label>
                    <input
                      type="number"
                      value={formData.maxTradingDays || 0}
                      onChange={(e) => handleInputChange('maxTradingDays', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Inactivity Period (days)</label>
                    <input
                      type="number"
                      value={formData.inactivityPeriod || 30}
                      onChange={(e) => handleInputChange('inactivityPeriod', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Daily Drawdown %</label>
                    <input
                      type="number"
                      value={formData.dailyDrawdown || 4}
                      onChange={(e) => handleInputChange('dailyDrawdown', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Max Drawdown %</label>
                    <input
                      type="number"
                      value={formData.maxDrawdown || 8}
                      onChange={(e) => handleInputChange('maxDrawdown', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                    <select
                      value={formData.type || 'Previous day balance / equity'}
                      onChange={(e) => handleInputChange('type', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Previous day balance / equity">Previous day balance / equity</option>
                      <option value="Static">Static</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Static</label>
                    <select
                      value={formData.static ? 'Static' : 'Dynamic'}
                      onChange={(e) => handleInputChange('static', e.target.value === 'Static')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Dynamic">Dynamic</option>
                      <option value="Static">Static</option>
                    </select>
                  </div>
                </div>

                {/* Upgrade Plan Section */}
                <div className="mt-6 pt-6 border-t border-blue-200">
                  <h4 className="text-md font-semibold text-blue-800 mb-4">Upgrade Plan</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="automaticUpgrade"
                        checked={formData.automaticUpgrade || false}
                        onChange={(e) => handleInputChange('automaticUpgrade', e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="automaticUpgrade" className="text-sm font-medium text-gray-700">Automatic Upgrade</label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Upgrade after days</label>
                      <input
                        type="number"
                        value={formData.upgradeAfterDays || 0}
                        onChange={(e) => handleInputChange('upgradeAfterDays', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Server Plan Section */}
                <div className="mt-6 pt-6 border-t border-blue-200">
                  <h4 className="text-md font-semibold text-blue-800 mb-4">Server Plan</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="requireStopLoss"
                        checked={formData.requireStopLoss || false}
                        onChange={(e) => handleInputChange('requireStopLoss', e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="requireStopLoss" className="text-sm font-medium text-gray-700">Require Stop Loss</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="allowExpertAdvisor"
                        checked={formData.allowExpertAdvisor || false}
                        onChange={(e) => handleInputChange('allowExpertAdvisor', e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="allowExpertAdvisor" className="text-sm font-medium text-gray-700">Allow Expert Advisor</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="liquidateProfit"
                        checked={formData.liquidateProfit || false}
                        onChange={(e) => handleInputChange('liquidateProfit', e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="liquidateProfit" className="text-sm font-medium text-gray-700">Liquidate Profit</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="upgradeIsRequired"
                        checked={formData.upgradeIsRequired || false}
                        onChange={(e) => handleInputChange('upgradeIsRequired', e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="upgradeIsRequired" className="text-sm font-medium text-gray-700">Upgrade is Required</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="contractRequired"
                        checked={formData.contractRequired || false}
                        onChange={(e) => handleInputChange('contractRequired', e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="contractRequired" className="text-sm font-medium text-gray-700">Contract Required</label>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contract Template</label>
                    <select
                      value={formData.contractTemplate || ''}
                      onChange={(e) => handleInputChange('contractTemplate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Template</option>
                      <option value="67dc26f73ae0e1d0347846e">Standard Contract</option>
                      <option value="67dc26f73ae0e1d0347847f">Premium Contract</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'platform' && (
            <div className="space-y-6">
              {/* Platform Settings */}
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800 mb-4">Platform Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Leverage</label>
                    <input
                      type="number"
                      value={formData.leverage || 30}
                      onChange={(e) => handleInputChange('leverage', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Group</label>
                    <select
                      value={formData.group || 'demo\\BW-ORION3-USD-P'}
                      onChange={(e) => handleInputChange('group', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="demo\\BW-ORION3-USD-P">demo\BW-ORION3-USD-P</option>
                      <option value="demo\\BW-ORION2-USD-P">demo\BW-ORION2-USD-P</option>
                      <option value="demo\\BW-ORION1-USD-P">demo\BW-ORION1-USD-P</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="expertAdvisor"
                      checked={formData.expertAdvisor || false}
                      onChange={(e) => handleInputChange('expertAdvisor', e.target.checked)}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <label htmlFor="expertAdvisor" className="text-sm font-medium text-gray-700">Expert Advisor</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="enabled"
                      checked={formData.enabled !== false}
                      onChange={(e) => handleInputChange('enabled', e.target.checked)}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <label htmlFor="enabled" className="text-sm font-medium text-gray-700">Enabled</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="enableReadOnly"
                      checked={formData.enableReadOnly || false}
                      onChange={(e) => handleInputChange('enableReadOnly', e.target.checked)}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <label htmlFor="enableReadOnly" className="text-sm font-medium text-gray-700">Enable Read Only</label>
                  </div>
                </div>

                {/* Password Section */}
                <div className="mt-6 pt-6 border-t border-green-200">
                  <h4 className="text-md font-semibold text-green-800 mb-4">Account Credentials</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={formData.password || 'jqV*6VoYCM'}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          className="w-full px-3 py-2 pr-20 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center space-x-1 pr-3">
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <SafeIcon icon={showPassword ? FiEyeOff : FiEye} className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(formData.password || 'jqV*6VoYCM')}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <SafeIcon icon={FiCopy} className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={generatePassword}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <SafeIcon icon={FiRefreshCw} className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Investor Password</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.investorPassword || 'GHWfQ*GZYf'}
                          onChange={(e) => handleInputChange('investorPassword', e.target.value)}
                          className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                        <button
                          type="button"
                          onClick={() => copyToClipboard(formData.investorPassword || 'GHWfQ*GZYf')}
                          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                        >
                          <SafeIcon icon={FiCopy} className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <SafeIcon icon={FiSave} className="w-4 h-4" />
            <span>Update</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PropAccountModal;