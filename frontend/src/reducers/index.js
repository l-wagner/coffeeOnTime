import { combineReducers } from 'redux';
import employees from './employees.js';
import tags from './tags.js';
import business from './business.js';

export default combineReducers({
  employees,
  tags,
  business
});
