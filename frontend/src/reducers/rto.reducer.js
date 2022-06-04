import { CREATE_RTO, RETRIEVE_RTOS, UPDATE_RTO, DELETE_RTO, DELETE_ALL_RTOS } from '../actions/types';

const initialState = [];

function rtoReducer(rto = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_RTO: {
      return payload;
    }

    case RETRIEVE_RTOS:
      return payload;

    case UPDATE_RTO:
      return rto.map((rto) => {
        if (rto.id === payload.id) {
          return {
            ...rto,
            ...payload,
          };
        } else {
          return rto;
        }
      });

    case DELETE_RTO:
      return rto.filter(({ id }) => id !== payload.id);

    case DELETE_ALL_RTOS:
      return [];

    default:
      return rto;
  }
}

export default rtoReducer;
