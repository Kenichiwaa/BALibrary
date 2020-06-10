import React from "react";

import fetchTopAlbums from '../data/top-albums';
import MusicList from "./MusicList";

class App extends React.Component {
  state = {
    albums: []
  };

  // onSearchSubmit = async term => {
  //   console.log("event", term);
  //   const response = await unsplash.get("/search/photos", {
  //     params: { query: term }
  //   });
  //   this.setState({ images: response.data.results });
  // };

  componentDidMount() {
    fetchTopAlbums().then((res) => {
      console.log("outside", res.feed.entry);
      this.setState({ albums: res.feed.entry });
    });
  }

  render() {
    console.log('!this.state.albums', this.state.albums);

    return (
      <div className="ui container">
      <div className="ui secondary pointing menu">
        <div className="right menu">
          <button className="ui item active">Top Albums</button>
          <button className="ui item">Favorite Albums</button>
        </div>
      </div>
      <div className="ui content">
        { this.state.albums ?  <MusicList albums={this.state.albums}/> : <div>loading</div> }
      </div>
    </div>
    );
  }
}

export default App;