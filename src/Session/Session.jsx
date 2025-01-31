import React, { useState, useEffect, useContext } from "react";
import DungeonHelperApi from "../helpers/Api";
import "./Session.css";
import { useParams } from "react-router-dom";
import PlayerList from "./PlayerList";
import CharacterCardList from "../Character/CharacterCardList";
import UserContext from "../UserContext";
import LoadingSign from "../common/LoadingSign";

const Session = () => {
  const { name } = useParams();
  const { currentUser } = useContext(UserContext);
  console.log(currentUser);
  const [session, setSession] = useState(null);
  useEffect(() => {
    async function fetchPlayers() {
      const data = await DungeonHelperApi.getSession(name);
      setSession(data)
    }

    fetchPlayers();
  }, [name]);

  if (!session) return <LoadingSign />;
  console.log(session.characters);
  return (
    <div className="top container">
      <div className="container window ms-5">
        {/* <CharacterCardList characters={session.characters} /> */}
        <PlayerList players={session.characters} />
      </div>
    </div>
  ) 
}

export default Session;