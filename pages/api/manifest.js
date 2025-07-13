export default function handler(req, res) {
  // Set proper headers for the manifest
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  const manifest = {
    "accountAssociation": {
      "header": "eyJmaWQiOjI0MDQ4NiwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDc5OWZmRGFlYzM4QTg4MWI3OTNBQjE3QUYwOEI3RmE5Nzk0ZDE2QzMifQ",
      "payload": "eyJkb21haW4iOiJyZXdhcmQtY2FsYy1rcXZwLnZlcmNlbC5hcHAifQ",
      "signature": "MHg4MjAzYWIwNTdhOGUwMmU0NmU1ODVhZWE1ODk2NDRkOThjODJjMTVhNjY4ZTIzZGQ0M2MwYzc0NzdhYWNhOTI1NTYwMDVmODZlNjUwZWE3MDQyZDQ2NmJhMzE4MTg3ODNmNDc1YWRiY2FhZjc1MGRkMGI2NGZhMDJmMmY1M2Y0ODFi"
    },
    "miniapp": {
      "version": "1",
      "name": "Weekly Rank USDC Calculator",
      "iconUrl": "https://reward-calc-kqvp.vercel.app/icon-simple.svg",
      "homeUrl": "https://farcaster.xyz/miniapps/U-U53B-zNNUb/weekly-rank-usdc-calculator",
      "imageUrl": "https://reward-calc-kqvp.vercel.app/frame-image.png",
      "buttonTitle": "Calculate Rewards",
      "splashImageUrl": "https://reward-calc-kqvp.vercel.app/splash-logo.svg",
      "splashBackgroundColor": "#667eea",
      "description": "Calculate your weekly USDC rewards based on your Farcaster rank. Share your earnings with friends and climb the leaderboard!"
    }
  };

  res.status(200).json(manifest);
}