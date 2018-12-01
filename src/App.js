import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

let defaultStyle = {
    color: '#fff',

}


class Aggregate extends Component {
  render() {
    return (
      <div style={{...defaultStyle, width: "40%", display: 'inline-block'}}>
        <h3>Number Text</h3>
      </div>
    )
  }
}

class Playlist extends Component {
  render() {
    return (
        <div style={{...defaultStyle, width: "25%", display: 'inline-block'}}>
            <img />
            <h3>Playlist name</h3>
            <ul>
                <li>Song 1</li>
                <li>Song 2</li>
                <li>Song 3</li>
            </ul>
        </div>
    );
  }
}

class Filter extends Component {
  render() {
    return (
      <div>
        <img/>
        <input type="text"/>
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App App-header">
        <h1>Title</h1>
        <Aggregate/>
        <Aggregate/>
        <Filter/>
        <Playlist/>
        <Playlist/>
        <Playlist/>
        <Playlist/>
      </div>
    );
  }
}

export default App;
