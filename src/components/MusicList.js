import React from "react";
import MusicCard from "./MusicCard";

// import './ImageList.css'

const MusicList = (props) => {
  console.log("musiclist props", props);

  const albumCards = props.albums.map((album, index) => {
    console.log("album", album);
    console.log("image", album["im:image"][0].label);
    console.log("name", album["im:artist"].label);
    console.log("title", album["im:name"].label);
    console.log("///////////////////");

    return (
      <MusicCard
        key={album.id.attributes["im:id"]}
        img={album["im:image"][0].label}
        artist={album["im:artist"].label}
        title={album["im:name"].label}
        favorite={false}
      />
    );
  });

  return <div className="ui cards">{albumCards}</div>;
};

export default MusicList;
