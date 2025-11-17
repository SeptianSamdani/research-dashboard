import { exportToCSV } from '../services/exportService.js';

export const exportCSV = async (req, res) => {
  try {
    const { topic } = req.query;

    if (!topic) {
      return res.status(400).json({ 
        status: 'error', 
        message: 'Topic query parameter required' 
      });
    }

    // Get CSV data
    const csv = await exportToCSV(topic);

    // Set headers for file download
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="research-${topic.replace(/\s+/g, '-')}.csv"`);
    
    res.send(csv);

  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({ 
      status: 'error', 
      message: error.message 
    });
  }
};