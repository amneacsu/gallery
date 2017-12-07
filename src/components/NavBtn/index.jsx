import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import css from './index.css';

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

NavBtn.propTypes = {
  label: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  left: PropTypes.bool,
  right: PropTypes.bool,
};

export default NavBtn;
