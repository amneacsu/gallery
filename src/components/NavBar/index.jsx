import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import css from './index.css';

const NavBar = ({ children, top, bottom }) => {
  return (
    <div className={cx({
      [css.nav]: true,
      [css.navTop]: top,
      [css.navBottom]: bottom,
    })}>
      {children}
    </div>
  );
};

NavBar.propTypes = {
  children: PropTypes.node,
  top: PropTypes.bool,
  bottom: PropTypes.bool,
};

export default NavBar;
