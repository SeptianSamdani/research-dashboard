import pool from '../config/database.js';

const STOPWORDS = ['the', 'a', 'an', 'in', 'on', 'of', 'and', 'to', 'is', 'for', 'with', 'as', 'by', 'at', 'from', 'that', 'this', 'it', 'are', 'be', 'was', 'were'];

export const getAnalyticsData = async (topic) => {
  // Get trend data
  const trendQuery = `
    SELECT publication_year as year, COUNT(*) as count
    FROM publications
    WHERE search_topic = $1 AND publication_year IS NOT NULL
    GROUP BY publication_year
    ORDER BY publication_year
  `;
  const trendResult = await pool.query(trendQuery, [topic]);

  // Get articles
  const articlesQuery = `
    SELECT title, authors, publication_year, journal_title
    FROM publications
    WHERE search_topic = $1
    ORDER BY publication_year DESC
    LIMIT 20
  `;
  const articlesResult = await pool.query(articlesQuery, [topic]);

  // Get keywords from abstracts
  const keywordsQuery = `
    SELECT abstract
    FROM publications
    WHERE search_topic = $1 AND abstract IS NOT NULL
  `;
  const keywordsResult = await pool.query(keywordsQuery, [topic]);

  const keywords = extractKeywords(keywordsResult.rows);

  return {
    trendData: trendResult.rows,
    keywords,
    articles: articlesResult.rows
  };
};

const extractKeywords = (rows) => {
  const wordCount = {};

  rows.forEach(row => {
    if (!row.abstract) return;

    const words = row.abstract
      .toLowerCase()
      .replace(/[^a-z\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 3 && !STOPWORDS.includes(word));

    words.forEach(word => {
      wordCount[word] = (wordCount[word] || 0) + 1;
    });
  });

  return Object.entries(wordCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([text, value]) => ({ text, value }));
};