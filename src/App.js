import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

let defaultStyle = {
    color: '#fff',

}

let fakeServerData = {
    user: {
        name: "David",
        playlists: [
          {
            name: 'My favourites',
            songs: [
              {
                name: 'Beat It',
                duration: 1242
              },
              {
                name: 'Canelloni Makaroni',
                duration: 1323
              },
              {
                name: 'Rose Helicopter',
                duration: 1831
              }
            ]
          },
          {
            name: 'Discover Weekly',
            songs: [
              {
                name: 'The song',
                duration: 1324
              },
              {
                name: 'A song',
                duration: 1289
              },
              {
                name: 'Songs',
                duration: 1283
              }
            ],
          },
          {
            name: 'Are and Bae',
            songs: [
              {
                name: 'That thang',
                duration: 8939
              },
              {
                name: 'Dipt in the night',
                duration: 3289
              }
            ]
          },
          {
            name: 'Unce-athon',
            songs: [
              {
                name: 'Beep Boop',
                duration: 3894
              },
              {
                name: 'badump psh',
                duration: 3991
              }
            ]
          }
        ]
    }
};

class PlaylistCounter extends Component {
  render() {
    return (
      <div style={{...defaultStyle, width: "40%", display: 'inline-block'}}>
        <h3>{this.props.playlists.length} Playlists</h3>
      </div>
    )
  }
}

class HoursCounter extends Component {


  render() {
    let allSongs = this.props.playlists.reduce((songs, playlist) => songs.concat(playlist.songs), [])
    let totalDuration = allSongs.reduce((sum, song) => sum + song.duration, 0); 
    return (
      <div style={{...defaultStyle, width: "40%", display: 'inline-block'}}>
        <h3>{Math.round(totalDuration/3600)} Hours</h3>
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
  constructor(){
    super();
    this.state = {
      serverData: {}
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({serverData: fakeServerData});
    }, 500)
  }
  render() {
    return (
      <div className="App App-header">

        {this.state.serverData.user ?
        <div>
          <h1>
            {this.state.serverData.user.name}'s Playlist
          </h1>
          <PlaylistCounter playlists={this.state.serverData.user && this.state.serverData.user.playlists} />
          <HoursCounter playlists={this.state.serverData.user && this.state.serverData.user.playlists}/>
          <Filter/>
          <Playlist/>
          <Playlist/>
          <Playlist/>
          <Playlist/>
        </div> : <h1 style={{...defaultStyle}}>Loading...</h1>
        }
      </div>
    );
  }
}

export default App;
