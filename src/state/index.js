import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import * as User from './user';
import * as Contacts from './Contacts';

const rootReducer = combineReducers({
  user: User.userReducer,
  contacts: Contacts.contactsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export { rootReducer, User, store, Contacts };
