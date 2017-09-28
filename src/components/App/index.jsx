import React, { Component } from 'react';

import Menu from 'components/Menu';
import Player from 'components/Player';
import Store from 'core/store';

import './style.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.store = new Store();

    this.state = {
      subs: this.store.get(),
    };
  };

  setSubs(subs) {
    this.setState({ subs });
    this.store.set(subs);
  }

  render() {
    return (
      <div>
        <Menu
          subs={this.state.subs}
          onChangeSubs={(subs) => this.setSubs(subs)}
        />
        <Player
          subs={this.state.subs}
        />
      </div>
    );
  }
}

export default App;
