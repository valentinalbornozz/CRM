import React from 'react';
import { useNavigate } from 'react-router-dom';
import { QuestLogin } from '@questlabs/react-sdk';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../modals/Toast';
import questConfig from '../../config/questConfig';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useToast();

  const handleLogin = ({ userId, token, newUser, ...otherData }) => {
    try {
      // Store authentication data
      login({ userId, token, ...otherData });
      
      showToast('Login successful!', 'success');

      // Navigate based on user status
      if (newUser) {
        navigate('/onboarding');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Login error:', error);
      showToast('Login failed. Please try again.', 'error');
    }
  };

  const userId = localStorage.getItem('userId') || questConfig.USER_ID;
  const token = localStorage.getItem('token') || questConfig.TOKEN;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex">
      {/* Left Section - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">PF</span>
              </div>
              <span className="font-bold text-2xl">PropFirm CRM</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 leading-tight">
              Welcome Back to Your
              <br />
              <span className="text-blue-200">Trading Hub</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Access your comprehensive prop trading management system. 
              Monitor performance, manage risk, and grow your trading business.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Real-time Analytics</h3>
                <p className="text-blue-100">Monitor trader performance and account metrics</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <span className="text-2xl">🛡️</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Risk Management</h3>
                <p className="text-blue-100">Advanced risk controls and automated monitoring</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Automated Payouts</h3>
                <p className="text-blue-100">Streamlined payout processing across multiple platforms</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-white bg-opacity-10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-purple-300 bg-opacity-20 rounded-full blur-lg"></div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 lg:hidden">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">PF</span>
              </div>
              <span className="font-bold text-xl text-gray-800">PropFirm CRM</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
              <p className="text-gray-600">Sign in to access your trading dashboard</p>
            </div>

            <div className="mb-6">
              <QuestLogin
                onSubmit={handleLogin}
                email={true}
                google={false}
                questId={questConfig.QUEST_LOGIN_QUESTID}
                userId={userId}
                token={token}
                primaryColor={questConfig.PRIMARY_COLOR}
                secondaryColor="#f8fafc"
                fontFamily="Inter, system-ui, sans-serif"
                borderRadius="12px"
                padding="12px 16px"
              />
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-500">
                Secure authentication powered by Quest Labs
              </p>
            </div>
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              Need help? Contact{' '}
              <a href="mailto:support@propfirm.com" className="text-blue-600 hover:text-blue-700 font-medium">
                support@propfirm.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;