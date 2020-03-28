import React, { Fragment, useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ContactContext from "../../context/contact/contactContext";
import ContactItem from "./ContactItem";
import Spinner from "../../components/layout/Spinner";

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { contacts, filtered, getContacts, loading } = contactContext;
  useEffect(() => {
    getContacts();
    //eslint-disable-next-line
  }, []);

  let contactsToShow =contacts&& contacts.map(contact => (
    <CSSTransition key={contact._id} timeout={500} classNames="item">
      <ContactItem contact={contact} />
    </CSSTransition>
  ));
  if (filtered) {
    contactsToShow = filtered.map(contact => (
      <CSSTransition key={contact._id} timeout={500} classNames="item">
        <ContactItem contact={contact} />
      </CSSTransition>
    ));
  }
  return (
    <Fragment>
      {contacts !== null && !loading ? (
        <TransitionGroup>{contactsToShow}</TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Contacts;
