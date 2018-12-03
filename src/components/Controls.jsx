import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import * as Actions from '../store/actions';

const clamp = (value, min, max) => Math.max(min, Math.min(value, max));

const ControlsWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  color: #FFF;
  background-color: #36393f;
  color: #fff;
  padding: 10px;
  line-height: 28px;
  font-family: monospace;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  text-decoration: none;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  & a {
    color: #fff;
    text-decoration: none;
  }
`;

class Controls extends Component {
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
    const { item } = this.props;

    if (!item) {
      return null;
    }

    return (
      <ControlsWrapper>
        <a href={`https://www.reddit.com${item.permalink}`} target="_blank" rel="noopener noreferrer">
          {`/r/${item.subreddit} [${item.score}] ${item.title}`}
        </a>
      </ControlsWrapper>
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
