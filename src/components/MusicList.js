import React from "react";
import MusicCard from "./MusicCard";

// import './ImageList.css'

const MusicList = (props) => {
  console.log("musiclist props", props);

  const albumCards = props.albums.map((album, index) => {
    console.log("album", album);
    console.log("album", album.id.attributes["im:id"]);
    console.log("album", album["im:image"][0].label);
    return <MusicCard
                key={album.id.attributes["im:id"]} 
                img={album["img:image"]}
                name={'name'}
                title={'title'}
                favorite={false}
            />;
  });

  return <div className="container">{albumCards}</div>;
};

export default MusicList;
