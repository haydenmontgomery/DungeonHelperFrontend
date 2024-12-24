import React, { useState } from "react";
import "./Login.css"
import { useNavigate } from "react-router-dom";

const Login = ({ loginUser }) => {
  const navigate = useNavigate();
  const INITIAL_STATE = {
    username: "",
    password: ""
  }

  const [formData, setFormData] = useState(INITIAL_STATE)
  const [isInvalid, setIsInvalid] = useState(true);
  const [isTouched, setIsTouched] = useState(false);

  //Once all forms input have been touched, it can submit unless the values are blank.
  const handleChange = (e) => {
    setIsTouched(true);
    const { name, value } = e.target;
    if(value === '') {
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!isInvalid) {
      try {
        await loginUser({...formData});
        navigate("/campaigns")
      } catch(err){
        console.log(err)
      }
      setIsInvalid(true);
      setIsTouched(false);
    }
  }
  return(
    <>
    <div className="Login container" style={{height: "100vh"}}>
      <p className="h1 text-center">Login</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input 
          id="username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input 
          id="password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="form-control"
          />
        </div>
          {isInvalid && isTouched && <span style={{ color: 'red' }}>Please enter all info</span>}
          <button className="fancy-btn btn">Login</button>
      </form>
    </div>
    </>
  )
}

export default Login;