import React from 'react';

import css from './style.css';

const Image = ({
  url,
  onClick,
  setRef,
}) => {
  return (
    <img
      className={css.Image}
      ref={setRef}
      src={url}
      onClick={onClick}
    />
  );
};

export default Image;
