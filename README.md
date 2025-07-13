# Weekly Rank to $USDC Calculator - Farcaster Frame

A Next.js application that calculates weekly USDC rewards based on your rank, designed as a Farcaster Frame mini app.

## Features

- 🎯 **Interactive Farcaster Frame**: Works seamlessly within Farcaster clients
- 💰 **Reward Calculator**: Calculate USDC rewards based on rank tiers
- 🚀 **Next.js Powered**: Modern React framework optimized for performance
- 📱 **Responsive Design**: Works on all devices
- ⚡ **Vercel Ready**: Optimized for deployment on Vercel

## Reward Tiers

| Tier | Rank Range | Reward |
|------|------------|---------|
| Tier 1 | 1-3 | $600 USDC |
| Tier 2 | 4-10 | $350 USDC |
| Tier 3 | 11-30 | $125 USDC |
| Tier 4 | 31-80 | $60 USDC |
| Tier 5 | 81-180 | $30 USDC |
| Tier 6 | 181-380 | $20 USDC |
| Tier 7 | 381-780 | $10 USDC |
| Tier 8 | 781-1580 | $5 USDC |
| Tier 9 | 1581-3000 | $3 USDC |

## Development

### Prerequisites

- Node.js 16.0.0 or higher
- npm or yarn

### Installation

```bash
npm install
```

### Running Locally

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

### Deployment

This app is configured for deployment on Vercel:

```bash
npm run deploy
```

Or connect your GitHub repository to Vercel for automatic deployments.

## API Endpoints

### `GET /api/frame`
Returns the frame metadata for Farcaster clients.

### `POST /api/frame`
Handles frame interactions and calculates rewards based on user input.

## Frame Integration

This application works as a Farcaster Frame by:

1. **Metadata**: Serving proper frame metadata tags
2. **Interactions**: Handling POST requests from Farcaster clients
3. **Responses**: Returning structured frame responses with buttons and images

## Technologies Used

- **Next.js 14**: React framework for production
- **React 18**: JavaScript library for user interfaces
- **Vercel**: Deployment platform
- **CSS-in-JS**: Styled JSX for component styling

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the maintainer.