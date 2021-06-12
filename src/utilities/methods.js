import Realm from 'realm';
import { Alert } from 'react-native';

import { getRealmApp } from './getRealmApp';

const app = getRealmApp();

export const loginIn = async ({ email, password, success, failed }) => {
  try {
    const creds = Realm.Credentials.emailPassword(email, password);
    console.log('creds-----', creds);
    const newUser = await app.logIn(creds);
    console.log('new user----', newUser);
    success && success(newUser);
  } catch (error) {
    Alert.alert(`Failed to sign in: ${error.message}`);
    failed && failed(false);
  }
};

export const register = async ({ email, password, success, failed }) => {
  try {
    await app.emailPasswordAuth.registerUser(email, password);
    const creds = Realm.Credentials.emailPassword(email, password);
    const loginUser = await app.logIn(creds);
    success && success(loginUser);
  } catch (error) {
    Alert.alert(`Failed to sign in: ${error.message}`);
    failed && failed(false);
  }
};

export const logout = async ({ success, failed }) => {
  try {
    const { currentUser = {} } = app;
    const a1 = await currentUser.logOut();
    success && success();
  } catch (error) {
    console.log('error', error);
    failed && failed(error);
  }
};
