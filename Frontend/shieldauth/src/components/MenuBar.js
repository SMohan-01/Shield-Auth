import React, { useContext, useEffect, useRef, useState } from "react";
import "../styles/MenuBar.css";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MenuBar = () => {
  const navigate = useNavigate();
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const dropDownRef = useRef(null);
  const { userData, backEndURL, setIsLoggedIn, setUserData} = useContext(AppContext);

  const sendOtp = async() =>{
    axios.defaults.withCredentials = true;
    try{
            const response = await axios.post(backEndURL+"/send-otp");
            if(response.status === 200){
                navigate("/verify-email");
                toast.success("OTP Has Been Sent Successfully!")
            }
            else{
                toast.error("Unable to Send OTP")
            }
        }
    catch(error){
        toast.error(error);
    }
  }

  useEffect( () =>{
    const handleClickOutside = (event)=>{
        if(dropDownRef.current && !dropDownRef.current.contains(event.target)){
            setIsDropDownOpen(false);
        }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return ()=> document.removeEventListener("mousedown", handleClickOutside);
  },[])

  const handleLogout = async(e) =>{
    axios.defaults.withCredentials = true;
    try{
            const response = await axios.post(backEndURL + "/logout");
            if(response.status === 200){
                setIsLoggedIn(false);
                setUserData(false);
                navigate("/");
                toast.success("Logout Successfull!")
            }
            else{
                toast.error("Error While Logout")
            }
    }
    catch(error){
        toast.error(error);
    }
  }
  return (
    <nav className="menu-bar">
      <div className="menu-logo">
        <img src="/images/Logo.png" alt="Logo" />
        <span className="menu-title">Shield Auth</span>
      </div>

      {userData ? (
        <div className="dropdown-container" ref={dropDownRef}>
          <div
            className="user-avatar"
            onClick={() => setIsDropDownOpen((prev) => !prev)}
          >
            {userData.name[0].toUpperCase()}
          </div>

          {isDropDownOpen && (
            <div className="dropdown-menu">
              {!userData.accountVerified && (
                <div className="dropdown-item" onClick={()=>{sendOtp()}}>Verify Email</div>
              )}
              <div className="dropdown-item" onClick={()=>{handleLogout()}}>Logout</div>
            </div>
          )}
        </div>
      ) : (
        <div className="login-container">
          <button
            className="log-button"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login <span className="arrow">→</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default MenuBar;
