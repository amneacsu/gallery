import React from 'react';
import cx from 'classnames';

import css from './style.css';

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

export default NavBar;
