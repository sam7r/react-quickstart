import React from 'react';

const propTypes = {};

class App extends React.Component {

  componentDidMount() {
    console.log('component mounted');
  }

  render() {
    return <div id="main-container">App Boom!</div>;
  }
}

App.propTypes = propTypes;
export default App;
