const algoliasearch = require('algoliasearch');
import { Config } from '../config/index';
const client = algoliasearch(Config.ALGOLIA_APP_ID, Config.ALGOLIA_SEARCH_KEY);
export const entriesIndex = client.initIndex('entries');
export const usersIndex = client.initIndex('users');

