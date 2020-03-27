import React, { Fragment, useContext } from "react";
import ContactContext from "../../context/contact/contactContext";
import ContactItem from "./ContactItem";

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { contacts, filtered } = contactContext;
  let contactsToShow = contacts.map(contact => (
    <ContactItem key={contact.id} contact={contact} />
  ));
  if (filtered) {
    contactsToShow = filtered.map(contact => (
      <ContactItem key={contact.id} contact={contact} />
    ));
  }
  return <Fragment>{contactsToShow}</Fragment>;
};

export default Contacts;
