import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";
import PropTypes from "prop-types";

const ContactForm = props => {
  const contactContext = useContext(ContactContext);
  const { addContact, current, clearCurrent, updateContact } = contactContext;

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal"
  });
  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: "",
        email: "",
        phone: "",
        type: "personal"
      });
    }
  }, [contactContext, current]);
  const { name, email, phone, type } = contact;
  const onChange = e => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (!current) {
      addContact(contact);
    } else {
      updateContact(contact);
    }

    //clear the form
    clearCurrent();
  };

  const clearAll = e => {
    e.preventDefault();
    clearCurrent();
  };
  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">
        {current ? "Edit Contact" : "Add Contact"}
      </h2>
      <input
        type="text"
        name="name"
        value={name}
        onChange={onChange}
        placeholder="Name"
      />
      <input
        type="text"
        name="email"
        value={email}
        onChange={onChange}
        placeholder="Email"
      />
      <input
        type="text"
        name="phone"
        value={phone}
        onChange={onChange}
        placeholder="Phone"
      />
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        checked={type === "personal"}
        onChange={onChange}
        placeholder="type"
      />
      Personal{" "}
      <input
        type="radio"
        name="type"
        value="professional"
        checked={type === "professional"}
        onChange={onChange}
        placeholder="type"
      />
      Professional{" "}
      <div>
        <input
          type="submit"
          value={current ? "Edit Contact" : "Add Contact"}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

ContactForm.propTypes = {};

export default ContactForm;
