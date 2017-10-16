import React, { Component } from 'react';

import Image from 'components/Image';
import Video from 'components/Video';
import delayFirstRender from 'util/delayFirstRender';

class Item extends Component {
  componentWillUnmount() {
    this._e.src = '';
  }

  setRef(e) {
    this._e = e;
  }

  render() {
    const {
      onClick,
    } = this.props;

    const url = this.props.item.url;

    const match = url.match(/\.(\w*)$/);
    const ext = match ? match[1] : null;

    switch (ext) {
      case 'gifv':
      case 'gif':
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <Image url={url} onClick={onClick} setRef={(e) => this.setRef(e)} />;

      case 'webm':
      case 'mp4':
        return <Video url={url} onClick={onClick} setRef={(e) => this.setRef(e)} />;

      default:
        console.warn(`Unhandled file extension "${ext}" for file "${url}"`);
        return null;
    }

  }
}

export default delayFirstRender()(Item);
