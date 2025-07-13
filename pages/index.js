import Head from 'next/head';
import { useState } from 'react';

export default function Home() {
  const [rank, setRank] = useState('');
  const [result, setResult] = useState('');
  const [showResult, setShowResult] = useState(false);

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

  const calculateReward = () => {
    const rankNum = parseInt(rank);
    
    if (!rankNum || rankNum < 1 || rankNum > 3000) {
      setResult('<div style="color: red;">Please enter a valid rank between 1 and 3000</div>');
      setShowResult(true);
      return;
    }
    
    const tierInfo = getTierInfo(rankNum);
    
    if (tierInfo) {
      setResult(`
        <div style="color: #333;">
          <h3>Your Reward</h3>
          <p><strong>Rank #${rankNum}</strong></p>
          <p><strong>${tierInfo.name}</strong></p>
          <p style="color: #667eea; font-size: 24px; font-weight: bold;">$${tierInfo.prize.toFixed(2)} USDC</p>
        </div>
      `);
    } else {
      setResult(`<div style="color: #999;">Rank #${rankNum} - No reward available</div>`);
    }
    
    setShowResult(true);
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
        </p>
        
        <div className="input-group">
          <label htmlFor="rank">Enter your rank (1-3000):</label>
          <input
            type="number"
            id="rank"
            min="1"
            max="3000"
            placeholder="e.g., 25"
            value={rank}
            onChange={(e) => setRank(e.target.value)}
          />
        </div>
        
        <button className="calculate-btn" onClick={calculateReward}>
          Calculate Reward
        </button>
        
        {showResult && (
          <div className={`result-container ${showResult ? 'show' : ''}`}>
            <div dangerouslySetInnerHTML={{ __html: result }} />
          </div>
        )}
        
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
          line-height: 1.6;
        }
        
        .input-group {
          margin-bottom: 20px;
        }
        
        label {
          display: block;
          margin-bottom: 10px;
          color: #333;
          font-weight: 500;
        }
        
        input {
          width: 100%;
          padding: 15px;
          border: 2px solid #e0e0e0;
          border-radius: 10px;
          font-size: 16px;
          transition: border-color 0.3s ease;
        }
        
        input:focus {
          outline: none;
          border-color: #667eea;
        }
        
        .calculate-btn {
          width: 100%;
          padding: 15px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          margin-bottom: 20px;
        }
        
        .calculate-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }
        
        .result-container {
          margin: 20px 0;
          padding: 20px;
          background: #f8f9ff;
          border-radius: 10px;
          border: 2px solid #e0e0e0;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.3s ease;
        }
        
        .result-container.show {
          opacity: 1;
          transform: translateY(0);
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
          background: #f8f9ff;
          border-radius: 10px;
          padding: 20px;
        }
        
        .tier {
          padding: 8px 0;
          border-bottom: 1px solid #e0e0e0;
          color: #555;
        }
        
        .tier:last-child {
          border-bottom: none;
        }
        
        @media (max-width: 480px) {
          .container {
            padding: 20px;
            margin: 10px;
          }
          
          h1 {
            font-size: 24px;
          }
          
          .calculate-btn {
            font-size: 16px;
          }
        }
      `}</style>
    </>
  );
}