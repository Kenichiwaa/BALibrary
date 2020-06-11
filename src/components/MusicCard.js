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

const MusicCard = (info, setFavorite) => {
  const id = info.info.id.attributes["im:id"];
  const img = info.info["im:image"][0].label;
  const artist = info.info["im:artist"].label;
  const title = info.info["im:name"].label;
  const favorite = info.info.favorite

  const openModal = () => {
    alert(id)
  }

  return (
    <ImgCard className="ui card" onClick={openModal}>
      <div className="image">
        <img src={img} />
      </div>
      <ArtistName className="header">{artist}</ArtistName>
      <ArtistTitle className="title">{title}</ArtistTitle>
      <FavoriteWrapper>
        <FavoriteIcon className="favorite icon" onClick={info.setFavorite} id={id} isFavorite={favorite} />
      </FavoriteWrapper>
    </ImgCard>
  );
};

MusicCard.propTypes = {};

MusicCard.defaultProps = {};

export default MusicCard;
