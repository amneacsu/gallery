import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NavBar from 'components/NavBar';
import NavBtn from 'components/NavBtn';

import css from './index.css';

const clamp = (value, min, max) => Math.max(min, Math.min(value, max));

class Nav extends Component {
  static propTypes = {
    cursor: PropTypes.number,
    max: PropTypes.number,
    onChange: PropTypes.func,
  }

  componentWillMount() {
    window.onkeydown = (e) => {
      let dir;
      if (e.which === 37) dir = -1;
      if (e.which === 39 || e.which === 32) dir = 1;
      dir && this.nav(dir);
    };
  }

  nav(offset) {
    const { cursor, max } = this.props;
    const newOffset = clamp(cursor + offset, 0, max);

    if (newOffset !== cursor) {
      this.props.onChange(newOffset);
    }
  }

  render() {
    const {
      cursor,
      max,
    } = this.props;

    return (
      <NavBar bottom>
        <div className={css.left}>
          <NavBtn
            label="←"
            disabled={cursor === 0}
            onClick={() => this.nav(-1)}
          />
        </div>

        <div className={css.right}>
          <NavBtn
            label="→"
            disabled={cursor === max}
            onClick={() => this.nav(1)}
          />
        </div>
      </NavBar>
    );
  }
}

export default Nav;
