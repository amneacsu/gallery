import {
  SET_CURSOR,
  STREAM_APPEND,
} from './actions';

const initialState = {
  cursor: 0,
  items: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURSOR:
      return {
        ...state,
        cursor: action.cursor,
      };
    case STREAM_APPEND:
      return {
        ...state,
        items: [
          ...state.items,
          ...action.items,
        ],
      };
    default:
      return state;
  }
};
