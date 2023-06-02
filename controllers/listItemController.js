import * as listItemService from '../services/listItemService.js';
import * as requestUtils from '../utils/requestUtils.js';

const createListItem = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split('/');
  const formData = await request.formData();
  const name = formData.get('name');

  await listItemService.createListItem(urlParts[2], name);

  return requestUtils.redirectTo(`/lists/${urlParts[2]}`);
};

const collectListItem = async (req) => {
  const url = new URL(req.url);
  const urlParts = url.pathname.split('/');
  await listItemService.collectListItem(urlParts[4]);
  return requestUtils.redirectTo(`/lists/${urlParts[2]}`);
};

export { createListItem, collectListItem };
