import React, { useContext } from "react";
import "./Home.css"
import { Link } from "react-router-dom";
import UserContext from "./UserContext";

const Home = () => {
  const { currentUser } = useContext(UserContext);

  return(
    <>
    <div style={{height: "100vh"}} className="Home">
      <div className="container text-center">
        <p className="lead text-center fs-1 my-4 fw-bold">DungeonHelper</p>
        <h4 className="lead text-center pt-4 mb-4">Track your character's stats and play with others!</h4>
        {currentUser
          ? <h2>
            Welcome Back, {currentUser.firstName || currentUser.username}!
          </h2>
          : (
            <p className="login-btns text-center">
              <Link className="fancy-btn btn mx-3" to="/auth/login">Login</Link>
              <Link className="fancy-btn btn" to="/auth/signup">Signup</Link>
            </p>
          )}
      </div>
    </div>
    </>
  )
}

export default Home;