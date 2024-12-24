import React, { useContext } from "react";

import { Link, NavLink} from "react-router-dom"
import UserContext from "./UserContext";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import "./NavBar.css"

function NavBar({ logout }) {
  const { currentUser } = useContext(UserContext);

  function loggedOut() {
    return (
      <Navbar className="navbar-expand-lg bg-body-tertiary fixed-top mt-3">
        <Container class="container-fluid col">
        <Navbar.Collapse className="justify-content-center">
          <Navbar.Brand href="">
            <NavLink to="/" className="fancy-btn fs-3 navbar-brand fs-1">
              Dungeon Helper
            </NavLink>
          </Navbar.Brand>
        {/* Need some authentication to change it up and add the job links */}
              <Navbar.Brand href="">
                <NavLink to="/auth/login" className="fancy-btn fs-3 mx-2">Login</NavLink>
              </Navbar.Brand>
              <Navbar.Brand href="">
                <NavLink to="/auth/signup" className="fancy-btn fs-3 mx-2">Sign Up</NavLink>
              </Navbar.Brand>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
    function loggedIn() {
      return (
        <Navbar expand="md" className="bg-body-tertiary fixed-top mt-3">
          <Container className="col">
            <Navbar.Collapse className="justify-content-center">
            <Navbar.Brand href="">
              <NavLink to="/" className="fancy-btn fs-3 navbar-brand fs-1">
                Dungeon Helper
              </NavLink>
            </Navbar.Brand>
            <Navbar.Toggle />

              <Navbar.Brand>
                <NavLink to="/campaigns" className="fancy-btn fs-3 fs-1 mx-2">Campaigns</NavLink>
              </Navbar.Brand>
              <Navbar.Brand>
                <NavLink to="/characters" className="fancy-btn fs-3 fs-1 mx-2">Characters</NavLink>
              </Navbar.Brand>
              <Navbar.Brand>
                <NavLink to="/profile" className="fancy-btn fs-3 fs-1 mx-2">Profile</NavLink>
              </Navbar.Brand>
              <Navbar.Brand>
                <Link to="/" onClick={logout} className="fancy-btn fs-3 fs-1 mx-2">
                Logout {currentUser.firstName || currentUser.username} 
                </Link>
              </Navbar.Brand>

          </Navbar.Collapse>

          </Container>
        </Navbar>
      )
    }

  return (
    <div className="NavBar">
    {currentUser ? loggedIn() : loggedOut()}
    </div>
  )
}

export default NavBar;