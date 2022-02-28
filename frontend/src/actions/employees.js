import { CREATE_EMPLOYEE, RETRIEVE_EMPLOYEES, UPDATE_EMPLOYEE, DELETE_EMPLOYEE, DELETE_ALL_EMPLOYEES } from './types';

import EmployeeDataService from '../services/employee.service';

export const createEmployee = (name, blockedDays, roles) => async (dispatch) => {
  try {
    const res = await EmployeeDataService.create({ name, blockedDays, roles });

    dispatch({
      type: CREATE_EMPLOYEE,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveEmployees = () => async (dispatch) => {
  try {
    const res = await EmployeeDataService.getAll();

    dispatch({
      type: RETRIEVE_EMPLOYEES,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateEmployee = (id, data) => async (dispatch) => {
  try {
    const res = await EmployeeDataService.update(id, data);

    dispatch({
      type: UPDATE_EMPLOYEE,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
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
    console.log(err);
  }
};

export const deleteAllEmployees = () => async (dispatch) => {
  try {
    const res = await EmployeeDataService.deleteAll();

    dispatch({
      type: DELETE_ALL_EMPLOYEES,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const findEmployeesByName = (name) => async (dispatch) => {
  try {
    const res = await EmployeeDataService.findByName(name);

    dispatch({
      type: RETRIEVE_EMPLOYEES,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
