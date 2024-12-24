import React from "react";
import "./LoadingSign.scss";

/** Loading spinner used by components that fetch API data */

function LoadingSign() {
  return (
    <div className="LoadingSign position-relative">
      <div className="position-absolute start-50">
        <svg className="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
          <circle className="path" fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30"></circle>
        </svg>
      </div>
    </div>
  );
}

export default LoadingSign;