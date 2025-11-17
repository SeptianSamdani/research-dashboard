import { getAnalyticsData } from '../services/analysisService.js';

export const getDashboardData = async (req, res) => {
  try {
    const { topic } = req.query;

    if (!topic) {
      return res.status(400).json({ 
        status: 'error', 
        message: 'Topic query parameter required' 
      });
    }

    const data = await getAnalyticsData(topic);

    res.json(data);

  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ 
      status: 'error', 
      message: error.message 
    });
  }
};