import React, {useEffect, useState} from "react";
import SearchForm from "../common/SearchForm";
import DungeonHelperApi from "../helpers/Api";
import LoadingSign from "../common/LoadingSign";
import CampaignCard from "./CampaignCard";
import "./Campaigns.css";


const Campaigns = () => {
  const [campaigns, setCampaigns] = useState(null);

  useEffect(function searchCampaigns() {
    search();
  }, []);


  async function search(title) {
    let res = await DungeonHelperApi.searchCampaign(title);
    setCampaigns(res);
  }

  if (!campaigns) return <LoadingSign />;

  return(
    <div className="container">
        <div className="content">
            <a href={`/campaigns/create`} className="fancy-btn btn btn-sm fs-4">
              Create
            </a>
        <SearchForm searchFor={search} />
        </div>
      <div className="Campaign col-md-8 offset-md-2 mt-3">
        <div className="scroll">
        {campaigns.length
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
            <p className="lead">Sorry, no results were found!</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Campaigns;