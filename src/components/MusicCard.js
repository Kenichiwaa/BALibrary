import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const ImgCard = styled.div`
&.ui.card {
  width: 200px;
  text-align: center;
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

const MusicCard = ({album, key, setFavorite, openModel}) => {
  const id = album.id.attributes["im:id"];
  const img = album["im:image"][2].label;
  const artist = album["im:artist"].label;
  const title = album["im:name"].label;
  const favorite = album.favorite;

  return (
    <ImgCard className="ui card" onClick={openModel} id={id}>
      <div className="image" >
        <img src={img} />
      </div>
      <ArtistName className="header">{artist}</ArtistName>
      <ArtistTitle className="title">{title}</ArtistTitle>
      <FavoriteWrapper>
        <FavoriteIcon className="favorite icon" onClick={setFavorite} id={id} isFavorite={favorite} />
      </FavoriteWrapper>
    </ImgCard>
  );
};

// MusicCard.PropTypes = {
// };

// MusicCard.defaultProps = {};

export default MusicCard;
