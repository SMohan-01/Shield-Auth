import React, { useContext, useEffect, useRef, useState } from "react";
import "../styles/VerifyEmail.css";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const EmailVerify = () => {
  const inputRef = useRef([]);
  const [loading, setLoading] = useState(false);
  const { isLoggedIn, userData, getUserData, backEndURL } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect( ()=>{
    isLoggedIn && userData && userData.accountVerified && navigate("/");
  }, [isLoggedIn, userData]);

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

  const handleVerify = async () => {
    const otp = inputRef.current.map((input) => input.value).join("");
    if (otp.length !== 6) {
      toast.error("Enter All 6 Digit Number");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(backEndURL + "/verify-email", { otp });
      if (response.status === 200) {
        await getUserData();
        navigate("/");
        toast.success("Email Verified Successfully!");
      } else {
        toast.error("Invalid OTP");
      }
    } catch (error) {
      toast.error("Error While Verifying OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-container">
      <div className="verify-header">
        <Link to="/" className="logo-link">
          <img src="/images/Logo.png" alt="Logo" className="logo" />
          <span className="logo-text">Shield Auth</span>
        </Link>
      </div>

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
          disabled={loading}
          onClick={() => {
            handleVerify();
          }}
        >
          {loading ? "Verifying.." : "Verify Email"}
        </button>
      </div>
    </div>
  );
};

export default EmailVerify;
