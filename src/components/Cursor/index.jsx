import React from 'react';
import PropTypes from 'prop-types';

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

Cursor.propTypes = {
  current: PropTypes.number,
  total: PropTypes.number,
};

export default Cursor;
