import React from 'react';

import css from './index.css';

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
