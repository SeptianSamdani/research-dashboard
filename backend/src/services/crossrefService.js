import axios from 'axios';

export const fetchFromCrossref = async (topic, rows = 50) => {
  const url = process.env.CROSSREF_API_URL;
  const email = process.env.CROSSREF_EMAIL;

  try {
    const response = await axios.get(url, {
      params: {
        query: topic,
        rows: rows,
        mailto: email
      },
      timeout: 30000
    });

    const items = response.data.message.items || [];

    return items.map(item => ({
      doi: item.DOI || null,
      title: item.title?.[0] || 'No title',
      abstract: item.abstract || null,
      authors: item.author || [],
      publication_year: item.published?.['date-parts']?.[0]?.[0] || null,
      journal_title: item['container-title']?.[0] || null
    }));

  } catch (error) {
    throw new Error(`Crossref API error: ${error.message}`);
  }
};