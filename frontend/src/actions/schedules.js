import { ERROR, CREATE_SCHEDULE, RETRIEVE_SCHEDULES, SAVE_SCHEDULE, DELETE_SCHEDULE, DELETE_ALL_SCHEDULES } from './types';

import ScheduleDataService from '../services/schedule.service';

export const createSchedule = (values) => async (dispatch) => {
  try {
    const res = await ScheduleDataService.fill(values);
    console.log(res.payload);
    dispatch({
      type: CREATE_SCHEDULE,
      payload: res.payload,
    });

    return Promise.resolve(res.payload);
  } catch (err) {
    dispatch({ type: ERROR, payload: { ...err, error: 'true ' } });
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

export const saveSchedule = (data) => async (dispatch) => {
  try {
    console.log(data.config);
    const res = await ScheduleDataService.save(data);

    dispatch({
      type: SAVE_SCHEDULE,
      payload: {
        config: JSON.parse(data.config),
        rows: JSON.parse(data.rows),
        rowLabels: JSON.parse(data.rowLabels),
        columns: JSON.parse(data.columns),
        business: data.businessId,
        startDate: data.startDate,
        endDate: data.endDate,
      },
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
