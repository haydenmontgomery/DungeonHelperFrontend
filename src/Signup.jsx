import React, {useState} from "react";
import "./Signup.css"
import { useNavigate } from "react-router-dom";

const Signup = ({ signupUser }) => {
  const navigate = useNavigate();
  const INITIAL_STATE = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: ""
  }

  const [formData, setFormData] = useState(INITIAL_STATE)
  const [isInvalid, setIsInvalid] = useState(true);
  const [isTouched, setIsTouched] = useState(false);

  //Once all forms input have been touched, it can submit unless the values are blank.
  function handleChange(e) {
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
  async function handleSubmit(e) {
    e.preventDefault();
    //debugger
      try {
        await signupUser(formData);
        navigate("/campaigns")
      } catch(err){
        console.log(err)
      }
      setIsInvalid(true);
      setIsTouched(false);
  }

  return(
    <>
    <div className="Signup container" style={{height: "100vh"}}>
      <p className="h1 text-center">Signup</p>
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
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input 
          id="firstName"
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Last Name</label>
          <input 
          id="lastName"
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input 
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="form-control"
          />
        </div>
          {isInvalid && isTouched && <span style={{ color: 'red' }}>Please enter all info</span>}
          <button className="fancy-btn btn">Signup</button>
      </form>
    </div>
    </>
  )
}

export default Signup;