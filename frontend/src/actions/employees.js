import { UPDATE_ERROR, CREATE_EMPLOYEE, RETRIEVE_EMPLOYEES, UPDATE_EMPLOYEE, DELETE_EMPLOYEE, DELETE_ALL_EMPLOYEES, ERROR } from './types';

import EmployeeDataService from '../services/employee.service.js';

export const createEmployee = (values) => async (dispatch) => {
  values.tags = values.tags.join(',');
  values.blockedDays = values.blockedDays.join(',');

  const res = EmployeeDataService.create(values)
    .then((result) => {
      dispatch({
        type: CREATE_EMPLOYEE,
        payload: result.payload,
      });
      return Promise.resolve(res.payload);
    })
    .catch((err) => {
      dispatch({ type: ERROR, payload: { ...err, error: 'true ' } });
      return Promise.reject(err);
    });
};

export const retrieveEmployees = () => async (dispatch) => {
  try {
    const res = await EmployeeDataService.getAll();

    dispatch({
      type: RETRIEVE_EMPLOYEES,
      payload: res.payload,
    });
  } catch (err) {
    dispatch({ type: ERROR, payload: { ...err, error: 'true ' } });
    return Promise.reject(err);
  }
};

export const updateEmployee = (id, data) => async (dispatch) => {
  try {
    const res = await EmployeeDataService.updateDays(id, data);

    dispatch({
      type: UPDATE_EMPLOYEE,
      payload: data,
    });

    return Promise.resolve(res.payload);
  } catch (err) {
    dispatch({ type: UPDATE_ERROR, payload: { ...err, error: 'true' } });
    return Promise.reject(err);
  }
};
export const updateEmployeeDays = (id, data) => async (dispatch) => {
  try {
    const res = await EmployeeDataService.updateDays(id, data);

    dispatch({
      type: UPDATE_EMPLOYEE,
      payload: data,
    });

    return Promise.resolve(res.payload);
  } catch (err) {
    dispatch({ type: UPDATE_ERROR, payload: { ...err, error: 'true' } });
    return Promise.reject(err);
  }
};
export const updateEmployeeTags = (id, data) => async (dispatch) => {
  try {
    console.log(data);
    
    const res = await EmployeeDataService.updateTags(id, data);

    dispatch({
      type: UPDATE_EMPLOYEE,
      payload: data,
    });

    return Promise.resolve(res.payload);
  } catch (err) {
    dispatch({ type: UPDATE_ERROR, payload: { ...err, error: 'true' } });
    return Promise.reject(err);
  }
};

export const deleteEmployee = (id) => async (dispatch) => {
  try {
    await EmployeeDataService.delete(id);

    dispatch({
      type: DELETE_EMPLOYEE,
      payload: { id },
    });
  } catch (err) {
    dispatch({ type: ERROR, payload: { ...err, error: 'true ' } });
    return Promise.reject(err);
  }
};

export const deleteAllEmployees = () => async (dispatch) => {
  try {
    const res = await EmployeeDataService.deleteAll();

    dispatch({
      type: DELETE_ALL_EMPLOYEES,
      payload: res.payload,
    });

    return Promise.resolve(res.payload);
  } catch (err) {
    dispatch({ type: ERROR, payload: { ...err, error: 'true ' } });
    return Promise.reject(err);
  }
};

export const findEmployeesByName = (name) => async (dispatch) => {
  try {
    const res = await EmployeeDataService.findByName(name);

    dispatch({
      type: RETRIEVE_EMPLOYEES,
      payload: res.payload,
    });
  } catch (err) {
    dispatch({ type: ERROR, payload: { ...err, error: 'true ' } });
    return Promise.reject(err);
  }
};
