import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import NavBtn from './elements/NavBtn';
import * as Actions from 'store/actions';

import css from './index.css';

const clamp = (value, min, max) => Math.max(min, Math.min(value, max));

class Controls extends Component {
  static propTypes = {
    cursor: PropTypes.number,
    item: PropTypes.object,
    itemCount: PropTypes.number,
    onMoveCursor: PropTypes.func,
    onToggleRepeat: PropTypes.func,
  };

  componentWillMount() {
    window.onkeydown = (e) => {
      let dir;
      if (e.which === 37) dir = -1;
      if (e.which === 39 || e.which === 32) dir = 1;
      if (e.which === 76 || e.which === 82) this.props.onToggleRepeat();
      dir && this.nav(dir);
    };
  }

  nav(offset) {
    const { cursor, itemCount } = this.props;
    const newCursor = clamp(cursor + offset, 0, itemCount - 1);
    const newOffset = newCursor - cursor;

    this.props.onMoveCursor(newOffset);
  }

  render() {
    const { cursor, item, itemCount } = this.props;

    return (
      <div className={css.controls}>
        <div className={css.left}>
          <NavBtn
            label="←"
            disabled={cursor === 0}
            onClick={() => this.nav(-1)}
          />
        </div>

        {item && <span className={css.center}>
          <a href={`https://www.reddit.com${item.permalink}`} target="_blank">
            {`/r/${item.subreddit} [${item.score}] ${item.title}`}
          </a>
        </span>}

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
    item: state.items[state.cursor],
    itemCount: state.items.length,
  }),
  (dispatch) => ({
    onMoveCursor: (cursor) => dispatch(Actions.moveCursor(cursor)),
    onToggleRepeat: () => dispatch(Actions.toggleRepeat),
  }),
)(Controls);
