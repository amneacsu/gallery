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
    subs: PropTypes.array,
    item: PropTypes.object,
    items: PropTypes.array,
    onSetCursor: PropTypes.func,
    onStreamAppend: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.stream = new Stream();
  };

  componentWillMount() {
    this.stream.setSubs(this.props.subs);
    this.fetchMore();
  }

  componentWillUpdate(nextProps) {
    if (nextProps.cursor === nextProps.items.length - 1) {
      this.fetchMore();
    }

    if (nextProps.subs !== this.props.subs) {
      this.stream.setSubs(nextProps.subs);
      this.props.onSetCursor(0);
      this.fetchMore();
    }
  }

  fetchMore() {
    if (this.stream.subs.length === 0) {
      return;
    }

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
      <div>
        <div className={css.item}>
          {item && <Item
            item={item}
            key={item.name}
            onEnded={() => this.props.onSetCursor(this.props.cursor + 1)}
          />}
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    cursor: state.cursor,
    item: state.items[state.cursor],
    items: state.items,
  }),
  (dispatch) => ({
    onSetCursor: (cursor) => dispatch(Actions.setCursor(cursor)),
    onStreamAppend: (items) => dispatch(Actions.append(items)),
  })
)(Player);
