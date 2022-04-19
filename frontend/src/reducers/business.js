import { CREATE_BUSINESS, RETRIEVE_BUSINESS, UPDATE_BUSINESS, DELETE_BUSINESS, DELETE_ALL_BUSINESS } from '../actions/types';

const initialState = { nameForTags: 'tags' };

function businessReducer(business = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_BUSINESS:
      return {...payload};

    case RETRIEVE_BUSINESS:
      return { ...payload };

    case UPDATE_BUSINESS:
      return { ...payload };

    case DELETE_BUSINESS:
      return business.filter(({ id }) => id !== payload.id);

    case DELETE_ALL_BUSINESS:
      return [];

    default:
      return business;
  }
}

export default businessReducer;
