import { combineReducers } from 'redux';
import employees from './employees.js';
import tags from './tags.js';

export default combineReducers({
  employees,
  tags,
});
