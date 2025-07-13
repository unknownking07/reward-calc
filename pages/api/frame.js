export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Handle GET requests for frame metadata
  if (req.method === 'GET') {
    const frameHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Weekly Rank to $USDC Calculator</title>
          
          <!-- Farcaster Frame Meta Tags -->
          <meta property="fc:frame" content="vNext">
          <meta property="fc:frame:image" content="https://reward-calc-kqvp.vercel.app/frame-image.png">
          <meta property="fc:frame:button:1" content="Calculate Reward">
          <meta property="fc:frame:button:1:action" content="post">
          <meta property="fc:frame:button:1:target" content="https://reward-calc-kqvp.vercel.app/api/frame">
          <meta property="fc:frame:input:text" content="Enter your rank (1-3000)">
          
          <!-- Open Graph Meta Tags -->
          <meta property="og:title" content="Weekly Rank to $USDC">
          <meta property="og:description" content="Calculate your weekly USDC rewards based on your rank">
          <meta property="og:image" content="https://reward-calc-kqvp.vercel.app/frame-image.png">
          <meta property="og:url" content="https://reward-calc-kqvp.vercel.app">
        </head>
        <body>
          <h1>Weekly Rank to $USDC Calculator</h1>
          <p>This frame calculates your weekly USDC rewards based on your rank.</p>
        </body>
      </html>
    `;
    
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(frameHtml);
    return;
  }

  // Handle POST requests for frame interactions
  if (req.method === 'POST') {
    try {
      console.log('Frame POST request received:', req.body);
      
      // Extract rank from frame data or use default
      let rank = 25; // Default rank
      
      // Try to parse frame data if available
      if (req.body && req.body.untrustedData) {
        const buttonIndex = req.body.untrustedData.buttonIndex;
        const inputText = req.body.untrustedData.inputText;
        
        if (inputText && !isNaN(parseInt(inputText))) {
          rank = parseInt(inputText);
          rank = Math.max(1, Math.min(3000, rank)); // Clamp between 1 and 3000
        }
      }

      // Calculate reward
      const tierInfo = getTierInfo(rank);
      const rewardText = tierInfo
        ? `Rank #${rank} - ${tierInfo.name}: $${tierInfo.prize.toFixed(2)} USDC`
        : `Rank #${rank} - No reward available`;

      // Create a result image URL (you would typically generate this dynamically)
      const resultImageUrl = `https://reward-calc-kqvp.vercel.app/frame-image.png`;

      // Return proper frame response with updated meta tags
      const responseHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Your USDC Reward Result</title>
            
            <!-- Farcaster Frame Meta Tags -->
            <meta property="fc:frame" content="vNext">
            <meta property="fc:frame:image" content="${resultImageUrl}">
            <meta property="fc:frame:button:1" content="Try Again">
            <meta property="fc:frame:button:1:action" content="post">
            <meta property="fc:frame:button:1:target" content="https://reward-calc-kqvp.vercel.app/api/frame">
            <meta property="fc:frame:button:2" content="Visit App">
            <meta property="fc:frame:button:2:action" content="link">
            <meta property="fc:frame:button:2:target" content="https://reward-calc-kqvp.vercel.app">
            <meta property="fc:frame:input:text" content="Enter your rank (1-3000)">
            
            <!-- Open Graph Meta Tags -->
            <meta property="og:title" content="Your USDC Reward Result">
            <meta property="og:description" content="${rewardText}">
            <meta property="og:image" content="${resultImageUrl}">
            <meta property="og:url" content="https://reward-calc-kqvp.vercel.app">
          </head>
          <body>
            <h1>Your USDC Reward Result</h1>
            <p>${rewardText}</p>
          </body>
        </html>
      `;

      res.setHeader('Content-Type', 'text/html');
      res.status(200).send(responseHtml);
      
    } catch (error) {
      console.error('Error processing frame request:', error);
      res.status(500).json({ 
        error: 'Internal server error',
        message: error.message 
      });
    }
    return;
  }

  // Method not allowed
  res.setHeader('Allow', ['GET', 'POST', 'OPTIONS']);
  res.status(405).json({ error: 'Method not allowed' });
}

function getTierInfo(rank) {
  if (rank <= 3) return { name: 'Tier 1', prize: 600 };
  if (rank <= 10) return { name: 'Tier 2', prize: 350 };
  if (rank <= 30) return { name: 'Tier 3', prize: 125 };
  if (rank <= 80) return { name: 'Tier 4', prize: 60 };
  if (rank <= 180) return { name: 'Tier 5', prize: 30 };
  if (rank <= 380) return { name: 'Tier 6', prize: 20 };
  if (rank <= 780) return { name: 'Tier 7', prize: 10 };
  if (rank <= 1580) return { name: 'Tier 8', prize: 5 };
  if (rank <= 3000) return { name: 'Tier 9', prize: 3 };
  return null;
}
