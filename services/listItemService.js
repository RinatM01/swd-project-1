import { sql } from '../database/database.js';

const createListItem = async (listId, name) => {
  await sql`INSERT INTO 
    shopping_list_items (shopping_list_id, name)
    VALUES (${listId}, ${name})`;
};

const findCurrentListItems = async (listId) => {
  const rows = await sql`SELECT * FROM shopping_list_items
    WHERE shopping_list_id = ${listId} ORDER BY name;`;

  if (rows && rows.length > 0) {
    return rows;
  }

  return false;
};

const collectListItem = async (id) => {
  await sql`UPDATE shopping_list_items
    SET collected = true WHERE id = ${id}`;
};

export { createListItem, findCurrentListItems, collectListItem };
