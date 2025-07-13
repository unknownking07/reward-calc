import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isInFarcasterFrame, setIsInFarcasterFrame] = useState(false);
  const [farcasterContext, setFarcasterContext] = useState(null);

  useEffect(() => {
    // Initialize Farcaster Mini App SDK
    const initializeFarcaster = async () => {
      try {
        // Check if we're in a mini app context
        if (typeof window !== 'undefined') {
          
          // Import the official Farcaster Mini App SDK
          const { sdk } = await import('@farcaster/miniapp-sdk');
          
          console.log('Farcaster SDK imported successfully');
          
          // Get context information
          const context = sdk.context;
          console.log('Farcaster context:', context);
          
          if (context) {
            setFarcasterContext(context);
            setIsInFarcasterFrame(true);
          }
          
          // This is the critical call - it hides the splash screen
          await sdk.actions.ready();
          console.log('Farcaster Mini App ready() called successfully!');
          
        }
      } catch (error) {
        console.log('Farcaster SDK not available or error occurred:', error);
        // This is normal when running outside of Farcaster
        
        // Still call ready in case we're in a frame but SDK had issues
        try {
          window.parent.postMessage({
            type: 'frame_ready',
            timestamp: Date.now()
          }, '*');
        } catch (e) {
          // Ignore errors for non-frame contexts
        }
      } finally {
        setIsLoading(false);
      }
    };

    // Add a small delay to ensure proper initialization
    const timer = setTimeout(initializeFarcaster, 100);
    return () => clearTimeout(timer);
  }, []);

  const calculateReward = () => {
    const rankInput = document.getElementById('rank');
    const resultDiv = document.getElementById('result');
    const rank = parseInt(rankInput.value);
    
    if (!rank || rank < 1 || rank > 3000) {
      resultDiv.innerHTML = '<div style="color: red;">Please enter a valid rank between 1 and 3000</div>';
      resultDiv.classList.add('show');
      return;
    }
    
    const tierInfo = getTierInfo(rank);
    
    if (tierInfo) {
      resultDiv.innerHTML = `
        <div style="color: #333;">
          <h3>Your Reward</h3>
          <p><strong>Rank #${rank}</strong></p>
          <p><strong>${tierInfo.name}</strong></p>
          <p style="color: #667eea; font-size: 24px; font-weight: bold;">$${tierInfo.prize.toFixed(2)} USDC</p>
          ${isInFarcasterFrame ? '<p style="color: #666; font-size: 12px;">✓ Calculated in Farcaster Mini App</p>' : ''}
          ${farcasterContext?.user ? `<p style="color: #666; font-size: 12px;">User: ${farcasterContext.user.displayName || 'Anonymous'}</p>` : ''}
        </div>
      `;
    } else {
      resultDiv.innerHTML = '<div style="color: #999;">Rank #' + rank + ' - No reward available</div>';
    }
    
    resultDiv.classList.add('show');
    
    // Send interaction event if we have the SDK
    if (isInFarcasterFrame && farcasterContext) {
      try {
        window.parent.postMessage({
          type: 'frame_interaction',
          action: 'calculate_reward',
          data: { rank, tierInfo },
          timestamp: Date.now()
        }, '*');
      } catch (e) {
        console.log('Could not send interaction event:', e);
      }
    }
  };

  const getTierInfo = (rank) => {
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
  };

  return (
    <>
      <Head>
        <title>Weekly Rank to $USDC</title>
        <meta name="description" content="Calculate your weekly USDC rewards based on your rank" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Farcaster Frame Meta Tags */}
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="https://reward-calc-kqvp.vercel.app/frame-image.png" />
        <meta property="fc:frame:button:1" content="Calculate Reward" />
        <meta property="fc:frame:button:1:action" content="post" />
        <meta property="fc:frame:button:1:target" content="https://reward-calc-kqvp.vercel.app/api/frame" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Weekly Rank to $USDC" />
        <meta property="og:description" content="Calculate your weekly USDC rewards based on your rank" />
        <meta property="og:image" content="https://reward-calc-kqvp.vercel.app/frame-image.png" />
        <meta property="og:url" content="https://reward-calc-kqvp.vercel.app" />
        
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        <h1>Weekly Rank to $USDC</h1>
        <p className="description">
          Calculate your weekly USDC rewards based on your rank
          {isInFarcasterFrame && (
            <span style={{ color: '#667eea', fontSize: '14px', display: 'block', marginTop: '5px' }}>
              ✓ Running in Farcaster Mini App
            </span>
          )}
          {isLoading && (
            <span style={{ color: '#999', fontSize: '14px', display: 'block', marginTop: '5px' }}>
              🔄 Initializing Farcaster SDK...
            </span>
          )}
        </p>
        
        <div className="input-group">
          <label htmlFor="rank">Enter your rank (1-3000):</label>
          <input
            type="number"
            id="rank"
            min="1"
            max="3000"
            placeholder="e.g., 25"
          />
        </div>
        
        <button className="calculate-btn" onClick={calculateReward} disabled={isLoading}>
          {isLoading ? 'Loading SDK...' : 'Calculate Reward'}
        </button>
        
        <div id="result" className="result-container"></div>
        
        <div className="tier-info">
          <h3>Reward Tiers</h3>
          <div className="tier-list">
            <div className="tier">Tier 1 (Rank 1-3): $600 USDC</div>
            <div className="tier">Tier 2 (Rank 4-10): $350 USDC</div>
            <div className="tier">Tier 3 (Rank 11-30): $125 USDC</div>
            <div className="tier">Tier 4 (Rank 31-80): $60 USDC</div>
            <div className="tier">Tier 5 (Rank 81-180): $30 USDC</div>
            <div className="tier">Tier 6 (Rank 181-380): $20 USDC</div>
            <div className="tier">Tier 7 (Rank 381-780): $10 USDC</div>
            <div className="tier">Tier 8 (Rank 781-1580): $5 USDC</div>
            <div className="tier">Tier 9 (Rank 1581-3000): $3 USDC</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        
        .container {
          background: white;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          max-width: 400px;
          width: 100%;
          text-align: center;
        }
        
        h1 {
          color: #333;
          margin-bottom: 30px;
          font-size: 28px;
        }
        
        .description {
          color: #666;
          margin-bottom: 30px;
          font-size: 16px;
          line-height: 1.5;
        }
        
        .input-group {
          margin-bottom: 20px;
          text-align: left;
        }
        
        label {
          display: block;
          margin-bottom: 8px;
          color: #333;
          font-weight: 600;
        }
        
        input {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e1e5e9;
          border-radius: 8px;
          font-size: 16px;
          transition: border-color 0.3s ease;
        }
        
        input:focus {
          outline: none;
          border-color: #667eea;
        }
        
        .calculate-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s ease;
          margin-bottom: 20px;
        }
        
        .calculate-btn:hover:not(:disabled) {
          transform: translateY(-2px);
        }
        
        .calculate-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        .result-container {
          margin-top: 20px;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 8px;
          display: none;
        }
        
        .result-container.show {
          display: block;
        }
        
        .tier-info {
          margin-top: 30px;
          text-align: left;
        }
        
        .tier-info h3 {
          color: #333;
          margin-bottom: 15px;
          text-align: center;
        }
        
        .tier-list {
          font-size: 14px;
        }
        
        .tier {
          padding: 8px 12px;
          margin-bottom: 5px;
          background: #f8f9fa;
          border-radius: 6px;
          color: #666;
        }
      `}</style>

      <style jsx global>{`
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
      `}</style>
    </>
  );
}