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
            <img src={this.props.playlist.image} style={{width: '160px'}}/>
            <h3>{this.props.playlist.name}</h3>
            <ul>
               {this.props.playlist.songs.map(song => <li>{song.name}</li>)}
            </ul>
        </div>
    );
  }
}

class Filter extends Component {
  render() {
    return (
      <div>
        <input type="text" onKeyUp={event => this.props.onTextChange(event.target.value)}/>
      </div>
    )
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      serverData: {},
      filterString: ''
    }
  }

  componentDidMount() {
    let params = new URLSearchParams(document.location.search.substring(1));
    let accessToken = params.get("access_token");
    if (!accessToken) {return;}


    // fetch user data
    fetch('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    })
    .then( res => res.json())
    .then(data => this.setState({
      user: { 
        name: data.display_name 
      }
    }))

    // fetch playlist
    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    })
    .then( res => res.json())
    .then( playlistData => {
      let playlists = playlistData.items
      let trackDataPromises = playlists.map( playlist => {
        let responsePromise = fetch(playlist.tracks.href, {
          headers: {'Authorization': 'Bearer ' + accessToken}
        })
        let trackDataPromise = responsePromise.then(response => response.json());
        return trackDataPromise;
      })
      

      let allTracksDataPromises = Promise.all(trackDataPromises)

      let playlistsPromise = allTracksDataPromises.then(trackDatas => {
        trackDatas.forEach((trackData, i) => {
          playlists[i].trackDatas = trackData.items
          .map( item => item.track)
          .map( trackData => ({
            name: trackData.name,
            duration: trackData.duration_ms/1000
          }))
        })
        return playlists
      })

      return playlistsPromise;
    })
    .then( playlists => this.setState({
      playlists: playlists.map(item => {
        return {
          name: item.name,
          image: item.images[0].url,
          songs: item.trackDatas.slice(0,3)
        }
      })
    }));
  }
  
  render() {
    let playlistsToRender = 
    this.state.user && 
    this.state.playlists 
      ? this.state.playlists
        .filter( playlist => playlist.name.toLowerCase()
          .includes(this.state.filterString.toLowerCase())) 
      : []
    return (
      <div className="App App-header">

        {this.state.user ?
        <div>
          <h1>
            {this.state.user.name}'s Playlist
          </h1>
          <PlaylistCounter playlists={playlistsToRender} />
          <HoursCounter playlists={playlistsToRender}/>
          <Filter onTextChange={text => this.setState({filterString: text})}/>
          {
            playlistsToRender
            .map(playlist => 
              <Playlist playlist={playlist} />
          )}
        </div> : <button onClick={() => {
          window.location = window.location.href.includes('localhost') 
          ? 'http://localhost:8888/login'
          : 'https://better-playlists-backend-nuwen.herokuapp.com/login'
        }} 
        style={{padding: '20px', 'font-size': '50px', 'margin-top': '20px'}}>Sign in with Spotify</button>
        }
      </div>
    );
  }
}

export default App;
