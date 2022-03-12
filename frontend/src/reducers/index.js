import { combineReducers } from 'redux';
import employees from './employees.js';
import tags from './tags.js';
import business from './business.js';
import error from './error.reducer.js';

export default combineReducers({
  error,
  employees,
  tags,
  business,
});
