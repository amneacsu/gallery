import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import css from './index.css';

const NavBar = ({ children, bottom }) => {
  return (
    <div className={cx(css.nav, {
      [css.navBottom]: bottom,
    })}>
      {children}
    </div>
  );
};

NavBar.propTypes = {
  children: PropTypes.node,
  bottom: PropTypes.bool,
};

export default NavBar;
