import React, { Component } from 'react';

import Player from 'components/Player';
import Gallery from 'components/Gallery';
import Controls from 'components/Controls';

import './index.css';

class App extends Component {
  render() {
    return (
      <div>
        <Gallery />
        <Controls />
      </div>
    );
  }
}

export default App;
