import React from 'react';

import css from './style.css';

const Video = ({
  url,
  onClick,
  setRef,
}) => {
  return (
    <video
      className={css.Video}
      ref={setRef}
      autoPlay
      controls
      onClick={onClick}
      onEnded={() => {
        onClick();
      }}
    >
      <source src={url} />
    </video>
  );
};

export default Video;
