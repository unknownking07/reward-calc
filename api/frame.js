export default function handler(req, res) {
  const { method } = req;
  
  if (method === 'GET') {
    // Return frame metadata
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>USDC Rank Calculator</title>
          
          <!-- Farcaster Frame Meta Tags -->
          <meta property="fc:frame" content="vNext">
          <meta property="fc:frame:image" content="https://your-domain.vercel.app/frame-image.png">
          <meta property="fc:frame:button:1" content="Calculate Reward">
          <meta property="fc:frame:button:1:action" content="link">
          <meta property="fc:frame:button:1:target" content="https://your-domain.vercel.app">
          
          <!-- Open Graph Meta Tags -->
          <meta property="og:title" content="USDC Rank Calculator">
          <meta property="og:description" content="Calculate your USDC rewards based on your rank">
          <meta property="og:image" content="https://your-domain.vercel.app/frame-image.png">
          
          <script>
            window.location.href = '/';
          </script>
        </head>
        <body>
          <p>Redirecting to USDC Rank Calculator...</p>
        </body>
      </html>
    `;
    
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } else if (method === 'POST') {
    // Handle frame interactions
    res.status(200).json({ message: 'Frame interaction received' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}