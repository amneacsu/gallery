import React from 'react';

import css from './style.css';

const Cursor = ({
  current,
  total,
}) => {
  return (
    <div className={css.Cursor}>
      {current + 1} / {total}
    </div>
  );
};

export default Cursor;
