import React, { useState, useEffect } from "react";

import fetchTopAlbums from "../data/top-albums";
import MusicCard from "./MusicCard";

function App() {
  const [albums, setAlbums] = useState(null);

  useEffect(() => {
    fetchTopAlbums().then((res) => {
      setAlbums(res.feed.entry.map((v) => ({ ...v, favorite: false })));
    });
  }, []);

  const setFavorite = (v) => {
    return console.log("this is it", v);
  };

  return (
    <div className="ui container">
      <div className="ui secondary pointing menu">
        <div className="right menu">
          <button className="ui item active">Top Albums</button>
          <button className="ui item">Favorite Albums</button>
        </div>
      </div>
      <div className="ui cards">
        {albums ? (
          albums.map((album) => {console.log('albummap', album)
            return (
              <MusicCard
                info={album}
                setFavorite={() => this.props.isFavorite}
              />
            );
          })
        ) : (
          <div>loading</div>
        )}
      </div>
    </div>
  );
}

export default App;
