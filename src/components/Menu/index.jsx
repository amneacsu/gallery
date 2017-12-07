import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _sortBy from 'lodash/sortBy';

import NavBar from 'components/NavBar';
import NavBtn from 'components/NavBtn';

import css from './index.css';

class Menu extends Component {
  static propTypes = {
    subs: PropTypes.array,
    onChangeSubs: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      subName: '',
    };
  }

  toggle() {
    this.setState({ open: !this.state.open });
  }

  addSub() {
    const newSubs = this.state.subName.split('+');
    const subs = [...this.props.subs, ...newSubs];
    this.props.onChangeSubs(subs);
    this.setState({ subName: '' });
  }

  removeSub(sub) {
    const subs = this.props.subs.filter(s => s !== sub);
    this.props.onChangeSubs(subs);
  }

  render() {
    const subs = _sortBy(this.props.subs);

    return (
      <div className={css.menu}>
        <NavBar>
          <NavBtn
            label="⏣"
            onClick={() => this.toggle()}
          />
        </NavBar>
        {this.state.open && <div className={css.sidebar}>
          <div className={css.subList}>
            {subs.map(sub => (
              <div className={css.sub} key={sub}>
                <span className={css.subName}>
                  /r/{sub}
                </span>
                <button
                  type="button"
                  onClick={() => this.removeSub(sub)}
                />
              </div>
            ))}
          </div>
          <input
            type="text"
            placeholder="add subreddit"
            value={this.state.subName}
            onChange={(e) => this.setState({ subName: e.target.value })}
            onKeyPress={(e) => {
              if (e.which === 13) this.addSub();
            }}
          />
        </div>}
        {this.state.open && <div className={css.sidebarOverlay}
          onClick={() => this.setState({ open: false })}
        />}
      </div>
    );
  }
}

export default Menu;
