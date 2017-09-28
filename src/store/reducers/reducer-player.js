import {
  SET_CURSOR,
} from '../actions/player.js';

const initialState = {
  cursor: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURSOR:
      return {
        ...state,
        cursor: action.cursor,
      };
    default:
      return state;
  }
};
