import { CREATE_BUSINESS, RETRIEVE_BUSINESSS, UPDATE_BUSINESS, DELETE_BUSINESS, DELETE_ALL_BUSINESSS } from './types';

import BusinessDataService from '../services/business.service';

export const createBusiness = (values) => async (dispatch) => {
  try {
    console.log(values);
    const res = await BusinessDataService.create({...values });

    dispatch({
      type: CREATE_BUSINESS,
      payload: res.data,
    });

    return Promise.resolve('res.data');
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveBusiness = () => async (dispatch) => {
  try {
    const res = await BusinessDataService.getAll();
    console.log(res.data);

    dispatch({
      type: RETRIEVE_BUSINESSS,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err);
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
    console.log(err);
  }
};

export const deleteAllBusinesss = () => async (dispatch) => {
  try {
    const res = await BusinessDataService.deleteAll();

    dispatch({
      type: DELETE_ALL_BUSINESSS,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const findBusinesssByName = (name) => async (dispatch) => {
  try {
    const res = await BusinessDataService.findByName(name);

    dispatch({
      type: RETRIEVE_BUSINESSS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
