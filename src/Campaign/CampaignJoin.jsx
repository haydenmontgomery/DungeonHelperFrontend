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
  const [errMessage, setErrMessage] = useState(null);

  useEffect(() => {
    async function getCampaign() {
      setCampaign(await DungeonHelperApi.getCampaign(title));
    }
    
    getCampaign();
  }, []);

  const  handleJoin = async (characterId) => {
    try {
      await DungeonHelperApi.addCharacterCampaign(title, currentUser.username, characterId)
      navigate(`/campaigns/${title}`)
    } catch(e) {
      setErrMessage("Join error, please try again later.")
      console.error(e);
    }
  }

  if (!campaign) return <LoadingSign />;
  return (
    <>
    <div>
      <h3>Which character will join the campaign?</h3>
    </div>
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
        <div>
          <span style={{ color: 'red' }}>{errMessage}</span>
        </div>
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
