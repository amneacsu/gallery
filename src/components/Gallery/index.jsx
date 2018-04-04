import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Player from 'components/Player';
import Controls from 'components/Controls';
import * as Actions from 'store/actions';
import Stream from 'core/stream';

import Thumbnail from './Thumbnail';
import css from './index.css';

const LIMIT = 15;

class Gallery extends Component {
  static propTypes = {
    cursor: PropTypes.number,
    item: PropTypes.object,
    items: PropTypes.array,
    onSetCursor: PropTypes.func,
    onStreamAppend: PropTypes.func,
  };

  state = {
    id: null,
  }

  constructor(props) {
    super(props);

    this.stream = new Stream(window.location);
  };

  componentWillMount() {
    this.fetchMore();

    window.addEventListener('keydown', (e) => {
      if (e.which === 27) this.handleSetId(null);
    });
  }

  componentWillUpdate(nextProps) {
    if ((nextProps.cursor + 1) * LIMIT >=  nextProps.items.length - 1) {
      this.fetchMore();
    }
  }

  fetchMore() {
    this.stream.fetchMore().then((newItems) => {
      const more = (this.props.items.length + newItems.length) < LIMIT;
      console.log(newItems);

      this.props.onStreamAppend(newItems);

      if (more) {
        this.fetchMore();
      }
    });
  }

  handleSetId = (id) => {
    this.setState({ id });
  }

  render() {
    const {
      item,
    } = this.props;

    return (
      <div className={css.Gallery}>
        <Player
          item={item}
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
  }),
  (dispatch) => ({
    onSetCursor: (cursor) => dispatch(Actions.setCursor(cursor)),
    onStreamAppend: (items) => dispatch(Actions.append(items)),
  })
)(Gallery);
