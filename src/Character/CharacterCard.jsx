import React from "react";
import "./CharacterCard.css";

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL || "http://localhost:3001";
// Show character information. Is rendered by CharacterCardList to show a "card" for each character.

function CharacterCard({ id, name, characterClass, bio, age, height, level, inventory, gold, hp, profileUrl, userid }) {

  //const { hasAppliedToCharacter, applyToCharacter } = useContext(UserContext);
  //const [applied, setApplied] = useState();

  /* useEffect(function updateAppliedStatus() {
    setApplied(hasAppliedToCharacter(id));
  }, [id, hasAppliedToCharacter]);

  /** Apply for a character */
  /* async function handleApply(evt) {
    if (hasAppliedToCharacter(id)) return;
    applyToCharacter(id);
    setApplied(true);
  } */

  return (
    <div className="CharacterCard card">
      <div className="card-body">
        <h5 className="card-title item-names">{name}</h5>
        {profileUrl 
        ? (
          profileUrl === "/static/images/default_profile.png" 
          ? <img src={`${BASE_URL}${profileUrl}`} alt="Default Profile" /> 
          : <img src={profileUrl} alt="User Profile" />
        ) 
        : <img src={`${BASE_URL}${profileUrl}`} alt="Fallback Profile" />
        }
      {/* <p>{bio}</p> */}
        <div className="conatiner text-center">
          <div className="row">
            <div className="col-6">
              <h4 className="item-names">Class</h4>
              <h5 className="item-values">{characterClass}</h5>
            </div>
            <div className="col-6">
              <h4 className="item-names">Level</h4>
              <h5 className="item-values">{level}</h5>
            </div>
            <div className="col-6">
              <h4 className="item-names">HP</h4>
              <h5 className="item-values">{hp}</h5>
            </div>
            <div className="col-6">
              <h4 className="item-names">Gold</h4>
              <h5 className="item-values">{gold}</h5>
            </div>
          </div>
        </div>
        <a href={`/characters/${id}`} className="stretched-link"></a>
      </div>
    </div>
  );
}

export default CharacterCard;