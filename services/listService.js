import { sql } from '../database/database.js';

const create = async (name) => {
  await sql`INSERT INTO shopping_lists (name) VALUES (${name})`;
};

const findAllActiveLists = async () => {
  return await sql`SELECT * FROM shopping_lists WHERE active = true`;
};

const findById = async (id) => {
  const rows =
    await sql`SELECT * FROM shopping_lists WHERE id = ${id}`;

  if (rows && rows.length > 0) {
    return rows[0];
  }

  return { id: 0, name: 'Unknown' };
};

const completeById = async (id) => {
  await sql`UPDATE shopping_lists SET active = false WHERE id = ${id}`;
};

const getStats = async () => {
  const nListItems = await sql`SELECT COUNT(*) AS entry_count
  FROM shopping_list_items;`;
  const nLists = await sql`SELECT COUNT(*) AS entry_count
  FROM shopping_lists;`;
  if (
    nListItems &&
    nLists &&
    nListItems.length > 0 &&
    nLists.length > 0
  ) {
    return {
      listItems: nListItems[0].entry_count,
      lists: nLists[0].entry_count,
    };
  }
  return { id: 0, name: 'Unknown' };
};

export {
  create,
  findAllActiveLists,
  findById,
  completeById,
  getStats,
};
