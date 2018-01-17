import React, { Component } from 'react';

import Player from 'components/Player';
import Controls from 'components/Controls';

import './index.css';

class App extends Component {
  render() {
    return (
      <div>
        <Player />
        <Controls />
      </div>
    );
  }
}

export default App;
