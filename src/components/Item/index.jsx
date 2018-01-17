import React, { Component } from 'react';
import PropTypes from 'prop-types';

import css from './index.css';

class Item extends Component {
  static propTypes = {
    item: PropTypes.object,
    onEnded: PropTypes.func,
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
      <video
        autoPlay
        className={css.item}
        ref={this.setRef}
        onEnded={onEnded}
      >
        <source src={url} />
      </video>
    );
  }
}

export default Item;
