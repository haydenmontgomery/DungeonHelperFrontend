import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import DungeonHelperApi from "../helpers/Api";
import LoadingSign from "../common/LoadingSign";
import CharacterCardList from "../Character/CharacterCardList"
import "./CampaignDetails.css";

// Campaign Detail page.

function CampaignDetails() {
  const { title } = useParams();

  const [campaign, setCampaign] = useState(null);

  useEffect(function getCampaignAndCharactersForUser() {
    async function getCampaign() {
      setCampaign(await DungeonHelperApi.getCampaign(title));
    }

    getCampaign();
  }, [title]);

  if (!campaign) return <LoadingSign />;
  if (campaign.characters.length === 0) {
    return (
      <>
        <div className="CampaignDetail col-md-8 offset-md-2">
          <p className="CampaignDetail-title">{campaign.title}</p>
          <h4 className="CampaignDetail">{campaign.description}</h4>
          <h5>No characters on this campaign as of yet.</h5>
        </div>
        <div>
          <Link to={`/${title}/join`} className="fancy-btn btn">Join/Request</Link>  
        </div>
    </>
    )
  } else {
    return (
      <>
        <div className="CampaignDetail col-md-8 offset-md-2">
          <p className="CampaignDetail-title">{campaign.title}</p>
          <h4 className="CampaignDetail">{campaign.description}</h4>
          <CharacterCardList characters={campaign.characters} />
        </div>
        <div>
          <Link to={`/${title}/join`} className="fancy-btn btn">Join/Request</Link>  
        </div>
      </>
    );
  }
}

export default CampaignDetails;
