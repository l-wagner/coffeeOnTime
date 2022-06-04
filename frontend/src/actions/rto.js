import { CREATE_RTO, RETRIEVE_RTOS, UPDATE_RTO, DELETE_RTO, DELETE_ALL_RTOS } from './types';


import employeeService from '../services/employee.service';

export const submitRTORequest = (values) => async (dispatch) => {
  try {
    console.log(values);
    const res = await employeeService.requestRto(values);

    dispatch({
      type: CREATE_RTO,
      payload: res.payload,
    });

    return Promise.resolve(res.payload);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveTags = (businessId) => async (dispatch) => {
  try {
    const res = await employeeService.getAllByBusiness(businessId);
    dispatch({
      type: RETRIEVE_RTOS,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateTag = (data) => async (dispatch) => {
  try {
    const res = await employeeService.update(data);

    dispatch({
      type: UPDATE_RTO,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteTag = (id) => async (dispatch) => {
  try {
    await employeeService.delete(id);

    dispatch({
      type: DELETE_RTO,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteAllTags = () => async (dispatch) => {
  try {
    const res = await employeeService.deleteAll();

    dispatch({
      type: DELETE_ALL_RTOS,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const findTagsByName = (name) => async (dispatch) => {
  try {
    const res = await employeeService.findByName(name);

    dispatch({
      type: RETRIEVE_RTOS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
