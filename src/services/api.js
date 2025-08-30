// API Configuration and Services for Prop Firm CRM
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.yourpropfirm.com';

class APIService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('auth_token');
  }

  // Authentication methods
  async login(credentials) {
    try {
      const response = await fetch(`${this.baseURL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });
      const data = await response.json();
      if (data.token) {
        localStorage.setItem('auth_token', data.token);
        this.token = data.token;
      }
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  // WordPress Integration
  async connectWordPress(config) {
    try {
      const response = await fetch(`${this.baseURL}/integrations/wordpress`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(config)
      });
      return await response.json();
    } catch (error) {
      console.error('WordPress integration error:', error);
      throw error;
    }
  }

  // PayPal Integration
  async processPayPalPayout(payoutData) {
    try {
      const response = await fetch(`${this.baseURL}/payouts/paypal`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(payoutData)
      });
      return await response.json();
    } catch (error) {
      console.error('PayPal payout error:', error);
      throw error;
    }
  }

  // Stripe Integration
  async processStripePayout(payoutData) {
    try {
      const response = await fetch(`${this.baseURL}/payouts/stripe`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(payoutData)
      });
      return await response.json();
    } catch (error) {
      console.error('Stripe payout error:', error);
      throw error;
    }
  }

  // MetaTrader 5 Integration
  async connectMT5(credentials) {
    try {
      const response = await fetch(`${this.baseURL}/integrations/mt5`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(credentials)
      });
      return await response.json();
    } catch (error) {
      console.error('MT5 connection error:', error);
      throw error;
    }
  }

  // Trading Account Management
  async getTraderAccounts() {
    try {
      const response = await fetch(`${this.baseURL}/accounts`, {
        headers: this.getHeaders()
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching accounts:', error);
      throw error;
    }
  }

  async getAccountAnalytics(accountId) {
    try {
      const response = await fetch(`${this.baseURL}/accounts/${accountId}/analytics`, {
        headers: this.getHeaders()
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching analytics:', error);
      throw error;
    }
  }

  // Risk Management
  async getRiskAlerts() {
    try {
      const response = await fetch(`${this.baseURL}/risk/alerts`, {
        headers: this.getHeaders()
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching risk alerts:', error);
      throw error;
    }
  }

  async updateRiskParameters(accountId, parameters) {
    try {
      const response = await fetch(`${this.baseURL}/accounts/${accountId}/risk`, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: JSON.stringify(parameters)
      });
      return await response.json();
    } catch (error) {
      console.error('Error updating risk parameters:', error);
      throw error;
    }
  }

  // Payout Management
  async getPayoutRequests() {
    try {
      const response = await fetch(`${this.baseURL}/payouts/requests`, {
        headers: this.getHeaders()
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching payout requests:', error);
      throw error;
    }
  }

  async approvePayoutRequest(requestId) {
    try {
      const response = await fetch(`${this.baseURL}/payouts/requests/${requestId}/approve`, {
        method: 'POST',
        headers: this.getHeaders()
      });
      return await response.json();
    } catch (error) {
      console.error('Error approving payout:', error);
      throw error;
    }
  }

  // Email Marketing Integration
  async sendEmailCampaign(campaignData) {
    try {
      const response = await fetch(`${this.baseURL}/marketing/email/send`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(campaignData)
      });
      return await response.json();
    } catch (error) {
      console.error('Error sending email campaign:', error);
      throw error;
    }
  }

  // Affiliate Management
  async getAffiliateData() {
    try {
      const response = await fetch(`${this.baseURL}/affiliates`, {
        headers: this.getHeaders()
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching affiliate data:', error);
      throw error;
    }
  }

  async generateAffiliateLink(affiliateId) {
    try {
      const response = await fetch(`${this.baseURL}/affiliates/${affiliateId}/link`, {
        method: 'POST',
        headers: this.getHeaders()
      });
      return await response.json();
    } catch (error) {
      console.error('Error generating affiliate link:', error);
      throw error;
    }
  }

  // Certificate Generation
  async generateCertificate(traderId, type) {
    try {
      const response = await fetch(`${this.baseURL}/certificates/generate`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ traderId, type })
      });
      return await response.json();
    } catch (error) {
      console.error('Error generating certificate:', error);
      throw error;
    }
  }

  // Notification Management
  async sendNotification(notificationData) {
    try {
      const response = await fetch(`${this.baseURL}/notifications/send`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(notificationData)
      });
      return await response.json();
    } catch (error) {
      console.error('Error sending notification:', error);
      throw error;
    }
  }

  // Webhook Management
  async registerWebhook(webhookData) {
    try {
      const response = await fetch(`${this.baseURL}/webhooks/register`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(webhookData)
      });
      return await response.json();
    } catch (error) {
      console.error('Error registering webhook:', error);
      throw error;
    }
  }

  // Helper methods
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json'
    };
    
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    
    return headers;
  }

  // WordPress specific methods
  async createWordPressPost(postData) {
    try {
      const response = await fetch(`${this.baseURL}/wordpress/posts`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(postData)
      });
      return await response.json();
    } catch (error) {
      console.error('Error creating WordPress post:', error);
      throw error;
    }
  }

  async getWordPressUsers() {
    try {
      const response = await fetch(`${this.baseURL}/wordpress/users`, {
        headers: this.getHeaders()
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching WordPress users:', error);
      throw error;
    }
  }

  // PayPal specific methods
  async getPayPalBalance() {
    try {
      const response = await fetch(`${this.baseURL}/paypal/balance`, {
        headers: this.getHeaders()
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching PayPal balance:', error);
      throw error;
    }
  }

  async getPayPalTransactions() {
    try {
      const response = await fetch(`${this.baseURL}/paypal/transactions`, {
        headers: this.getHeaders()
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching PayPal transactions:', error);
      throw error;
    }
  }
}

export default new APIService();