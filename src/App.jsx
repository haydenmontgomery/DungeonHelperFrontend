import React, { useState, useEffect, useRef } from 'react'
import DungeonHelperApi from './helpers/Api'
import './App.css'
import NavBar from './NavBar'
import RouteList from './RouteList'
import { jwtDecode } from 'jwt-decode'
import useLocalStorageState from './hooks/useLocalStorageState'
import UserContext from './UserContext'
import LoadingSign from './common/LoadingSign'
import ParchmentEffect from './ParchmentEfect'

export const TOKEN_STORAGE = "react-token"

function App() {

  const [token, setToken] = useLocalStorageState(TOKEN_STORAGE);
  const [currentUser, setCurrentUser] = useState({
    data: null,
    infoLoaded: false
  });

  useEffect(
    function loadUser() {
      async function getCurrentUser() {
        if (token) {
          try {
            let { username } = jwtDecode(token)
            DungeonHelperApi.token = token;
            let currentUser = await DungeonHelperApi.getCurrentUser(username);
            setCurrentUser({
              infoLoaded: true,
              data: currentUser
            });
          } catch (err) {
            console.log("ERR STATEMENT", err)
            setCurrentUser({
              data: null,
              infoLoaded: true,
            });
          }
        } else {
          setCurrentUser({
            infoLoaded: true,
            data: null
          });
        }
      }
      getCurrentUser();
    }, [token]);

  // Signup function. Calls the signup request on our api and sets the current token to the user.
  async function signupUser(signupData) {
    let token = await DungeonHelperApi.signUp(signupData);
    setToken(token);
  }  

  // Login function. Calls the login request on our api and sets the current token to the user.
  async function loginUser(loginData) {
    const token = await DungeonHelperApi.loginUser(loginData);
    setToken(token);
  }

  // Handles logging out.
  function logout() {
    setCurrentUser({
      infoLoaded: true,
      data: null
    });
    setToken(null);
  }

  // Spinner display while loading.
  if (!currentUser.infoLoaded) return <LoadingSign />;

  return (
    <UserContext.Provider
      value={{
        currentUser: currentUser.data,
        setCurrentUser,
      }}
    >
      <ParchmentEffect />
      <main>
        <div className='top-contain'>
          <div className='stick'>
            <NavBar logout={logout} />
          </div>
          <div className='other'>
            <RouteList currentUser={currentUser.data} loginUser={loginUser} signupUser={signupUser}></RouteList>
          </div>
        </div>
      </main>
    </UserContext.Provider>
  )
}

export default App
