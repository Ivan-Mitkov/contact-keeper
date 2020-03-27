import React, { Fragment, useContext } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ContactContext from "../../context/contact/contactContext";
import ContactItem from "./ContactItem";

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { contacts, filtered } = contactContext;
  let contactsToShow = contacts.map(contact => (
    <CSSTransition key={contact.id} timeout={500} classNames="item">
      <ContactItem contact={contact} />
    </CSSTransition>
  ));
  if (filtered) {
    contactsToShow = filtered.map(contact => (
      <CSSTransition key={contact.id} timeout={500} classNames="item">
        <ContactItem contact={contact} />
      </CSSTransition>
    ));
  }
  return (
    <Fragment>
      <TransitionGroup>{contactsToShow}</TransitionGroup>
    </Fragment>
  );
};

export default Contacts;
