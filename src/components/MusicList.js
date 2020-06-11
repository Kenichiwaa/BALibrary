import React from "react";
import MusicCard from "./MusicCard";

const MusicList = (props) => {
    console.log('props', props)
  const albumCards = props.albums.map(album => {
    return (
      <MusicCard
        key={album.id.attributes["im:id"]}
        img={album["im:image"][0].label}
        artist={album["im:artist"].label}
        title={album["im:name"].label}
        favorite={album.favorite}
        setFavorite={() => this.props.isFavorite}
      />
    );
  });

  return <div className="ui cards five">{albumCards}</div>;
};

export default MusicList;
