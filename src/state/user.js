import { createSlice } from '@reduxjs/toolkit';
import { getUserObject } from '../utilities/schema';
import { getRealmApp } from '../utilities/getRealmApp';

const app = getRealmApp();

const initialState = {
  user: app.currentUser ? getUserObject(app.currentUser) : null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

const { setUser } = userSlice.actions;

const userReducer = userSlice.reducer;

const selectUser = ({ user }) => user.user;

const selectIsUserLoggedIn = ({ user }) => user.user || false;

export { setUser, userReducer, selectUser, selectIsUserLoggedIn };
