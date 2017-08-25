import React, { Component } from 'react';

export default (delay = 50) => (WrappedComponent) => {
  class DelayFirstRender extends Component {
    constructor(props) {
      super(props);
      this.state = { delayed: false };
    }

    componentWillMount() {
      this._mounted = true;

      setTimeout(() => {
        if (this._mounted) {
          this.setState({ delayed: true });
        }
      }, delay);
    }

    componentWillUnmount() {
      this._mounted = false;
    }

    render() {
      if (!this.state.delayed) {
        return null;
      }

      return (
        <WrappedComponent {...this.props} />
      );
    }
  }

  return DelayFirstRender;
};
