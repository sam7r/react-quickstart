import React, { PropTypes, Children } from 'react';

const propTypes = {
  children: PropTypes.node
};

/**
 * This is the root component
 * @example
 * <App />
 */
const App = ({ children }) => {
  /**
   * App as our app container renders all given children
   * @return {ReactElement}
   */
    return (
      <div id="app-container">
        { Children.map(Children.toArray(children), child => child) }
      </div>
    );
};

App.propTypes = propTypes;
export default App;
