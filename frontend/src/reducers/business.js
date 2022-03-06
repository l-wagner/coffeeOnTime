import { CREATE_BUSINESS, RETRIEVE_BUSINESSS, UPDATE_BUSINESS, DELETE_BUSINESS, DELETE_ALL_BUSINESSS } from '../actions/types';

const initialState = { nameForTags: 'tags' };

function businessReducer(businesss = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_BUSINESS:
      return [...businesss, payload];

    case RETRIEVE_BUSINESSS:
      return payload;

    case UPDATE_BUSINESS:
      return businesss.map((business) => {
        if (business.id === payload.id) {
          return {
            ...business,
            ...payload,
          };
        } else {
          return business;
        }
      });

    case DELETE_BUSINESS:
      return businesss.filter(({ id }) => id !== payload.id);

    case DELETE_ALL_BUSINESSS:
      return [];

    default:
      return businesss;
  }
}

export default businessReducer;
