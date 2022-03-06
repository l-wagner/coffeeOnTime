import {
  CREATE_TAG,
  RETRIEVE_TAGS,
  UPDATE_TAG,
  DELETE_TAG,
  DELETE_ALL_TAGS,
} from "../actions/types";

const initialState = [];

function tagReducer(tags = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_TAG:
      return [...tags, payload];

    case RETRIEVE_TAGS:
      return payload;

    case UPDATE_TAG:
      return tags.map((tag) => {
        if (tag.id === payload.id) {
          return {
            ...tag,
            ...payload,
          };
        } else {
          return tag;
        }
      });

    case DELETE_TAG:
      return tags.filter(({ id }) => id !== payload.id);

    case DELETE_ALL_TAGS:
      return [];

    default:
      return tags;
  }
};

export default tagReducer;