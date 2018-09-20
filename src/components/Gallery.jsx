import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Player from './Player';
import * as Actions from '../store/actions';
import Stream from '../core/stream';

const LIMIT = 15;

class Gallery extends Component {
  static propTypes = {
    cursor: PropTypes.number,
    item: PropTypes.object,
    items: PropTypes.array,
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
    if ((nextProps.cursor + 1) * LIMIT >=  nextProps.items.length - 1) {
      this.fetchMore();
    }
  }

  fetchMore() {
    this.stream.fetchMore().then((newItems) => {
      const more = (this.props.items.length + newItems.length) < LIMIT;

      this.props.onStreamAppend(newItems);

      if (more) {
        this.fetchMore();
      }
    });
  }

  render() {
    const {
      item,
    } = this.props;

    return (
      <Player
        item={item}
      />
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
    onStreamAppend: (items) => dispatch(Actions.append(items)),
  })
)(Gallery);
