import React, { Component } from 'react';

import Item from 'components/Item';
import Cursor from 'components/Cursor';
import Nav from 'components/Nav';
import Stream from 'core/stream';

import css from './style.css';

class Player extends Component {
  constructor(props) {
    super(props);

    this.stream = new Stream();

    this.state = {
      cursor: 0,
      stream: [],
    };
  };

  componentWillMount() {
    this.stream.setSubs(this.props.subs);
    this.fetchMore();
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.cursor === nextState.stream.length - 1) {
      this.fetchMore();
    }

    if (nextProps.subs !== this.props.subs) {
      this.stream.setSubs(nextProps.subs);
      this.setState({
        cursor: 0,
        stream: [],
      });
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
    const { cursor, stream } = this.state;
    return stream[cursor];
  }

  set cursor(cursor) {
    this.setState({ cursor });
  }

  render() {
    const item = this.item;
    let status = '';
    const stream = this.state.stream;

    if (this.props.subs.length === 0) {
      status = 'no subs';
    } else if (stream.length === 0) {
      status = 'loading';
    }

    return (
      <div>
        <div className={css.item}>
          {item && <Item
            url={item}
            key={item}
            onClick={() => this.setState({ cursor: this.state.cursor + 1 })}
          />}
        </div>
        <div className={css.overlays}>
          {status}
          {this.state.stream.length > 0 && <Cursor
            current={this.state.cursor}
            total={this.state.stream.length}
          />}
          {this.state.stream.length > 0 && <Nav
            cursor={this.state.cursor}
            max={this.state.stream.length - 1}
            onChange={(cursor) => this.setState({ cursor })}
          />}
        </div>
      </div>
    );
  }
}

export default Player;
