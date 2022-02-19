import { combineReducers } from 'redux';
import employees from './employees';
import roles from './roles';

export default combineReducers({
  employees,
  roles,
});
