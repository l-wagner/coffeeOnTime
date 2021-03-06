import { ERROR, CREATE_BUSINESS, RETRIEVE_BUSINESS, UPDATE_BUSINESS, DELETE_BUSINESS, DELETE_ALL_BUSINESS } from './types';

import BusinessDataService from '../services/business.service';

export const createBusiness = (values) => async (dispatch) => {
  try {
    const res = await BusinessDataService.create({ ...values });
    dispatch({
      type: CREATE_BUSINESS,
      payload: res.payload,
    });
    return Promise.resolve(res.payload);
  } catch (err) {
    dispatch({ type: ERROR, payload: { ...err, error: 'true ' } });
    return Promise.reject(err);
  }
};

export const retrieveBusiness = (id) => async (dispatch) => {
  try {
    const res = await BusinessDataService.get(id);
    dispatch({
      type: RETRIEVE_BUSINESS,
      payload: res.payload,
    });
  } catch (err) {
    dispatch({ type: ERROR, payload: { ...err, error: 'true ' } });
    return Promise.reject(err);
  }
};

export const updateBusiness = (id, data) => async (dispatch) => {
  try {
    const res = await BusinessDataService.update(id, data);

    dispatch({
      type: UPDATE_BUSINESS,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    dispatch({ type: ERROR, payload: { ...err, error: 'true ' } });

    return Promise.reject(err);
  }
};

export const deleteBusiness = (id) => async (dispatch) => {
  try {
    await BusinessDataService.delete(id);

    dispatch({
      type: DELETE_BUSINESS,
      payload: { id },
    });
  } catch (err) {
    dispatch({ type: ERROR, payload: { ...err, error: 'true ' } });
    return Promise.reject(err);
  }
};

export const deleteAllBusiness = () => async (dispatch) => {
  try {
    const res = await BusinessDataService.deleteAll();

    dispatch({
      type: DELETE_ALL_BUSINESS,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    dispatch({ type: ERROR, payload: { ...err, error: 'true ' } });

    return Promise.reject(err);
  }
};

export const findBusinessByName = (name) => async (dispatch) => {
  try {
    const res = await BusinessDataService.findByName(name);

    dispatch({
      type: RETRIEVE_BUSINESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: ERROR, payload: { ...err, error: 'true ' } });
    return Promise.reject(err);
  }
};
