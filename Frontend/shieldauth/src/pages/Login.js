import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const Login = () => {
  const [isCreateAccount, setIsCreateAccount] = useState(false);
  const [name,setName] = useState("");
  const [emailAddress,setEmailAddress] = useState("");
  const [password,setPassword] = useState("");
  const [loading,setLoading] = useState(false);
  const BACKENDURL = "http://localhost:8080/api/v1";
  const navigate = useNavigate();
  const {setIsLoggedIn, getUserData} = useContext(AppContext);

  const submitHandler = async(e) =>{
    e.preventDefault();
    axios.defaults.withCredentials = true;
    setLoading(true);
    try{
        if(isCreateAccount){
            const response = await axios.post(`${BACKENDURL}/register`, {name,emailAddress,password});
            if(response.status === 200){
                navigate("/");
                toast.success("Account Created Successfully!")
            }
            else{
                toast.error("Account Already Exists!")
            }
        }
        else{
            const response = await axios.post(`${BACKENDURL}/login`, {emailAddress,password});
            if(response.status === 200){
                setIsLoggedIn(true);
                getUserData();
                navigate("/");
                toast.success("Login Successfull!");
            }
            else{
                toast.error("EmailAddress or Password is Incorrect!")
            }
        }
    }
    catch(error){
        toast.error(error);
    }
    finally{
        setLoading(false);
    }
  }
  return (
    <div className="login-page">
      <div className="login-header">
        <Link to="/" className="logo-link">
          {" "}
          <img src="/images/Logo.png" alt="Logo" />
          <span className="logo-text">Shield Auth</span>{" "}
        </Link>
      </div>

      <div className="login-card">
        <h2>{isCreateAccount ? "CREATE ACCOUNT" : "LOGIN"}</h2>
        <form onSubmit={submitHandler}>
          {isCreateAccount && (
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                onChange={(e)=>{setName(e.target.value)}}
                value={name}
                required
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="emailAddress" className="form-label">
              Email Address
            </label>
            <input
              type="text"
              name="emailAddress"
              className="form-control"
              onChange={(e)=>{setEmailAddress(e.target.value)}}
              value={emailAddress}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              onChange={(e)=>{setPassword(e.target.value)}}
              value={password}
              required
            />
          </div>

          <div className="forgot-password">
            <Link to="/reset-password">Forgot Password?</Link>
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Loading.." :  isCreateAccount ? "SIGN UP" : "LOGIN"}
          </button>
        </form>

        <div className="account-toggle">
          <p>
            {isCreateAccount ? (
              <>
                Already Have an Account?
                <span className="toggle-link"
                  onClick={() => {
                    setIsCreateAccount(false);
                  }}
                >
                  Login Here
                </span>
              </>
            ) : (
              <>
                Don't Have an Account?
                <span className="toggle-link"
                  onClick={() => {
                    setIsCreateAccount(true);
                  }}
                >
                  Sign Up
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
