import React from "react";
import MusicCard from "./MusicCard";

// import './ImageList.css'

const MusicList = (props) => {

  const albumCards = props.albums.map(album => {
    return (
      <MusicCard
        key={album.id.attributes["im:id"]}
        img={album["im:image"][0].label}
        artist={album["im:artist"].label}
        title={album["im:name"].label}
      />
    );
  });

  return <div className="ui cards five">{albumCards}</div>;
};

export default MusicList;
