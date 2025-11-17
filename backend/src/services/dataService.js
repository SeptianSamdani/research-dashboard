import pool from '../config/database.js';

export const savePublications = async (publications, topic) => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');

    let inserted = 0;

    for (const pub of publications) {
      if (!pub.doi) continue; // Skip if no DOI

      const query = `
        INSERT INTO publications (doi, title, abstract, authors, publication_year, journal_title, search_topic)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (doi) DO NOTHING
      `;

      const result = await client.query(query, [
        pub.doi,
        pub.title,
        pub.abstract,
        JSON.stringify(pub.authors),
        pub.publication_year,
        pub.journal_title,
        topic
      ]);

      if (result.rowCount > 0) inserted++;
    }

    await client.query('COMMIT');
    
    return inserted;

  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};