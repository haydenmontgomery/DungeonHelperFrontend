import React, { useState, useEffect, useContext } from "react";
import DungeonHelperApi from "../helpers/Api";
import "./Session.css";
import { useParams } from "react-router-dom";
import PlayerList from "./PlayerList";
import UserContext from "../UserContext";

const Session = () => {
  const { name } = useParams();
  const { currentUser } = useContext(UserContext);

  const [session, setSession] = useState([]);
  useEffect(() => {
    const fetchPlayers = async () => {
      const data = await DungeonHelperApi.getSession(name);
      setSession(data)
    }
    fetchPlayers();
  }, [])
  return (
    <div className="top container">
      <div className="window">
      <PlayerList players={session.players} />
      </div>
    </div>
  ) 
}



export default Session;