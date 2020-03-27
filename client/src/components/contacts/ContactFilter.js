import React, { useContext, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import ContactContext from "../../context/contact/contactContext";

const ContactFilter = props => {
  const contactContext = useContext(ContactContext);
  const { filterContacts, clearFilter, filtered } = contactContext;
  const text = useRef("");

  useEffect(() => {
    if (!filtered) {
      text.current.value = "";
    }
  },[filtered]);
  const onChange = e => {
    if (text.current.value !== "") {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };
  return (
    <form>
      <input
        ref={text}
        type="text"
        name=""
        placeholder="Filter Contacts"
        onChange={onChange}
      />
    </form>
  );
};

ContactFilter.propTypes = {};

export default ContactFilter;
