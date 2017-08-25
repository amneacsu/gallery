import React from 'react';
import cx from 'classnames';

import css from './style.css';

const NavBtn = ({
  label,
  disabled,
  onClick,
  left,
  right,
}) => {
  return (
    <button
      className={cx({
        [css.navBtn]: true,
        [css.btnLeft]: left,
        [css.btnRight]: right,
      })}
      type="button"
      disabled={disabled}
      onClick={onClick}
    >{label}</button>
  );
};

export default NavBtn;
