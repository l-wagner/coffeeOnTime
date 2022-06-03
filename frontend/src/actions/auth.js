import { LOGIN_ERROR, LOGIN, LOGOUT } from './types';

import AuthService from '../services/auth.service';

export const login = (values) => async (dispatch) => {
  try {
    const res = await AuthService.login({ ...values });
    console.log(res.payload);
    dispatch({
      type: LOGIN,
      payload: res.payload,
    });
    return Promise.resolve(res.payload);
  } catch (err) {
    dispatch({ type: LOGIN_ERROR, payload: { msg: err.payload.message, error: 'true ' } });
    return Promise.reject(err);
  }
};

export const logout = () => async (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
