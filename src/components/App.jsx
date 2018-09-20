import React, { Component } from 'react';

import Gallery from './Gallery';
import Controls from './Controls';

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
