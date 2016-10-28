import React, { PropTypes, Children } from 'react';

const propTypes = {
  children: PropTypes.node
};

/**
 * This is the root component
 * @example
 * <App />
 */
class App extends React.Component {

  /**
   * render - lifecycle method rendering JSX to the DOM
   * @return {ReactElement}
   */
  render() {
    const children = Children.toArray(this.props.children);
    return (
      <div id="app-container">
        { Children.map(children, child => child) }
      </div>
    );
  }
}

App.propTypes = propTypes;
export default App;
