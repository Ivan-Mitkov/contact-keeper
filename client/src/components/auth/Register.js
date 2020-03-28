import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";

const Register = props => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const { setAlert } = alertContext;
  const { register, error, clearErrors, isAuthenticated } = authContext;
  const { name, email, password, password2 } = user;
  //UI showing errors
  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }
    if (error === "User already exist") {
      setAlert(error, "danger");
      clearErrors();
    }
    //eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      setAlert("Please enter all fields", "danger");
    } else if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      register({
        name,
        email,
        password
      });
    }
  };
  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary"> Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            required
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            required
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={onChange}
            minLength="6"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input
            type="password"
            name="password2"
            value={password2}
            minLength="6"
            required
            onChange={onChange}
          />
        </div>
        <input
          type="submit"
          value="Register"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

Register.propTypes = {};

export default Register;
