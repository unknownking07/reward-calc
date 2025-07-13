export default async function handler(req, res) {
  const FARCASTER_FRAME_ACCEPT = 'application/vnd.farcaster.frame';

  // 1. Check headers for valid Farcaster frame request
  if (req.method !== 'POST' || req.headers['accept'] !== FARCASTER_FRAME_ACCEPT) {
    return res.status(400).json({ error: 'Invalid frame request: missing required headers or wrong method' });
  }

  // 2. Simulate rank for now (hardcoded)
  const rank = 25;

  // 3. Calculate reward
  const tierInfo = getTierInfo(rank);
  const rewardText = tierInfo
    ? `Rank #${rank} - ${tierInfo.name}: $${tierInfo.prize.toFixed(2)} USDC`
    : `Rank #${rank} - No reward`;

  // 4. Send Farcaster Frame response
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({
    image: `https://reward-calc-kqvp.vercel.app/frame-image.png`,
    buttons: [
      { label: 'Try Again', action: 'post', target: 'https://reward-calc-kqvp.vercel.app/api/frame' }
    ],
    post_url: 'https://reward-calc-kqvp.vercel.app/api/frame',
    og_title: 'Your USDC Reward Result',
    og_description: rewardText
  });
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
