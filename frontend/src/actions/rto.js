import { CREATE_RTO, RETRIEVE_RTOS, UPDATE_RTO, DELETE_RTO, DELETE_ALL_RTOS } from './types';
import dayjs from 'dayjs';
import TagDataService from '../services/tag.service';

export const submitRTORequest = (values) => async (dispatch) => {
  try {
    const res = await TagDataService.create(values);

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
    const res = await TagDataService.getAllByBusiness(businessId);
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
    const res = await TagDataService.update(data);

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
    await TagDataService.delete(id);

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
    const res = await TagDataService.deleteAll();

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
    const res = await TagDataService.findByName(name);

    dispatch({
      type: RETRIEVE_RTOS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
