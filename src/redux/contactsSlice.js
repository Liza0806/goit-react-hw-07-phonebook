import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { addContact, deleteContact, getAllContacts, handleFulfilled, handlePending, handleRejected } from './operations'
import { initialState } from './state'

axios.defaults.baseURL = 'https://652698e9917d673fd76c9c39.mockapi.io/contacts/';

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllContacts.fulfilled, (state, action) => {
        handleFulfilled(state, action, (payload) => payload);
      })
      .addCase(getAllContacts.rejected, (state, action) => {
        handleRejected(state, action);
      })
      .addCase(getAllContacts.pending, (state) => {
        handlePending(state);
      })
      .addCase(addContact.fulfilled, (state, action) => {
        handleFulfilled(state, action, (payload) => [...state.items, payload]);
      })
      .addCase(addContact.rejected, (state, action) => {
        handleRejected(state, action);
      })
      .addCase(addContact.pending, (state) => {
        handlePending(state);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        handleFulfilled(state, action, (payload) => state.items.filter(contact => contact.id !== payload.id));
      })
      .addCase(deleteContact.rejected, (state, action) => {
        handleRejected(state, action);
      })
      .addCase(deleteContact.pending, (state) => {
        handlePending(state);
      });
  },
});

export const { searchContact } = contactsSlice.actions;

export default contactsSlice.reducer;
