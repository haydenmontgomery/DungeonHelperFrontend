import React from "react";
import DungeonHelperApi from "../helpers/Api";
import "./PlayerList.css";

function PlayerList({ players }) {
  return (
    <div className="window container text-center">
      <div className="row">
        {players.map(p => (
          <div className="col">
            <div className="container">
            <img src={`${p.profileUrl}`}>
            </img>
            <p>
            {p.name}
            </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default PlayerList;