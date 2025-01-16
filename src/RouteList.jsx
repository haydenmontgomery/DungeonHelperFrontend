import { Routes, Route, Navigate } from "react-router-dom"
import Home from "./Home";
import CampaignDetails from "./Campaign/CampaignDetails";
import Campaigns from "./Campaign/Campaigns";
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";
import CharacterDetails from "./Character/CharacterDetails";
import CampaignCreate from "./Campaign/CampaignCreate";
import CampaignJoin from "./Campaign/CampaignJoin";
import CharacterCreate from "./Character/CharacterCreate";
import Session from "./Session/Session";

function RouteList({ currentUser, loginUser, signupUser }) {
  return (
    <Routes>
      {!currentUser &&
      <>
        <Route
        path="/auth/login"
        element={<Login loginUser={loginUser}/>}
        />
        <Route
        path="/auth/signup"
        element={<Signup signupUser={signupUser}/>}
        />
      </>
      }
      <Route
      path="/"
      element={<Home />}
      />

      {currentUser &&
      <>
        <Route
        path="/campaigns"
        element={<Campaigns />}
        />
        <Route
        path="/campaigns/:title"
        element={<CampaignDetails />}
        />
        <Route
        path="/campaigns/create"
        element={<CampaignCreate />}
        />
        <Route 
        path={`/:title/join`}
        element={<CampaignJoin />} 
        />
        <Route
        path="/sessions/"
        element={<Session />}
        />
        <Route
        path="/profile"
        element={<Profile />}
        />
        <Route
        path="/characters/:id"
        element={<CharacterDetails />}
        />
        <Route 
        path={`/characters`}
        element={<CharacterCreate />} 
        />
      </>
      }
      <Route path="*" element={<Navigate to="/" />}/>
    </Routes>
  )
}

export default RouteList;