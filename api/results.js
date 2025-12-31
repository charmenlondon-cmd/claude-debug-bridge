// API endpoint to receive results from Chrome Extension
const fs = require('fs').promises;
const path = require('path');

module.exports = async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const results = req.body;

      // Log results (Vercel logs that Claude can read)
      console.log('=== DEBUG RESULTS FROM CHROME EXTENSION ===');
      console.log(JSON.stringify(results, null, 2));
      console.log('==========================================');

      return res.status(200).json({
        success: true,
        message: 'Results received and logged!',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error processing results:', error);
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === 'GET') {
    // Return latest results (for Claude to read)
    return res.status(200).json({
      message: 'Debug bridge is running',
      timestamp: new Date().toISOString()
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
