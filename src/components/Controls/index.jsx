import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import NavBtn from 'components/NavBtn';
import * as Actions from 'store/actions';

import css from './index.css';

const clamp = (value, min, max) => Math.max(min, Math.min(value, max));

class Controls extends Component {
  static propTypes = {
    cursor: PropTypes.number,
    itemCount: PropTypes.number,
    onSetCursor: PropTypes.func,
  };

  componentWillMount() {
    window.onkeydown = (e) => {
      let dir;
      if (e.which === 37) dir = -1;
      if (e.which === 39 || e.which === 32) dir = 1;
      dir && this.nav(dir);
    };
  }

  nav(offset) {
    const { cursor, itemCount } = this.props;
    const newOffset = clamp(cursor + offset, 0, itemCount - 1);

    if (newOffset !== cursor) {
      this.props.onSetCursor(newOffset);
    }
  }

  render() {
    const { cursor, itemCount } = this.props;

    return (
      <div className={css.controls}>
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
            disabled={cursor === itemCount - 1}
            onClick={() => this.nav(1)}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    cursor: state.cursor,
    itemCount: state.items.length,
  }),
  (dispatch) => ({
    onSetCursor: (cursor) => dispatch(Actions.setCursor(cursor)),
  }),
)(Controls);
