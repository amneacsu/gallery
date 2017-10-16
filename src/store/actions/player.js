export const SET_CURSOR = 'SET_CURSOR';
export const setCursor = (cursor) => ({
  type: SET_CURSOR,
  cursor,
});

export const STREAM_APPEND = 'STREAM_APPEND';
export const append = (items) => ({
  type: STREAM_APPEND,
  items,
});
