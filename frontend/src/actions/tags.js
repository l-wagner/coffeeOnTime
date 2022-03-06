import { CREATE_TAG, RETRIEVE_TAGS, UPDATE_TAG, DELETE_TAG, DELETE_ALL_TAGS } from './types';

import TagDataService from '../services/tag.service';

export const createTag = (name, description) => async (dispatch) => {
  try {
    const res = await TagDataService.create({ name, description });

    dispatch({
      type: CREATE_TAG,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveTags = () => async (dispatch) => {
  try {
    const res = await TagDataService.getAll();
    console.log(res.data);

    dispatch({
      type: RETRIEVE_TAGS,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateTag = (id, data) => async (dispatch) => {
  try {
    const res = await TagDataService.update(id, data);

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
