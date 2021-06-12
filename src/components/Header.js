import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Realm from 'realm';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ModalDropdown from 'react-native-modal-dropdown';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

import { User } from '../state';
import { getUserObject } from '../utilities/schema';
import { getRealmApp } from '../utilities/getRealmApp';
import { logout } from '../utilities/methods';

const arrow_drop_down = <Icon name="arrow-drop-down" size={30} color="#000" />;
const logoutIcon = <Icon name="logout" size={20} color="#000" />;
const app = getRealmApp();

function Header() {
  const [logoutLoading, setLogoutLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(User.selectUser);
  const realmRef = useRef(null);
  useEffect(() => {
    if (!app.currentUser) {
      return;
    }
    const config = {
      sync: {
        user: app.currentUser,
        partitionValue: `user=${app.currentUser.id}`,
        existingRealmFileBehavior: { type: 'openImmediately' },
      },
    };
    Realm.open(config).then(userRealm => {
      realmRef.current = userRealm;
      const users = userRealm.objects('User');
      const newuser = getUserObject(users[0] || {});
      console.log('newuser', newuser);
      dispatch(User.setUser(newuser));
    });

    return () => {
      // cleanup function
      const userRealm = realmRef.current;
      if (userRealm) {
        userRealm.close();
        realmRef.current = null;
      }
    };
  }, [dispatch]);

  const logoutUser = async () => {
    setLogoutLoading(true);
    logout({
      success: () => {
        setLogoutLoading(false);
        dispatch(User.setUser(null));
      },
      failed: error => {
        setLogoutLoading(false);
        console.log('error', error);
      },
    });
  };
  const renderRow = item => {
    return (
      <View style={styles.mainView}>
        {logoutIcon}
        <Text style={styles.rowTitle}>{item}</Text>
      </View>
    );
  };
  const renderUser = logoutLoading ? (
    <ActivityIndicator color="#0000ff" style={styles.loader} />
  ) : (
    <ModalDropdown
      options={['Logout']}
      renderRow={renderRow}
      dropdownStyle={styles.dropdownStyle}
      onSelect={(index, option) => logoutUser()}>
      <View style={styles.user}>
        <Text style={styles.userText}>{user?.name || 'User'}</Text>
        {arrow_drop_down}
      </View>
    </ModalDropdown>
  );
  return (
    <View style={styles.headerStyle}>
      <Text style={styles.title}>Contacts</Text>
      {renderUser}
    </View>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    height: hp(8),
    width: wp(100),
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  dropdownStyle: {
    height: 40,
  },
  mainView: {
    width: wp(26),
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  rowTitle: {
    paddingLeft: 6,
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userText: {
    textTransform: 'capitalize',
  },
  loader: { marginRight: 10 },
});

const memoHeader = React.memo(Header);
export default memoHeader;
