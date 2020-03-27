import React, { useState, useContext } from "react";
import ContactContext from "../../context/contact/contactContext";
import PropTypes from "prop-types";

const ContactForm = props => {
  const contactContext = useContext(ContactContext);
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal"
  });

  const { name, email, phone, type } = contact;
  const onChange = e => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    contactContext.addContact(contact);
    //clear the form
    setContact({ name: "", email: "", phone: "", type: "personal" });
  };
  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">Add Contact</h2>
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
          value="Add Contact"
          className="btn btn-primary btn-block"
        />
      </div>
    </form>
  );
};

ContactForm.propTypes = {};

export default ContactForm;
