import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Item from 'components/Item';
import Cursor from 'components/Cursor';
import Nav from 'components/Nav';
import Stream from 'core/stream';

import * as PlayerActions from 'store/actions/player';

import css from './style.css';

class Player extends Component {
  static propTypes = {
    cursor: PropTypes.number,
    subs: PropTypes.array,
    onSetCursor: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.stream = new Stream();

    this.state = {
      stream: [],
    };
  };

  componentWillMount() {
    this.stream.setSubs(this.props.subs);
    this.fetchMore();
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.cursor === nextState.stream.length - 1) {
      this.fetchMore();
    }

    if (nextProps.subs !== this.props.subs) {
      this.stream.setSubs(nextProps.subs);
      this.setState({
        stream: [],
      });
      this.props.onSetCursor(0);
      this.fetchMore();
    }
  }

  fetchMore() {
    if (this.stream.subs.length === 0) {
      return;
    }

    this.stream.fetchMore().then((newItems) => {
      this.setState({
        stream: [...this.state.stream, ...newItems],
      });
    });
  }

  get item() {
    const { cursor } = this.props;
    const { stream } = this.state;
    return stream[cursor];
  }

  render() {
    const item = this.item;
    let status = '';
    const stream = this.state.stream;

    if (!item) {
      return null;
    }

    if (this.props.subs.length === 0) {
      status = 'no subs';
    } else if (stream.length === 0) {
      status = 'loading';
    }

    return (
      <div>
        <div className={css.item}>
          {item && <Item
            item={item}
            key={item.name}
            onClick={() => this.props.onSetCursor(this.props.cursor + 1)}
          />}
        </div>
        <div className={css.overlays}>
          {status}
          {this.state.stream.length > 0 && <Cursor
            current={this.props.cursor}
            total={this.state.stream.length}
          />}
          {this.state.stream.length > 0 && <Nav
            cursor={this.props.cursor}
            max={this.state.stream.length - 1}
            onChange={this.props.onSetCursor}
          />}
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    cursor: state.player.cursor,
  }),
  (dispatch) => ({
    onSetCursor: (cursor) => dispatch(PlayerActions.setCursor(cursor)),
  })
)(Player);
