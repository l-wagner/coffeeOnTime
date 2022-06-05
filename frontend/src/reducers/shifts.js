import { CREATE_SHIFT, RETRIEVE_SHIFTS, UPDATE_SHIFT, DELETE_SHIFT, DELETE_ALL_SHIFTS } from '../actions/types';

const initialState = [];

function shiftReducer(shifts = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_SHIFT:
      return payload;

    case RETRIEVE_SHIFTS:
      return payload;

    case UPDATE_SHIFT:
      return shifts.map((shift) => {
        if (shift.id === payload.id) {
          return {
            ...shift,
            ...payload,
          };
        } else {
          return shift;
        }
      });

    case DELETE_SHIFT:
      return shifts.filter(({ id }) => id !== payload.id);

    case DELETE_ALL_SHIFTS:
      return [];

    default:
      return shifts;
  }
}

export default shiftReducer;
