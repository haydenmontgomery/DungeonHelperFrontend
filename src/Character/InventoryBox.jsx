import React, { useEffect, useState, useRef } from "react";
import DungeonHelperApi from "../helpers/Api";

const InventoryBox = ({ onClose, handleAdd, categories }) => {
  const [categoryName, setCategoryName] = useState("adventuring-gear");
  const [equipment, setEquipment] = useState(null);
  const selectRef = useRef(null)
  const [equipmentList, setEquipmentList] = useState({"equipment":[
    {
      "index": "abacus",
      "name": "Abacus",
      "url": "/api/equipment/abacus"
    },
    {
      "index": "acid-vial",
      "name": "Acid (vial)",
      "url": "/api/equipment/acid-vial"
    },]});


  useEffect(function getEquipmentSearch() {
    async function searchEquipmentFromCategory() {
      const res = await DungeonHelperApi.getEquipmentFromCategory(categoryName);
      console.log(res.data);
      console.log(res.data.equipment[0]);
      setEquipmentList(res.data)
      setEquipment(res.data.equipment[0].index);
    }

    searchEquipmentFromCategory();
    }, [categoryName]);

  const handleChangeCategory = (selectedCategory) => {
    setCategoryName(selectedCategory);
  }

  const handleAddingEquipment = () => {
    console.log(equipment);
    handleAdd(equipment);
  }

  useEffect(() => {
    setTimeout(() => {
      if (selectRef.current) {
        const initialValue = selectRef.current.value;
        setEquipment(initialValue);
      }
    }, 100);
  }, []);

  return (
    <div className="inventory-box">
      <p>ITEMS</p>
      <form>
      <select
      name="selectedCategory" 
      onChange={(e) => {
        e.preventDefault();
        const selectedCategory = e.target.value;
        handleChangeCategory(selectedCategory);
      }}>
        {categories.map((category, index) => (
          <option key={index} value={category.index}>{category.name}</option>
        ))}
      </select>
      </form>
      <form>
      <select 
      ref={selectRef}
      name="selectedEquipment" 
      onChange={(e) => {
        e.preventDefault();
        const selectedEquipment = e.target.value;
        setEquipment(selectedEquipment);
      }}>
        {equipmentList.equipment.map((equipment, index) => (
          <option key={index} value={equipment.index}>{equipment.name}</option>
        ))}
      </select>
      </form>

      <button onClick={handleAddingEquipment} className="fancy-btn btn fs-3">Add Item</button>
      <button onClick={onClose} className="fancy-btn btn fs-3">Close</button>
    </div>
  )
}

export default InventoryBox;