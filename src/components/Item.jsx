import React, { Component } from 'react';
import styled from 'styled-components';

const Video = styled.video`
  width: 100%;
  height: 100%;
`;

class Item extends Component {
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
