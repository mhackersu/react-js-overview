/*
 ** Using modules here
 ** Need a module bundler, let's use webpack & babel
 ** These configurations are described in:
 ** webpack.config.js &
 ** package.json
 */
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

// Component
// State
// LIfecycle
// UI

/*
 ** ES6 Class that extends React.component
 */
class App extends React.Component {
  /*
   **   Render method uses JSX to describe the UI for the component
   */
  render() {
    /*
     **     This what our JS invocation would look like if we did not have Babel
     **     The JSX is compiled into React.createElement invocations with Babel
     */
    // return React.createElement("div", null, "Hello World");
    /*
     **     Instead we can use JSX because we have Babel as an interpreter
     */
    return <div>Hello World</div>;
  }
}

ReactDOM.render(
  /*
   **   React Element that we want to render
   */
  <App />,
  /*
   **   Instruct ReactDOM.render where we want to render the element to which is an element with an id of "app".
   */
  document.getElementById("app")
);
