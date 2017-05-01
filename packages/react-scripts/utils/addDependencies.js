'use strict';

module.exports = (currentDependencies, { bootstrap, fontawesome, redux }) => {
  const boostrapDependencies = bootstrap ? { "bootstrap": "3.3.7", "react-bootstrap": "0.31.0" } : {};
  const fontawesomeDependencies = fontawesome ? { "font-awesome": "4.7.0", "react-fontawesome": "1.6.1" } : {};
  const reduxDependencies = redux ? { "redux": "3.6.0", "redux-thunk": "2.2.0", "redux-promise": "0.5.3", "redux-logger": "3.0.1", "redux-actions": "2.0.2", "react-redux": "5.0.4" } : {};
  return Object.assign({}, currentDependencies, boostrapDependencies, fontawesomeDependencies, reduxDependencies);
}
