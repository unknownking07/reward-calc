"use strict";(()=>{var e={};e.id=905,e.ids=[905],e.modules={145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},249:(e,t)=>{Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,r){return r in t?t[r]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,r)):"function"==typeof t&&"default"===r?t:void 0}}})},465:(e,t,r)=>{r.r(t),r.d(t,{config:()=>s,default:()=>l,routeModule:()=>c});var a={};r.r(a),r.d(a,{default:()=>i});var n=r(802),o=r(153),p=r(249);async function i(e,t){if(t.setHeader("Access-Control-Allow-Origin","*"),t.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, OPTIONS"),t.setHeader("Access-Control-Allow-Headers","Content-Type, Authorization"),"OPTIONS"===e.method){t.status(200).end();return}if("GET"===e.method){let e=`
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
    `;t.setHeader("Content-Type","text/html"),t.status(200).send(e);return}if("POST"===e.method){try{var r;console.log("Frame POST request received:",e.body);let a=25;if(e.body&&e.body.untrustedData){e.body.untrustedData.buttonIndex;let t=e.body.untrustedData.inputText;t&&!isNaN(parseInt(t))&&(a=parseInt(t),a=Math.max(1,Math.min(3e3,a)))}let n=(r=a)<=3?{name:"Tier 1",prize:600}:r<=10?{name:"Tier 2",prize:350}:r<=30?{name:"Tier 3",prize:125}:r<=80?{name:"Tier 4",prize:60}:r<=180?{name:"Tier 5",prize:30}:r<=380?{name:"Tier 6",prize:20}:r<=780?{name:"Tier 7",prize:10}:r<=1580?{name:"Tier 8",prize:5}:r<=3e3?{name:"Tier 9",prize:3}:null,o=n?`Rank #${a} - ${n.name}: $${n.prize.toFixed(2)} USDC`:`Rank #${a} - No reward available`;t.setHeader("Content-Type","application/json"),t.status(200).json({type:"frame",version:"vNext",image:"https://reward-calc-kqvp.vercel.app/frame-image.png",buttons:[{label:"Try Again",action:"post",target:"https://reward-calc-kqvp.vercel.app/api/frame"},{label:"Visit App",action:"link",target:"https://reward-calc-kqvp.vercel.app"}],input:{text:"Enter your rank (1-3000)"},post_url:"https://reward-calc-kqvp.vercel.app/api/frame",og:{title:"Your USDC Reward Result",description:o,image:"https://reward-calc-kqvp.vercel.app/frame-image.png"}})}catch(e){console.error("Error processing frame request:",e),t.status(500).json({error:"Internal server error",message:e.message})}return}t.setHeader("Allow",["GET","POST","OPTIONS"]),t.status(405).json({error:"Method not allowed"})}let l=(0,p.l)(a,"default"),s=(0,p.l)(a,"config"),c=new n.PagesAPIRouteModule({definition:{kind:o.x.PAGES_API,page:"/api/frame",pathname:"/api/frame",bundlePath:"",filename:""},userland:a})},153:(e,t)=>{var r;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return r}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(r||(r={}))},802:(e,t,r)=>{e.exports=r(145)}};var t=require("../../webpack-api-runtime.js");t.C(e);var r=t(t.s=465);module.exports=r})();