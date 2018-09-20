export const MOVE_CURSOR = 'MOVE_CURSOR';
export const moveCursor = (offset) => ({
  type: MOVE_CURSOR,
  offset,
});

export const STREAM_APPEND = 'STREAM_APPEND';
export const append = (items) => ({
  type: STREAM_APPEND,
  items,
});

export const TOGGLE_REPEAT = 'TOGGLE_REPEAT';
export const toggleRepeat = {
  type: TOGGLE_REPEAT,
};
