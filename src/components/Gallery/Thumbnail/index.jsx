import React from 'react';

import css from './index.css';

const Thumbnail = ({
  onClick,
  src,
  current,
}) => {
  const style = current ? {
    backgroundColor: 'blue',
  } : null;

  return (
    <div onClick={onClick} className={css.Thumbnail} style={style}>
      <video src={src} autoPlay loop />
    </div>
  );
};

export default Thumbnail;
