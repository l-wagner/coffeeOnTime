import { CREATE_TAG, RETRIEVE_TAGS, UPDATE_TAG, DELETE_TAG, DELETE_ALL_TAGS } from './types';

import TagDataService from '../services/tag.service';

export const createTag = (values) => async (dispatch) => {
  try {
    const res = await TagDataService.create(values);

    dispatch({
      type: CREATE_TAG,
      payload: res.data,
    });

    console.log(res);
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveTags = (businessId) => async (dispatch) => {
  try {
    const res = await TagDataService.getAllByBusiness(businessId);
    console.log(res.data);

    dispatch({
      type: RETRIEVE_TAGS,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateTag = (data) => async (dispatch) => {
  try {
    const res = await TagDataService.update(data);
    console.log(data);

    dispatch({
      type: UPDATE_TAG,
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
      type: DELETE_TAG,
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
      type: DELETE_ALL_TAGS,
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
      type: RETRIEVE_TAGS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
