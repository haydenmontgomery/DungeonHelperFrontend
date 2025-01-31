import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import DungeonHelperApi from "../helpers/Api";
import LoadingSign from "../common/LoadingSign";
import CharacterCardList from "../Character/CharacterCardList";
import UserContext from "../UserContext";
import "./CampaignDetails.css";

// Campaign Detail page.

function CampaignDetails() {
  const { title } = useParams();
  const { currentUser } = useContext(UserContext);
  const [campaign, setCampaign] = useState(null);
  const hasCampaign = useRef(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function getCampaign() {
      const fetchedCampaign = await DungeonHelperApi.getCampaign(title);
      setCampaign(fetchedCampaign);
    }

    getCampaign();
  }, [title]);

  useEffect(() => {
    if (!hasCampaign.current) {
      if (!campaign) return;
      hasCampaign.current = true;
      return;
    }

    if (campaign?.admins) {
      setIsAdmin(campaign.admins.some(admin => admin.admin_id === currentUser.id));
    }
  }, [campaign, currentUser.id]);

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
        {isAdmin &&
        <div>
          <button></button>
        </div>
        }
      </>
    );
  }
}

export default CampaignDetails;
