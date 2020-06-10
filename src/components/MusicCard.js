import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const ImgCard = styled.div`
  width: 200px !important;
  text-align: center;
  padding: 1em !important;
  background-color: lightgray !important;
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

const MusicCard = (album) => {
  console.log("alvumb", album);
  const key = album.info.id.attributes["im:id"];
  const img = album.info["im:image"][0].label;
  const artist = album.info["im:artist"].label;
  const title = album.info["im:name"].label;

  return (
    <ImgCard className="ui card">
      <div className="image">
        <img src={img} />
      </div>
      <ArtistName className="header">{artist}</ArtistName>
      <ArtistTitle className="title">{title}</ArtistTitle>
      <FavoriteWrapper>
        <FavoriteIcon className="favorite icon" />
      </FavoriteWrapper>
    </ImgCard>
  );
};

MusicCard.propTypes = {};

MusicCard.defaultProps = {};

export default MusicCard;
