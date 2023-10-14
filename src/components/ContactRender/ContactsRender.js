import {ContactsList,
       ContactItem,
       ContactName,
       ContactNumber,
       DeleteButton} from "./ContactsRender.styled.jsx"
import { deleteContact } from "../../redux/operations";
import { useSelector, useDispatch } from "react-redux";
import { getAllContacts } from "../../redux/operations";
import { useEffect } from "react";

export const ContactsRender = () => {
   const dispatch = useDispatch();
   
   const contacts = useSelector((state) => state.contacts.items);
   const filter = useSelector((state) => state.filter.filter);
   const filteredContacts = contacts?.filter(contact => contact.name.toLowerCase().includes(filter))
   useEffect(() => {
    dispatch(getAllContacts());
  }, [dispatch]);
// console.log(contacts)
    return (
      <ContactsList>
        { ( filteredContacts? filteredContacts : contacts).map(contact => (
          <ContactItem key={contact.id}>
          <ContactName> name: {contact.name},</ContactName><ContactNumber>tel: {contact.phone}</ContactNumber>
            <DeleteButton onClick={() => dispatch(deleteContact(contact.id))}>X</DeleteButton>
          </ContactItem>
        ))}
      </ContactsList>
    );
  };
