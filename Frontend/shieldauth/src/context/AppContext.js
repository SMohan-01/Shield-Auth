import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {

  axios.defaults.withCredentials = true;

  const backEndURL = "http://localhost:8080/api/v1";
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(false);

  const getUserData = async () => {
    try {
      const response = await axios.get(backEndURL + "/profile");
      if (response.status === 200) {
        setUserData(response.data);
      } else {
        toast.error("Unable to Retrieve Data");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // const getAuthState = async () => {
  //   try {
  //     const response = await axios.get(backEndURL + "/is-authenticated");
  //     if (response.status === 200 && response.data === true) {
  //       setIsLoggedIn(true);
  //       await getUserData();
  //     } else {
  //       setIsLoggedIn(false);
  //     }
  //   } catch (error) {
  //     if (error.response) {
  //       const message = error.response?.data.message || "Authentication Error";
  //       //toast.error(message);
  //     } else {
  //       //toast.error(error.message);
  //     }
  //     setIsLoggedIn(false);
  //   }
  // };

  const contextValue = {
    backEndURL,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData,
  };

  // useEffect(() => {
  //   getAuthState();
  // }, []);

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};
