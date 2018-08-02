import React from 'react';
import PropTypes from 'prop-types';

import css from './NavBtn.css';

const NavBtn = ({
  label,
  disabled,
  onClick,
}) => {
  return (
    <button
      className={css.navBtn}
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
};

export default NavBtn;
