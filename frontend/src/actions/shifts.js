import { CREATE_SHIFT, RETRIEVE_SHIFTS, UPDATE_SHIFT, DELETE_SHIFT, DELETE_ALL_SHIFTS } from './types';

import ShiftDataService from '../services/tag.service';

export const createShift = (name, description) => async (dispatch) => {
  try {
    const res = await ShiftDataService.create({ name, description });

    dispatch({
      type: CREATE_SHIFT,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveShifts = () => async (dispatch) => {
  try {
    const res = await ShiftDataService.getAll();

    dispatch({
      type: RETRIEVE_SHIFTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateShift = (id, data) => async (dispatch) => {
  try {
    const res = await ShiftDataService.update(id, data);

    dispatch({
      type: UPDATE_SHIFT,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
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
    console.log(err);
  }
};

export const deleteAllShifts = () => async (dispatch) => {
  try {
    const res = await ShiftDataService.deleteAll();

    dispatch({
      type: DELETE_ALL_SHIFTS,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const findShiftsByName = (name) => async (dispatch) => {
  try {
    const res = await ShiftDataService.findByName(name);

    dispatch({
      type: RETRIEVE_SHIFTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
