import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Item from 'components/Item';

import * as Actions from 'store/actions';

const clamp = (value, min, max) => Math.max(min, Math.min(value, max));

import css from './index.css';

class Player extends Component {
  static propTypes = {
    cursor: PropTypes.number,
    item: PropTypes.object,
    itemCount: PropTypes.number,
    repeat: PropTypes.bool,
    onMoveCursor: PropTypes.func,
  };

  nav(offset) {
    const { cursor, itemCount } = this.props;
    const newCursor = clamp(cursor + offset, 0, itemCount - 1);
    const newOffset = newCursor - cursor;

    this.props.onMoveCursor(newOffset);
  }

  render() {
    const item = this.props.item;

    if (!item) {
      return null;
    }

    return (
      <div className={css.player}>
        <Item
          item={item}
          key={item.name}
          onEnded={() => this.props.onMoveCursor(1)}
          repeat={this.props.repeat}
        />
      </div>
    );
  }
}

export default connect(
  (state) => ({
    cursor: state.cursor,
    item: state.items[state.cursor],
    itemCount: state.items.length,
    repeat: state.repeat,
  }),
  (dispatch) => ({
    onMoveCursor: (cursor) => dispatch(Actions.moveCursor(cursor)),
    onStreamAppend: (items) => dispatch(Actions.append(items)),
  })
)(Player);
