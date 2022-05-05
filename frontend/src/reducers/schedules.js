import { CREATE_SCHEDULE, RETRIEVE_SCHEDULES, SAVE_SCHEDULE, DELETE_SCHEDULE, DELETE_ALL_SCHEDULES } from '../actions/types';

const initialState = [];

function scheduleReducer(schedules = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_SCHEDULE:
      return { ...schedules, new: payload };

    case RETRIEVE_SCHEDULES:
      return payload;

    case SAVE_SCHEDULE:
      return schedules.map((schedule) => {
        if (schedule.id === payload.id) {
          console.log(schedule);
          return [payload];
        } else {
          return schedule;
        }
      });

    case DELETE_SCHEDULE:
      return schedules.filter(({ id }) => id !== payload.id);

    case DELETE_ALL_SCHEDULES:
      return [];

    default:
      return schedules;
  }
}

export default scheduleReducer;
