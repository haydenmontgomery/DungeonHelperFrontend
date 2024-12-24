import React, { useState } from "react";
import "./SearchForm.css"

const SearchForm = ({ searchFor }) => {
  const [searchTerm, setSearchTerm] = useState("");


  //Handles the search submit. Sends search for to parent
  const handleSubmit = (evt) => {
    evt.preventDefault();
    searchFor(searchTerm.trim() || undefined);
    console.log("Search Term:", searchTerm);
    setSearchTerm(searchTerm.trim());
  }

  // Sets the search term on submit
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  }

  return (
    <div className="form-group row justify-content-center">
      <div className="col-3">
        <input
        className="form-control"
        type="form-control form-control-lg"
        name="searchTerm"
        placeholder="Enter search term"
        value={searchTerm}
        onChange={handleChange}
        />
      </div>
      <div className="col-1">
        <button 
        onClick={handleSubmit}
        type="submit"
        className="fancy-btn-search btn"
        >
          Submit
        </button>

      </div>
    </div>
  )
}

export default SearchForm