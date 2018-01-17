import {
  SET_CURSOR,
  STREAM_APPEND,
  TOGGLE_REPEAT,
} from './actions';

const initialState = {
  cursor: 0,
  items: [],
  repeat: false,
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
    case TOGGLE_REPEAT:
      return {
        ...state,
        repeat: !state.repeat,
      };
    default:
      return state;
  }
};
