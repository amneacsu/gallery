import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Item from 'components/Item';
import Stream from 'core/stream';

import * as Actions from 'store/actions';

import css from './index.css';

class Player extends Component {
  static propTypes = {
    cursor: PropTypes.number,
    item: PropTypes.object,
    items: PropTypes.array,
    repeat: PropTypes.bool,
    onSetCursor: PropTypes.func,
    onStreamAppend: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.stream = new Stream(window.location);
  };

  componentWillMount() {
    this.fetchMore();
  }

  componentWillUpdate(nextProps) {
    if (nextProps.cursor === nextProps.items.length - 1) {
      this.fetchMore();
    }
  }

  fetchMore() {
    this.stream.fetchMore().then((newItems) => {
      this.props.onStreamAppend(newItems);
    });
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
    items: state.items,
    repeat: state.repeat,
  }),
  (dispatch) => ({
    onSetCursor: (cursor) => dispatch(Actions.setCursor(cursor)),
    onStreamAppend: (items) => dispatch(Actions.append(items)),
  })
)(Player);
