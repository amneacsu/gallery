import React, { Component } from 'react';

import Menu from 'components/Menu';
import Player from 'components/Player';
import Controls from 'components/Controls';
import Store from 'core/store';

import './index.css';

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
        <Controls />
      </div>
    );
  }
}

export default App;
