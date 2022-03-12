// error.reducer.js

import { ERROR } from "../actions/types";

const initState = null;

export default function errorReducer(state = initState, action) {
  const { type } = action;

  if (type === ERROR) {

    return true;
  }

  return state;
}
