import { Parser } from 'json2csv';
import pool from '../config/database.js';

export const exportToCSV = async (topic) => {
  try {
    // Get all articles for the topic
    const query = `
      SELECT 
        title,
        publication_year,
        journal_title,
        doi,
        abstract
      FROM publications
      WHERE search_topic = $1
      ORDER BY publication_year DESC
    `;
    
    const result = await pool.query(query, [topic]);

    if (result.rows.length === 0) {
      throw new Error('No data found for this topic');
    }

    // Define CSV fields
    const fields = [
      { label: 'Title', value: 'title' },
      { label: 'Year', value: 'publication_year' },
      { label: 'Journal', value: 'journal_title' },
      { label: 'DOI', value: 'doi' },
      { label: 'Abstract', value: 'abstract' }
    ];

    // Convert to CSV
    const parser = new Parser({ fields });
    const csv = parser.parse(result.rows);

    return csv;

  } catch (error) {
    throw new Error(`Export error: ${error.message}`);
  }
};