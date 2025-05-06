import React, { useContext, useRef, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ResetPassword.css"
import { toast } from "react-toastify";

const ResetPassword = () => {
  const inputRef = useRef([]);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSend, setIsEmailSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
  const { isLoggedIn, userData, getUserData, backEndURL } =
    useContext(AppContext);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, "");
    e.target.value = value;
    if (value && index < 5) {
      inputRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").slice(0, 6).split("");
    paste.forEach((digit, i) => {
      if (inputRef.current[i]) {
        inputRef.current[i].value = digit;
      }
    });
    const next = paste.length < 6 ? paste.length : 5;
    inputRef.current[next].focus();
  };

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(backEndURL + "/send-reset-otp?emailAddress=" + email);
      console.log(response);
      if (response.status === 200) {
        toast.success("OTP Sent Successfully!");
        setIsEmailSent(true);
      } else {
        toast.error("Something went wrong.., Try Again Later");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = ()=> {
    const otp = inputRef.current.map((input) => input.value).join("");
    if (otp.length !== 6) {
      toast.error("Enter All 6 Digit Number");
      return;
    }
    setOtp(otp);
    setIsOtpSubmitted(true);

  }

  const onSubmitNewPassword = async(e)=> {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(backEndURL + "/reset-password", {emailAddress : email, newPassword, otp });
      if (response.status === 200) {
        toast.success("Password Reset Sucessfully!");
        navigate("/login");
      } else {
        toast.error("Something went wrong, Try Again Later");
      }
    } catch (error) {
      toast.error("Error While Resetting the Password");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="reset-page">
      <div className="reset-header">
        <Link to="/" className="logo-link">
          <img src="/images/Logo.png" alt="Logo" className="logo-img" />
          <span className="logo-text">Shield Auth</span>
        </Link>
        </div>

        {!isEmailSend && (
          <div className="reset-card">
            <h4 className="reset-title">Reset Password</h4>
            <p className="reset-subtitle">Enter Your Registered Email Address</p>
            <form className="reset-form" onSubmit={onSubmitEmail}>
              <div className="reset-input-container">
                <input className="reset-input"
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                  required
                />
              </div>

              <button type="submit" className="reset-button" disabled={loading}>{loading ? "Loading.." : "Submit"}</button>
            </form>
          </div>
        )}

        {!isOtpSubmitted && isEmailSend && (
            <div className="verify-card">
            <h4>Email Verification</h4>
            <p>Enter the 6-digit code sent to your email address.</p>
    
            <div className="code-inputs">
              {[...Array(6)].map((_, i) => (
                <input
                  key={i}
                  type="text"
                  maxLength={1}
                  className="code-box"
                  ref={(el) => {
                    inputRef.current[i] = el;
                  }}
                  onChange={(e) => {
                    handleChange(e, i);
                  }}
                  onKeyDown={(e) => {
                    handleKeyDown(e, i);
                  }}
                  onPaste={(e) => {
                    handlePaste(e);
                  }}
                />
              ))}
            </div>
    
            <button
              className="verify-button"
              disabled={loading} onClick={()=>{handleVerify()}}
            >
              {loading ? "Verifying.." : "Verify Email"}
            </button>
          </div>
        )}

        {isOtpSubmitted && isEmailSend && (
            <div className="reset-card">
            <h4 className="reset-title">New Password</h4>
            <p className="reset-subtitle">Enter Your New Password Below</p>
            <form className="reset-form" onSubmit={onSubmitNewPassword}>
              <div className="reset-input-container">
                <input className="reset-input"
                  type="password"
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                  value={newPassword}
                  required
                />
              </div>

              <button type="submit" className="reset-button" disabled={loading}>
              {loading ? "Loading.." : "Submit"}
              </button>
            </form>
          </div>
        )}
    </div>
  );
};

export default ResetPassword;
