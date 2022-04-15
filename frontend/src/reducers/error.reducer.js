// error.reducer.js

import { ERROR, UPDATE_ERROR, CREATE_ERROR } from '../actions/types';

const initState = null;

export default function errorReducer(state = initState, action) {
  const { type, payload } = action;

  if (type === ERROR) {
    return { ...state, serverError: true };
  }

  if (type === UPDATE_ERROR) {
    return { ...state, updateError: true };
  }

  if (type === CREATE_ERROR) {
    return { ...state, createError: true, msg: payload.msg };
  }

  return initState;
}
