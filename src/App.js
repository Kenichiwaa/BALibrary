import React from "react";

const App = () => {
  return (
    <div className="ui container">
      <div className="ui secondary pointing menu">
        <div className="right menu">
          <button className="ui item active">Top Albums</button>
          <button className="ui item">Favorite Albums</button>
        </div>
      </div>
      <div className="ui content">
        <div>{this.state.albums.map((v) => card(v))}</div>
      </div>
    </div>
  );
};
