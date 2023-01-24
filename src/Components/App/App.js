import './App.css';
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist'
import React from 'react';

 export class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      searchResults: [
        {id: 1, album: 'albumname1', artist: 'artist1', name: 'name1'},
        {id: 2, album: 'albumname2', artist: 'artist2', name: 'name2'},
        {id: 3, album: 'albumname3', artist: 'artist3', name: 'name3'}
      ],
      playlistName: 'My Custom Playlist',
      playlistTracks: [
        {id: 23203, album: 'mycustomalbumname1', artist: 'mycustomartist1', name: 'mycustomname1'},
        {id: 23204, album: 'mycustomalbumname2', artist: 'mycustomartist2', name: 'mycustomname2'},
        {id: 23205, album: 'mycustomalbumname3', artist: 'mycustomartist3', name: 'mycustomname3'}
      ]
    }
    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this)
  }
  addTrack(track) {
    let allPlaylistTracks = this.state.playlistTracks
    if (allPlaylistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    allPlaylistTracks.push(track)
    this.setState( {playlistTracks: allPlaylistTracks} )
  }
  removeTrack(track) {
    let allPlaylistTracks = this.state.playlistTracks
    let updatedPlaylistTracks = allPlaylistTracks.filter(savedTrack => savedTrack.id !== track.id)
    this.setState( { playlistTracks: updatedPlaylistTracks })
  }
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack}/>
        </div>
      </div>
    </div>
    );
  }
}

export default App;
