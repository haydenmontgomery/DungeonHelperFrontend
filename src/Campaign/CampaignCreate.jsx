import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import DungeonHelperApi from "../helpers/Api";
import UserContext from "../UserContext";

const CampaignCreate = () => {
  const navigate = useNavigate();
  const INITIAL_STATE = {
    title: "",
    description: "",
    maxPlayers: 2,
    publicView: "",
  }

  const { currentUser } = useContext(UserContext);
  const [formData, setFormData] = useState(INITIAL_STATE)
  const [isInvalid, setIsInvalid] = useState(true);
  const [isTouched, setIsTouched] = useState(false);

  //Once all forms input have been touched, it can submit unless the values are blank.
  function handleChange(e) {
    setIsTouched(true);
    console.log(e.target.checked)
    if (e.target.checked) {
      setFormData(formData => ({
        ...formData,
        "publicView": e.target.checked
      }))
    } else {
      const { name, value } = e.target;
      if(value === '') {
        setIsInvalid(true);
      } else {
        setIsInvalid(false);
      }
      setFormData(formData => ({
        ...formData,
        [name]: value
      }))
    }
  }

  //Sends the form data to the parent component and hopefully authenticates.
  async function handleSubmit(e) {
    e.preventDefault();
    //debugger
      try {
        await DungeonHelperApi.createCampaign(formData, currentUser.username);
        navigate("/campaigns")
      } catch(err){
        console.log(err)
      }
      setIsInvalid(true);
      setIsTouched(false);
  }

  return(
    <>
    <div className="container" style={{height: "100vh"}}>
      <p className="h1 text-center">Create Campaign</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 text-start">
          <label htmlFor="title" className="form-label">Title</label>
          <input 
          id="title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="form-control"
          />
        </div>
        <div className="mb-3 text-start">
          <label htmlFor="description" className="form-label">Description</label>
          <input 
          id="description"
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="form-control"
          />
        </div>
        <div className="mb-3 text-start">
          <label htmlFor="maxPlayers" className="form-label">Max Players</label>
          <input 
          id="maxPlayers"
          type="number"
          name="maxPlayers"
          value={formData.maxPlayers}
          onChange={handleChange}
          className="form-control"
          />
        </div>
        <div className="text-start row">
          <input 
          id="publicView"
          type="checkbox"
          name="publicView"
          value={formData.publicView}
          onChange={handleChange}
          className="form-check col-sm-1"
          />
          <div className="col-sm-11">
            <label htmlFor="publicView" className="form-check-label">Public</label>
          </div>
        </div>
          {isInvalid && isTouched && <span style={{ color: 'red' }}>Please enter all info</span>}
          <button className="fancy-btn btn">Create</button>
      </form>
    </div>
    </>
  )
}

export default CampaignCreate;