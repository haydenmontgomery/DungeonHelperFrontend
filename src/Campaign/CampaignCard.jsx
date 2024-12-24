import React from "react";
import { Link } from "react-router-dom";
import "./CampaignCard.css";
/** Show limited information about a campaign
 *
 * Is rendered by Campaigns to show a "card" for each campaign.
 *
 * Campaigns -> CampaignCard
 */

function CampaignCard({ title, description, maxPlayers }) {
  return (
    <Link className="CampaignCard card" to={`/campaigns/${title}`}>
      <div className="card-body">
        <h6 className="card-title">
          {title}
          <br></br>
          Max Players: {maxPlayers}
        </h6>
        <p><small>{description}</small></p>
      </div>
    </Link>
  );
}

export default CampaignCard;
