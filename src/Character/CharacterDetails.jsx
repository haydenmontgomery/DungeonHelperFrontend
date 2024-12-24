import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DungeonHelperApi from "../helpers/Api";
import LoadingSign from "../common/LoadingSign";
import InventoryBox from "./InventoryBox";
import "./CharacterDetails.css";

// Character Details page.

function CharacterDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [character, setCharacter] = useState(null);
  const [inventory, setInventory] = useState(null);
  const [isInventoryBoxVisible, setIsInventoryBoxVisible] = useState(false);
  const equipRef = useRef(null);
  const [categories, setCategories] = useState(null);
  const [equipment, setEquipment] = useState(null);
  
  const toggleInventory = () => {
    setIsInventoryBoxVisible(!isInventoryBoxVisible);
  };

  /* async function categoriesResponse() {
    try {
      let catRes = await DungeonHelperApi.getEquipmentCategories();
      console.log(catRes)
      return catRes;
    } catch(e) {
      console.error(e);
    }
  } */

 
 const handleEquipmentChange = async (selectedEquipment) => {
   try {
     setEquipment(await DungeonHelperApi.getEquipmentDetails(selectedEquipment));
     console.log(equipment);
    } catch(e){
      console.error(e);
    }
  }
  
  useEffect(function getCharacterAndCharactersForUser() {
    async function getCharacter() {
      setCharacter(await DungeonHelperApi.getCharacter(id));
    }
    async function getCategories(){
      setCategories(await DungeonHelperApi.getEquipmentCategories());
    }
 
    getCharacter();
    getCategories();
  }, [id, inventory]);

  useEffect(() => {
    setTimeout(() => {
      if (equipRef.current) {
        const initialValue = equipRef.current.value;
        setEquipment(initialValue);
        handleEquipmentChange(initialValue);
      }
    }, 100);
  }, []);

  const handleDelete = async (itemToRemove) => {
    try {
      let removed = false;
      character.inventory = character.inventory.filter(item => {
        if (!removed && item === itemToRemove){
          removed = true;
          return false;
        }
        return true;
      });

      await DungeonHelperApi.updateCharacterInventory(character.inventory, id)
      setInventory(character.inventory)
    } catch(e){
      console.error(e);
    }
  };

  const handleAdd = async (itemToAdd) => {
    try {
      character.inventory.push(itemToAdd)
      DungeonHelperApi.updateCharacterInventory(character.inventory, id)
      setInventory(character.inventory)
    } catch(e){
      console.error(e);
    }
  }

  async function handleCharacterDelete(e) {
    e.preventDefault();
    try {
      await DungeonHelperApi.deleteCharacter(id)
      navigate("/profile")
    } catch(err) {
      console.log(err);
    }
  }

  if (!character) return <LoadingSign />;
  return (
    <div className="CharacterDetails col-md-8 offset-md-2">
      <p className="CharacterDetails-title">{character.name}  <button className="btn fancy-btn CharacterDetails-title" onClick={handleCharacterDelete}>Delete</button></p>
      <h4 className="CharacterDetails">{character.bio}</h4>
      <h4></h4>
      <div>
        <form onSubmit={(e) => {
          e.preventDefault();
          const selectedItem = e.target.elements.selectedItem.value;
          handleDelete(selectedItem);
        }}>
          <select 
          ref={equipRef}
          name="selectedItem"
          onChange={(e) => {
            e.preventDefault();
            const selectedEquipment = e.target.value;
            handleEquipmentChange(selectedEquipment);
          }}>
            {character.inventory.map((item, index) => (
              <option key={index} value={item}>{item[0].toUpperCase() + item.slice(1)}</option>
            ))}
          </select>
          <button className="fancy-btn btn fs-5" type="submit">Delete</button>
        </form>
        <div>
          {equipment ? <p className="fs-5">
            {equipment}
          </p>: <p className="fs-5"></p>}
        </div>
        <button onClick={toggleInventory} className="fancy-btn btn fs-5">{isInventoryBoxVisible ? "Close" : "Add Items"}</button>
        {isInventoryBoxVisible && <InventoryBox onClose={toggleInventory} handleAdd={handleAdd} categories={categories.data.results} />}
      </div>
    </div>
  );
}

export default CharacterDetails;
