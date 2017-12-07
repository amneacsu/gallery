import React, { Component } from 'react';
import PropTypes from 'prop-types';

import delayFirstRender from 'util/delayFirstRender';

import css from './index.css';

class Item extends Component {
  static propTypes = {
    item: PropTypes.object,
    onClick: PropTypes.func,
  }

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

    return (
      <video
        className={css.Video}
        ref={(e) => this.setRef(e)}
        autoPlay
        controls
        onClick={onClick}
        onEnded={() => {
          onClick();
        }}
      >
        <source src={url} />
      </video>
    );
  }
}

export default delayFirstRender()(Item);
