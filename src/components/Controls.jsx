import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import NavBtn from './NavBtn';
import * as Actions from '../store/actions';

const clamp = (value, min, max) => Math.max(min, Math.min(value, max));

const ControlsWrapper = styled.div`
  position: fixed;
  display: flex;
  left: 0;
  right: 0;
  bottom: 0;
  color: #FFF;
  background-color: #36393f;
`;

const ControlsCenter = styled.span`
  color: #fff;
  flex: 1;
  padding: 10px;
  line-height: 28px;
  font-family: monospace;
  font-size: 12px;
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

const PullEdge = styled.div`
  flex: 0,
`;

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
      <ControlsWrapper>
        <PullEdge>
          <NavBtn
            label="←"
            disabled={cursor === 0}
            onClick={() => this.nav(-1)}
          />
        </PullEdge>

        {item && <ControlsCenter>
          <a href={`https://www.reddit.com${item.permalink}`} target="_blank">
            {`/r/${item.subreddit} [${item.score}] ${item.title}`}
          </a>
        </ControlsCenter>}

        <PullEdge>
          <NavBtn
            label="→"
            disabled={cursor === itemCount - 1}
            onClick={() => this.nav(1)}
          />
        </PullEdge>
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
