import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import setAuthToken from "../../utils/setAuthToken";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from "../types";

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem("token"),
    user: null,
    isAuthenticated: null,
    loading: true,
    error: null
  };
  const [state, dispatch] = useReducer(authReducer, initialState);
  //Load user
  const loadUser = async () => {
    //  load token into global header
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      // get user from backend
      const res = await axios.get("/api/auth");
      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (error) {
      dispatch({
        type: AUTH_ERROR
      });
    }
  };

  //Register user
  //call from Register component
  const register = async formData => {
    //need application/json in headers
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    };
    try {
      const res = await axios.post("/api/users", formData, config);
      //send data to the reducer
      //hit routes/api/users
      //send form and wait for response which contains token
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
      //after register user get user from backend and put it into the state
      loadUser();
    } catch (error) {
      //backend send error mesage in msg property
      dispatch({
        type: REGISTER_FAIL,
        payload: error.response.data.msg
      });
    }
  };
  //Login user
  const login = async formData => {
    //need application/json in headers
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    };
    try {
      const res = await axios.post("/api/auth", formData, config);
      //send data to the reducer
      //hit routes/api/users
      //send form and wait for response which contains token
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
      //after register user get user from backend and put it into the state
      loadUser();
    } catch (error) {
      //backend send error mesage in msg property
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data.msg
      });
    }
  };

  //Logout user
  const logout = () => dispatch({type:LOGOUT});

  //Clear errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        loadUser,
        login,
        logout,
        clearErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
