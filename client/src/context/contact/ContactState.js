import React, { useReducer } from "react";
import {v4 as uuid4} from "uuid";
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
      },
      {
        type: "personal",
        _id: "3",
        name: "Ivan Ivanov",
        email: "ivan@asd.com",
        phone: "08888888",
        user: "5e7b7e57d7c9d938fcb7cf0d"
      }
    ]
  };
  const [state, dispatch] = useReducer(contactReducer, initialState);

  //Add contact
  const addContact=(contact)=>{
    contact.id=uuid4()
    dispatch({type:ADD_CONTACT,payload:contact})
  }

  //Delete contact

  //Set current contact

  //Clear Current Contact

  //Update contact

  //Filter Contacts

  //Clear Filters


  return(
      <ContactContext.Provider value={{
        contacts:state.contacts,
        addContact
      }}>
          {props.children}
      </ContactContext.Provider>
  )
};

export default ContactState;
