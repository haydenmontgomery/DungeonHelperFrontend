import React, { useState, useEffect, useContext, useRef } from "react";
import DungeonHelperApi from "../helpers/Api";
import { useParams, useNavigate } from "react-router-dom";
import LoadingSign from "../common/LoadingSign";
import UserContext from "../UserContext";
import "./CampaignJoin.css";

// Campaign Detail page.

function CampaignJoin() {
  const { title } = useParams();
  const navigate = useNavigate();

  const { currentUser } = useContext(UserContext);

  const [campaign, setCampaign] = useState(null);

  useEffect(() => {
    async function getCampaign() {
      console.log(currentUser);
      setCampaign(await DungeonHelperApi.getCampaign(title));
    }
    
    getCampaign();
  }, []);

  const  handleJoin = async (characterId) => {
    try {
      await DungeonHelperApi.addCharacterCampaign(title, currentUser.username, characterId)
      navigate(`/campaigns/${title}`)
    } catch(e) {
      console.error(e);
    }
  }

  if (!campaign) return <LoadingSign />;
  return (
    <>
    <div className="CampaignJoin col-md-8 offset-md-2">
      <form onSubmit={(e) => {
        e.preventDefault();
        const selectedCharacter = e.target.elements.selectedCharacter.value;
        handleJoin(selectedCharacter);
      }}>
        <select
        name="selectedCharacter"
         >
        {currentUser.characters.map(ch => (
          <option
          key={ch.id}
          value={ch.id}
          label={ch.name}
          >
          </option>
        ))}
        </select>
        {campaign.characters.length < campaign.maxPlayers ? (
          campaign.admins.some(admin => admin.admin_id === currentUser.id) ? (
            <button className="fancy-btn btn fs-5" type="submit">Join</button>
          ) : (
            <button className="fancy-btn btn fs-5" type="submit">Request</button>
          )
         ) :
         <h4>Campaign Character Limit Reached</h4> 
        }
      </form>
    </div>
    </>
  );
}

export default CampaignJoin;
