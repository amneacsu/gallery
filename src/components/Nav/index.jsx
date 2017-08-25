import React, { Component } from 'react';

import NavBar from 'components/NavBar';
import NavBtn from 'components/NavBtn';

const clamp = (value, min, max) => Math.max(min, Math.min(value, max));

class Nav extends Component {
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
        <NavBtn
          left
          label="←"
          disabled={cursor === 0}
          onClick={() => this.nav(-1)}
        />

        <NavBtn
          right
          label="→"
          disabled={cursor === max}
          onClick={() => this.nav(1)}
        />
      </NavBar>
    );
  }
}

export default Nav;
