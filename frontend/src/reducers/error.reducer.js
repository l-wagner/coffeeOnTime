// error.reducer.js

import { ERROR, UPDATE_ERROR } from '../actions/types';

const initState = null;

export default function errorReducer(state = initState, action) {
  const { type } = action;

  if (type === ERROR) {
    return { ...state, serverError: true };
  }

  if (type === UPDATE_ERROR) {
    return { ...state, updateError: true };
  }

  return initState;
}
