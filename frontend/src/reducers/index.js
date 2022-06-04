import { combineReducers } from 'redux';
import employees from './employees.js';
import tags from './tags.js';
import business from './business.js';
import shifts from './shifts.js';
import schedules from './schedules.js';
import auth from './auth.reducer.js';
import rto from './rto.reducer.js';
import error from './error.reducer.js';

export default combineReducers({
  shifts,
  error,
  employees,
  tags,
  business,
  schedules,
  auth,
  rto,
});
