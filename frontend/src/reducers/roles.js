import {
  CREATE_ROLE,
  RETRIEVE_ROLES,
  UPDATE_ROLE,
  DELETE_ROLE,
  DELETE_ALL_ROLES,
} from "../actions/types";

const initialState = [];

function roleReducer(roles = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_ROLE:
      return [...roles, payload];

    case RETRIEVE_ROLES:
      return payload;

    case UPDATE_ROLE:
      return roles.map((role) => {
        if (role.id === payload.id) {
          return {
            ...role,
            ...payload,
          };
        } else {
          return role;
        }
      });

    case DELETE_ROLE:
      return roles.filter(({ id }) => id !== payload.id);

    case DELETE_ALL_ROLES:
      return [];

    default:
      return roles;
  }
};

export default roleReducer;