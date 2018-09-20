import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Video = styled.video`
  width: 100%;
  height: 100%;

  ${'' /* video::-webkit-media-controls-overlay-play-button {
    display: none;
  } */}
`;

class Item extends Component {
  static propTypes = {
    item: PropTypes.object,
    onEnded: PropTypes.func,
    repeat: PropTypes.bool,
  }

  componentWillUnmount() {
    this._e.src = '';
  }

  setRef = (e) => {
    this._e = e;
  }

  render() {
    const {
      onEnded,
    } = this.props;

    const url = this.props.item.url;

    return (
      <Video
        controls
        autoPlay
        ref={this.setRef}
        onEnded={onEnded}
        loop={this.props.repeat}
      >
        <source src={url} />
      </Video>
    );
  }
}

export default Item;
