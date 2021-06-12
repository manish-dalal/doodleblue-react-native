import { createSlice } from '@reduxjs/toolkit';
import findIndex from 'lodash/findIndex';
import data from './data.json';

const initialState = {
  contacts: data,
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    upsertContact: (state, action) => {
      const index = findIndex(state.contacts, e => e.id === action.payload.id);
      if (index !== -1) {
        state.contacts[index] = { ...state.contacts[index], ...action.payload };
      } else {
        state.contacts.push(action.payload);
      }
    },
    deleteContact: (state, action) => {
      state.contacts = state.contacts.filter(e => e.id !== action.payload.id);
    },
  },
});

const { upsertContact, deleteContact } = contactsSlice.actions;

const contactsReducer = contactsSlice.reducer;

const selectContacts = ({ contacts }) => contacts.contacts;

export { upsertContact, deleteContact, contactsReducer, selectContacts };
