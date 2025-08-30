# Prop Firm CRM System

A comprehensive Customer Relationship Management (CRM) system specifically designed for proprietary trading firms. This system provides complete management of traders, accounts, risk assessment, payouts, and integrations with popular platforms like WordPress, PayPal, and MetaTrader 5.

## Features

### 🏢 Core CRM Functionality
- **Dashboard Overview**: Real-time analytics and key metrics
- **Accounts Analytics**: Comprehensive trader performance monitoring
- **Trader Area**: Dedicated space for client account management
- **Back-Office Management**: Automated administrative tools

### 📊 Advanced Analytics
- Real-time trading performance metrics
- Risk assessment and monitoring
- Profit/loss tracking and reporting
- Custom KPI dashboards

### 💰 Payout Management
- Automated payout processing
- Multiple payment methods (PayPal, Stripe, Bank Transfer, Crypto)
- Payout request approval workflow
- Transaction history and reporting

### 🛡️ Risk Management
- Real-time risk monitoring
- Automated risk alerts and notifications
- Customizable risk parameters
- Violation tracking and reporting

### 🔗 Integrations
- **WordPress**: Complete website integration
- **PayPal**: Secure payment processing
- **Stripe**: Credit card and subscription management
- **MetaTrader 5**: Real-time trading data
- **Email Marketing**: Automated campaigns
- **Affiliate System**: Commission tracking

### 📧 Communication
- Multi-channel notifications (Email, SMS, In-App)
- Automated email campaigns
- Real-time alerts and updates
- Certificate generation system

## Technology Stack

- **Frontend**: React 18, Tailwind CSS, Framer Motion
- **Icons**: React Icons (Feather Icons)
- **Routing**: React Router DOM v7
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom components

## Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd prop-firm-crm
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Build for production**
```bash
npm run build
```

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=https://api.yourpropfirm.com
REACT_APP_WORDPRESS_URL=https://yoursite.com
REACT_APP_PAYPAL_CLIENT_ID=your_paypal_client_id
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
REACT_APP_MT5_SERVER_URL=ws://localhost:8080/mt5
REACT_APP_MAILCHIMP_API_KEY=your_mailchimp_api_key
```

### API Integration

The system includes comprehensive API integration utilities:

- **WordPress Integration**: User management, content creation
- **PayPal Integration**: Payout processing, transaction management
- **Stripe Integration**: Payment processing, subscription management
- **MT5 Integration**: Real-time trading data via WebSocket
- **Email Marketing**: Campaign management and automation

## Usage

### Dashboard
Access the main dashboard to view:
- Total traders and active accounts
- Monthly growth metrics
- Recent activity feed
- Quick action buttons

### Accounts Analytics
Monitor trader performance with:
- Individual account analytics
- Profit/loss tracking
- Trading activity metrics
- Performance rankings

### Risk Management
Manage trading risks through:
- Real-time risk alerts
- Parameter configuration
- Violation tracking
- Automated responses

### Payout Processing
Handle trader payouts via:
- Request review and approval
- Multiple payment methods
- Automated processing
- Transaction tracking

### Integrations
Connect with external services:
- WordPress website integration
- Payment gateway setup
- Trading platform connections
- Marketing automation tools

## API Endpoints

### Authentication
- `POST /auth/login` - User authentication
- `POST /auth/refresh` - Token refresh

### Accounts
- `GET /accounts` - List all trader accounts
- `GET /accounts/:id/analytics` - Account analytics
- `PUT /accounts/:id/risk` - Update risk parameters

### Payouts
- `GET /payouts/requests` - List payout requests
- `POST /payouts/requests/:id/approve` - Approve payout
- `POST /payouts/paypal` - Process PayPal payout
- `POST /payouts/stripe` - Process Stripe payout

### Risk Management
- `GET /risk/alerts` - Get risk alerts
- `POST /risk/parameters` - Update risk parameters

### Integrations
- `POST /integrations/wordpress` - Connect WordPress
- `POST /integrations/mt5` - Connect MetaTrader 5
- `POST /webhooks/register` - Register webhook

## Customization

### Adding New Components
1. Create component in `src/components/`
2. Add route in `src/App.jsx`
3. Update navigation in `src/components/layout/Sidebar.jsx`

### Styling
- Use Tailwind CSS classes for styling
- Custom styles in `src/App.css`
- Theme configuration in `tailwind.config.js`

### API Integration
- Add new API methods in `src/services/api.js`
- Create integration helpers in `src/utils/integrations.js`

## Security Considerations

- Implement proper authentication and authorization
- Use HTTPS for all API communications
- Secure API keys and credentials
- Implement rate limiting
- Regular security audits

## Performance Optimization

- Lazy loading for route components
- Image optimization
- API response caching
- Bundle size optimization with Vite

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is proprietary software. All rights reserved.

## Support

For support and questions:
- Email: support@yourpropfirm.com
- Documentation: https://docs.yourpropfirm.com
- Issues: Create an issue in this repository

## Roadmap

### Upcoming Features
- Mobile application
- Advanced reporting tools
- AI-powered risk assessment
- Multi-language support
- Advanced affiliate management
- Integration with more trading platforms

### Version History
- v1.0.0 - Initial release with core CRM functionality
- v1.1.0 - Added PayPal and Stripe integrations
- v1.2.0 - Enhanced risk management features
- v1.3.0 - WordPress integration and affiliate system