import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Item from 'components/Item';
import Stream from 'core/stream';

import * as Actions from 'store/actions';

const clamp = (value, min, max) => Math.max(min, Math.min(value, max));

import css from './index.css';

class Player extends Component {
  static propTypes = {
    cursor: PropTypes.number,
    item: PropTypes.object,
    itemCount: PropTypes.number,
    repeat: PropTypes.bool,
    onSetCursor: PropTypes.func,
    onToggleRepeat: PropTypes.func,
  };

  componentWillMount() {
    // window.addEventListener('keydown', this.handleControls);
  }

  componentWillUnmount() {
    // window.removeEventListener('keydown', this.handleControls);
  }

  handleControls = (e) => {
    let dir;
    if (e.which === 37) dir = -1;
    if (e.which === 39 || e.which === 32) dir = 1;
    if (e.which === 76 || e.which === 82) this.props.onToggleRepeat();
    dir && this.nav(dir);
  }

  nav(offset) {
    const { cursor, itemCount } = this.props;
    const newOffset = clamp(cursor + offset, 0, itemCount - 1);

    if (newOffset !== cursor) {
      this.props.onSetCursor(newOffset);
    }
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
          onEnded={() => this.props.onSetCursor(this.props.cursor + 1)}
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
    onSetCursor: (cursor) => dispatch(Actions.setCursor(cursor)),
    onStreamAppend: (items) => dispatch(Actions.append(items)),
    onToggleRepeat: () => dispatch(Actions.toggleRepeat),
  })
)(Player);
