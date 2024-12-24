import React, { useState, useContext } from "react";
import DungeonHelperApi from "../helpers/Api";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";

const CharacterCreate = () => {
  const classList = ["barbarian", "bard", "cleric", "druid", "fighter", "monk", "paladin", "ranger", "rogue", "sorcerer", "warlock", "wizard"]
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);

  const INITIAL_STATE = {
    name: "",
    bio: "",
    className: "barbarian",
    age: 1,
    height: "",
    level: 1,
    gold: 0,
    hp: 5,
    profileUrl: "",
    userId: `${currentUser.id}`
  }
  const [formData, setFormData] = useState(INITIAL_STATE)
  const [isInvalid, setIsInvalid] = useState(true);
  const [isTouched, setIsTouched] = useState(false);

  //Once all forms input have been touched, it can submit unless the values are blank.
  function handleChange(e) {
    setIsTouched(true);
    const { name, value } = e.target;
    if(value === '' && name !== profileUrl) {
      setIsInvalid(true);
    } else {
      setIsInvalid(false);
    }
    setFormData(formData => ({
      ...formData,
      [name]: value
    }))
  }

  //Sends the form data to the parent component and hopefully authenticates.
  async function handleSubmit(e) {
    e.preventDefault();
    //debugger
      try {
        await DungeonHelperApi.createCharacter(formData);
        navigate("/profile")
      } catch(err){
        console.log(err)
      }
      setIsInvalid(true);
      setIsTouched(false);
  }

  return(
    <>
    <div className="create container" style={{height: "100vh"}}>
      <p className="h1 text-center">Create Character</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input 
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="bio" className="form-label">Bio</label>
          <input 
          id="bio"
          type="text"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="className" className="form-label">Class</label>
          <select 
          id="className"
          name="className"
          value={formData.className}
          onChange={handleChange}
          className="form-control"
          >
            {classList.map(cl => (
              <option
              value={cl}
              >
                {cl[0].toUpperCase() + cl.slice(1)}
              </option>
              ))
            }
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">Age</label>
          <input 
          id="age"
          type="text"
          name="age"
          value={formData.age}
          onChange={handleChange}
          className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="height" className="form-label">Height</label>
          <input 
          id="height"
          type="text"
          name="height"
          value={formData.height}
          onChange={handleChange}
          className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="level" className="form-label">Level</label>
          <input 
          id="level"
          type="number"
          name="level"
          value={formData.level}
          onChange={handleChange}
          className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="hp" className="form-label">HP</label>
          <input 
          id="hp"
          type="number"
          name="hp"
          value={formData.hp}
          onChange={handleChange}
          className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="gold" className="form-label">Gold</label>
          <input 
          id="gold"
          type="number"
          name="gold"
          value={formData.gold}
          onChange={handleChange}
          className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="profileUrl" className="form-label">Profile URL</label>
          <input 
          id="profileUrl"
          type="text"
          name="profileUrl"
          value={formData.profileUrl}
          onChange={handleChange}
          className="form-control"
          />
        </div>
          {isInvalid && isTouched && <span style={{ color: 'red' }}>Please enter all info</span>}
          <button className="btn fancy-btn">Create Character</button>
      </form>
    </div>
    </>
  )
}

export default CharacterCreate;