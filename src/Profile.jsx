import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import DungeonHelperApi from "./helpers/Api";
import LoadingSign from "./common/LoadingSign";
import CharacterCardList from "./Character/CharacterCardList"
import CampaignCard from "./Campaign/CampaignCard";
import UserContext from "./UserContext";
import "./Profile.css";

// Characters Detail page.

function Profile() {

  const [characters, setCharacters] = useState(null);
  const [campaigns, setCampaigns] = useState(null);
  const { currentUser } = useContext(UserContext);

  useEffect(function getCharactersForUser() {
    async function getCharacters() {
      setCharacters(await DungeonHelperApi.getAllCharacters(currentUser.id));
    }

    async function getCampaigns() {
      setCampaigns(await DungeonHelperApi.getCampaigns(currentUser.id));
    }

    getCharacters();
    getCampaigns();
  }, []);

  if (!campaigns || !characters) return <LoadingSign />;

  
  return (
    <>
      <div className="container pb-3">
        <div className="Campaign col-md-8 offset-md-2 mt-3">
          <div className="scroll">
          {campaigns
            ? (
              <div className="Campaign mt-3">
            {campaigns.map((c, index) => (
              <CampaignCard
              key={index}
              title={c.title}
              description={c.description}
              maxPlayers={c.maxPlayers}
              />
            ))}
            </div>
            ) : (
              <p className="lead">Sorry, could not load campaigns</p>
            )}
          </div>
        </div>
      </div>
      <div className="container">
        <CharacterCardList characters={characters} />
      </div>
    </>
  )
}

export default Profile;