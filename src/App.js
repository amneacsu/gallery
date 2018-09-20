import React, { Component } from 'react';

import Gallery from './components/Gallery';
import Controls from './components/Controls';

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
