import React from "react";
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const album = this.props.album;
    return (
      <div className="ui card">
        <div className="image">
          <img />
          <div className="content">
            <a className="header">Kristy</a>
            <div className="description">Description</div>
            <div className="description">Description</div>
          </div>
          <div className="extra content">
            <a>
              <i className="user icon"></i>
              22 Friends
            </a>
          </div>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  key: PropTypes.string,
  img: PropTypes.string,
  name: PropTypes.string,
  title: PropTypes.string,
  favorite: PropTypes.bool,
};

MusicCard.defaultProps = {
  key: '11111111',
  img: null,
  name: 'ABLibrary',
  title: 'title',
  favorite: false,
};

export default MusicCard;
