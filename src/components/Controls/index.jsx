import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Cursor from 'components/Cursor';
import Nav from 'components/Nav';
import * as Actions from 'store/actions';
import css from './style.css';

class Controls extends Component {
  static propTypes = {
    cursor: PropTypes.number,
    itemCount: PropTypes.number,
    onSetCursor: PropTypes.func,
  };

  render() {
    return (
      <div className={css.Controls}>
        {status}
        {this.props.itemCount > 0 && <Cursor
          current={this.props.cursor}
          total={this.props.itemCount}
        />}
        {this.props.itemCount > 0 && <Nav
          cursor={this.props.cursor}
          max={this.props.itemCount - 1}
          onChange={this.props.onSetCursor}
        />}
      </div>
    );
  }
}

export default connect(
  (state) => ({
    cursor: state.cursor,
    itemCount: state.items.length,
  }),
  (dispatch) => ({
    onSetCursor: (cursor) => dispatch(Actions.setCursor(cursor)),
  }),
)(Controls);
