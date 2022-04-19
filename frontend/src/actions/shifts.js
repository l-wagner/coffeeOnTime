import { CREATE_ERROR, UPDATE_ERROR, CREATE_SHIFT, RETRIEVE_SHIFTS, UPDATE_SHIFT, DELETE_SHIFT, DELETE_ALL_SHIFTS, ERROR } from './types';
// import { compareAsc, format } from 'date-fns';

import ShiftDataService from '../services/shift.service.js';

export const createShift = (values) => async (dispatch) => {
  ShiftDataService.create(values)
    .then((result) => {
      if (result.payload.days) result.payload.days = result.payload.days.split(',');
      dispatch({
        type: CREATE_SHIFT,
        payload: result.payload,
      });
      return Promise.resolve(result.payload);
    })
    .catch((err) => {
      dispatch({ type: CREATE_ERROR, payload: { msg: err.response?.data?.msg || err.response?.data?.message, error: 'true' } });
      return Promise.reject(err);
    });
};

export const retrieveShifts = () => async (dispatch) => {
  try {
    const res = await ShiftDataService.getAll();

    dispatch({
      type: RETRIEVE_SHIFTS,
      payload: res.payload,
    });
  } catch (err) {
    dispatch({ type: ERROR, payload: { ...err, error: 'true ' } });
    return Promise.reject(err);
  }
};

export const updateShift = (id, data) => async (dispatch) => {
  try {
    const res = await ShiftDataService.update(id, data);
    dispatch({
      type: UPDATE_SHIFT,
      payload: data,
    });

    return Promise.resolve(res.payload);
  } catch (err) {
    dispatch({ type: UPDATE_ERROR, payload: { ...err, error: 'true' } });
    return Promise.reject(err);
  }
};
export const updateShiftDays = (id, data) => async (dispatch) => {
  try {
    const res = await ShiftDataService.update(id, data);

    dispatch({
      type: UPDATE_SHIFT,
      payload: data,
    });

    return Promise.resolve(res.payload);
  } catch (err) {
    dispatch({ type: UPDATE_ERROR, payload: { ...err, error: 'true' } });
    return Promise.reject(err);
  }
};
export const updateShiftTags = (id, data) => async (dispatch) => {
  try {
    const res = await ShiftDataService.updateTags(id, data);

    dispatch({
      type: UPDATE_SHIFT,
      payload: data,
    });

    return Promise.resolve(res.payload);
  } catch (err) {
    dispatch({ type: UPDATE_ERROR, payload: { ...err, error: 'true' } });
    return Promise.reject(err);
  }
};

export const deleteShift = (id) => async (dispatch) => {
  try {
    await ShiftDataService.delete(id);

    dispatch({
      type: DELETE_SHIFT,
      payload: { id },
    });
  } catch (err) {
    dispatch({ type: ERROR, payload: { ...err, error: 'true ' } });
    return Promise.reject(err);
  }
};

export const deleteAllShifts = () => async (dispatch) => {
  try {
    const res = await ShiftDataService.deleteAll();

    dispatch({
      type: DELETE_ALL_SHIFTS,
      payload: res.payload,
    });

    return Promise.resolve(res.payload);
  } catch (err) {
    dispatch({ type: ERROR, payload: { ...err, error: 'true ' } });
    return Promise.reject(err);
  }
};

export const findShiftsByName = (name) => async (dispatch) => {
  try {
    const res = await ShiftDataService.findByName(name);

    dispatch({
      type: RETRIEVE_SHIFTS,
      payload: res.payload,
    });
  } catch (err) {
    dispatch({ type: ERROR, payload: { ...err, error: 'true ' } });
    return Promise.reject(err);
  }
};
