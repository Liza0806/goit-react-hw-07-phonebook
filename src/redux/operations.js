import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const addContact = createAsyncThunk(
    "contacts/push",
    async (newContact) => {
      try {
        const response = await axios.post('contacts', {
          name: newContact.name,
          phone: newContact.number,
          createdAt: Date.now(),
        });
        return response.data;
      }  catch (error) {
        throw new Error('Failed to add contact: ' + error.message);
      }
    }
  );

export const deleteContact = createAsyncThunk(
    "contacts/delete",
    async (id) => {
      try{
       const response = await axios.delete(`contacts/${id}`) 
       // console.log(response.data, "респонс в делит")
       return response.data;
      
      }
      catch (error) {
        throw new Error('Failed to delete contact: ' + error.message);
      }
    }
  );
  
export const getAllContacts = createAsyncThunk(
    "contacts/get",
  
    async () => {
      try {
        const response = await axios.get('contacts');
       //  console.log(response)
        return response.data;
      }  catch (error) {
        throw new Error('Failed to fetch contacts: ' + error.message);
      }
    }
  );

export const handleFulfilled = (state, action, callback) => {
    state.items = callback(action.payload);
    state.isLoading = false;
    state.error = null;
  };
  
export const handleRejected = (state, action) => {
    state.isLoading = false;
    state.error = action.error.message;
  };
  
export const handlePending = (state) => {
    state.isLoading = true;
    state.error = null;
  };
  