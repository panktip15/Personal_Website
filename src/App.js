import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <span className="name">Pankti Doshi</span>
          <div className="navBar">
            <span>about</span>
            <span>project</span>
            <span>resume</span>
            <a href="https://medium.com/@panktip85" target="_blank">
              blog
            </a>
            <span>contact</span>
          </div>
        </header>
        <canvas id="myCanvas" />
        <footer className="App-footer">
          <span>contact</span>
        </footer>
      </div>
    );
  }
}

export default App;
