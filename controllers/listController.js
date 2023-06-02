import { renderFile } from 'https://deno.land/x/eta@v2.0.0/mod.ts';
import * as listService from '../services/listService.js';
import * as listItemService from '../services/listItemService.js';
import * as requestUtils from '../utils/requestUtils.js';

const responseDetails = {
  headers: { 'Content-Type': 'text/html;charset=UTF-8' },
};

const addList = async (request) => {
  const formData = await request.formData();
  const name = formData.get('name');

  await listService.create(name);

  return requestUtils.redirectTo('/lists');
};

const viewLists = async (request) => {
  const data = {
    lists: await listService.findAllActiveLists(),
  };

  return new Response(
    await renderFile('shoppingLists.eta', data),
    responseDetails
  );
};

const viewList = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split('/');
  const itemies = await listItemService.findCurrentListItems(
    urlParts[2]
  );
  const data = {
    list: await listService.findById(urlParts[2]),
    listItems: itemies,
  };

  return new Response(
    await renderFile('list.eta', data),
    responseDetails
  );
};

const deactivateList = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split('/');
  await listService.completeById(urlParts[2]);

  return await requestUtils.redirectTo('/lists');
};

const getListStats = async (request) => {
  const stats = await listService.getStats();
  return new Response(
    await renderFile('main.eta', stats),
    responseDetails
  );
};

export { addList, viewLists, viewList, deactivateList, getListStats };
