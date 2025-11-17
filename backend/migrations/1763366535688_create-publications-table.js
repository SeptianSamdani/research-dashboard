export const up = (pgm) => {
  pgm.createTable('publications', {
    id: {
      type: 'serial',
      primaryKey: true
    },
    doi: {
      type: 'text',
      notNull: true,
      unique: true
    },
    title: {
      type: 'text',
      notNull: true
    },
    abstract: {
      type: 'text'
    },
    authors: {
      type: 'jsonb'
    },
    publication_year: {
      type: 'integer'
    },
    journal_title: {
      type: 'text'
    },
    search_topic: {
      type: 'text',
      notNull: true
    },
    fetched_at: {
      type: 'timestamptz',
      notNull: true,
      default: pgm.func('NOW()')
    }
  });

  // Add indexes
  pgm.createIndex('publications', 'search_topic');
  pgm.createIndex('publications', 'publication_year');
};

export const down = (pgm) => {
  pgm.dropTable('publications');
};