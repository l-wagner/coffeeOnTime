import { CREATE_SCHEDULE, RETRIEVE_SCHEDULES, UPDATE_SCHEDULE, DELETE_SCHEDULE, DELETE_ALL_SCHEDULES } from './types';

import ScheduleDataService from '../services/tag.service';

export const createSchedule = (values) => async (dispatch) => {
  try {
    const res = await ScheduleDataService.create(values);

    dispatch({
      type: CREATE_SCHEDULE,
      payload: res.payload,
    });

    return Promise.resolve(res.payload);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveSchedules = (businessId) => async (dispatch) => {
  try {
    const res = await ScheduleDataService.getAllByBusiness(businessId);
    dispatch({
      type: RETRIEVE_SCHEDULES,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateSchedule = (data) => async (dispatch) => {
  try {
    const res = await ScheduleDataService.update(data);

    dispatch({
      type: UPDATE_SCHEDULE,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteSchedule = (id) => async (dispatch) => {
  try {
    await ScheduleDataService.delete(id);

    dispatch({
      type: DELETE_SCHEDULE,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteAllSchedules = () => async (dispatch) => {
  try {
    const res = await ScheduleDataService.deleteAll();

    dispatch({
      type: DELETE_ALL_SCHEDULES,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const findSchedulesByName = (name) => async (dispatch) => {
  try {
    const res = await ScheduleDataService.findByName(name);

    dispatch({
      type: RETRIEVE_SCHEDULES,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
