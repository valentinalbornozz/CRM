import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OnBoarding } from '@questlabs/react-sdk';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../modals/Toast';
import questConfig from '../../config/questConfig';

const OnboardingPage = () => {
  const navigate = useNavigate();
  const { completeOnboarding } = useAuth();
  const { showToast } = useToast();
  const [answers, setAnswers] = useState({});

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  const getAnswers = () => {
    try {
      // Mark onboarding as completed
      completeOnboarding();
      
      showToast('Onboarding completed successfully!', 'success');
      
      // Navigate to main application
      navigate('/');
    } catch (error) {
      console.error('Onboarding completion error:', error);
      showToast('Failed to complete onboarding. Please try again.', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex">
      {/* Left Section - Visual/Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-600 to-blue-700 relative overflow-hidden">
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
              Let's Get You
              <br />
              <span className="text-green-200">Started!</span>
            </h1>
            <p className="text-xl text-green-100 mb-8 leading-relaxed">
              We're setting up your personalized trading environment. 
              This quick setup will help us tailor your experience.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <span className="text-2xl">🚀</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Quick Setup</h3>
                <p className="text-green-100">Just a few questions to personalize your experience</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Instant Access</h3>
                <p className="text-green-100">Get immediate access to all platform features</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Tailored Experience</h3>
                <p className="text-green-100">Customized dashboard based on your preferences</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-white bg-opacity-10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-blue-300 bg-opacity-20 rounded-full blur-lg"></div>
      </div>

      {/* Right Section - Onboarding Component */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 lg:hidden">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">PF</span>
              </div>
              <span className="font-bold text-xl text-gray-800">PropFirm CRM</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100" style={{ minHeight: '400px' }}>
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Aboard!</h2>
              <p className="text-gray-600">Let's personalize your trading experience</p>
            </div>

            {userId && token ? (
              <OnBoarding
                userId={userId}
                token={token}
                questId={questConfig.QUEST_ONBOARDING_QUESTID}
                answer={answers}
                setAnswer={setAnswers}
                getAnswers={getAnswers}
                singleChoose="modal1"
                multiChoice="modal2"
                primaryColor={questConfig.PRIMARY_COLOR}
                secondaryColor="#f8fafc"
                fontFamily="Inter, system-ui, sans-serif"
                borderRadius="12px"
                padding="12px 16px"
              >
                <OnBoarding.Header />
                <OnBoarding.Content />
                <OnBoarding.Footer />
              </OnBoarding>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-red-600 text-2xl">⚠️</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Authentication Required</h3>
                <p className="text-gray-600 mb-4">Please log in to continue with onboarding.</p>
                <button
                  onClick={() => navigate('/login')}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Go to Login
                </button>
              </div>
            )}
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              Step-by-step setup powered by Quest Labs
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;