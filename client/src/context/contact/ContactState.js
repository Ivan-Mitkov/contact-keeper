import React, { useReducer } from "react";
import uuid from "uuid";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";

import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from "../types";

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        type: "professional",
        id: "2",
        name: "John Doe",
        email: "john@asd.com",
        phone: "088888887"
      },
      {
        type: "professional",
        _id: "1",
        name: "Ivan Ivanov",
        email: "ivan@asd.com",
        phone: "08888888",
        user: "5e7b7e57d7c9d938fcb7cf0d"
      }
    ]
  };
  const [state, dispatch] = useReducer(contactReducer, initialState, init);

  //Add contact

  //Delete contact

  //Set current contact

  //Clear Current Contact

  //Update contact

  //Filter Contacts

  //Clear Filters


  return(
      <ContactContext.Provider value={{
        contacts:state.contacts
      }}>
          {props.children}
      </ContactContext.Provider>
  )
};

export default ContactState;
