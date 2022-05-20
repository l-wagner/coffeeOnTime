import { LOGIN, LOGOUT } from '../actions/types';

const initialState = [];

function authReducer(auth = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN: {
      console.log(payload);
      return payload;
    }

    case LOGOUT:
      return [];

    default:
      return [];
  }
}

export default authReducer;
