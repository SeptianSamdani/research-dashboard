import { fetchFromCrossref } from '../services/crossrefService.js';
import { savePublications } from '../services/dataService.js';

export const search = async (req, res) => {
  try {
    const { topic } = req.body;

    if (!topic || topic.length < 2) {
      return res.status(400).json({ 
        status: 'error', 
        message: 'Topic must be at least 2 characters' 
      });
    }

    // Fetch from Crossref
    const publications = await fetchFromCrossref(topic);

    // Save to database
    await savePublications(publications, topic);

    res.json({ 
      status: 'success', 
      message: `Ingested ${publications.length} publications`,
      count: publications.length
    });

  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ 
      status: 'error', 
      message: error.message 
    });
  }
};