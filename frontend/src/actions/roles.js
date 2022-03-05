import { CREATE_ROLE, RETRIEVE_ROLES, UPDATE_ROLE, DELETE_ROLE, DELETE_ALL_ROLES } from './types';

import RoleDataService from '../services/tag.service';

export const createRole = (name, description) => async (dispatch) => {
  try {
    const res = await RoleDataService.create({ name, description });

    dispatch({
      type: CREATE_ROLE,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveRoles = () => async (dispatch) => {
  try {
    const res = await RoleDataService.getAll();
    console.log(res.data);

    dispatch({
      type: RETRIEVE_ROLES,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateRole = (id, data) => async (dispatch) => {
  try {
    const res = await RoleDataService.update(id, data);

    dispatch({
      type: UPDATE_ROLE,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteRole = (id) => async (dispatch) => {
  try {
    await RoleDataService.delete(id);

    dispatch({
      type: DELETE_ROLE,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteAllRoles = () => async (dispatch) => {
  try {
    const res = await RoleDataService.deleteAll();

    dispatch({
      type: DELETE_ALL_ROLES,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const findRolesByName = (name) => async (dispatch) => {
  try {
    const res = await RoleDataService.findByName(name);

    dispatch({
      type: RETRIEVE_ROLES,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
