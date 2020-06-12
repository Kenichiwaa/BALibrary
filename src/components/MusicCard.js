import React from "react";
import styled from "styled-components";

const ImgCard = styled.div`
  &.ui.card {
    margin-bottom: 1em;
    width: 180px;
    padding: 1em;
    background-color: lightgray;
  }
`;

const ArtistName = styled.div`
  font-weight: bolder;
  padding: 0.5em;
`;

const ArtistTitle = styled.div``;

const FavoriteWrapper = styled.div`
  padding-top: 1em;
`;

const FavoriteIcon = styled.i`
  color: ${({ isFavorite }) => (isFavorite ? "yellow" : "black")};
`;

const MusicCard = ({ album, setFavorite, openModel }) => {
  const id = album.id.attributes["im:id"];
  const img = album["im:image"][2].label;
  const artist = album["im:artist"].label;
  const title = album["im:name"].label;
  const favorite = album.favorite;

  return (
    <ImgCard className="ui card" onClick={openModel} id={id}>
      <div className="image" id={id}>
        <img src={img} id={id} alt={title} />
      </div>
      <ArtistName className="header" id={id}>
        {artist}
      </ArtistName>
      <ArtistTitle className="title" id={id}>
        {title}
      </ArtistTitle>
      <FavoriteWrapper id={id}>
        <FavoriteIcon
          className="favorite icon"
          onClick={setFavorite}
          id={id}
          isFavorite={favorite}
        />
      </FavoriteWrapper>
    </ImgCard>
  );
};

export default MusicCard;
