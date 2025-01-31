import React from "react";
import DungeonHelperApi from "../helpers/Api";
import "./PlayerList.css";

function PlayerList({ players }) {
  console.log(players)
  return (
    <div className="container contacts text-center ps-5">
      <div className="row">
        {players.map(p => (
          <div className="col">
            <div className="container">
            {/* <img src={`${p.profileUrl}`} /> */}
            <p className="fs-5">
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