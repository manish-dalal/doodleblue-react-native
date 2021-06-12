import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { StackActions } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Button from '../components/Button';
import { getUserObject } from '../utilities/schema';
import { User } from '../state';
import { loginIn } from '../utilities/methods';

function Login(props) {
  const [loginLoading, setLoginLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const onPressSignIn = () => {
    if (!email || !password) {
      return Alert.alert('Please enter valid email & password');
    }
    setLoginLoading(true);
    loginIn({
      email,
      password,
      success: newUser => {
        setLoginLoading(false);
        dispatch(User.setUser(getUserObject(newUser)));
      },
      failed: () => {
        setLoginLoading(false);
      },
    });
  };
  const disableButtons = loginLoading;
  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>DOODLE BLUE LOGIN</Text>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
          style={styles.inputStyle}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={text => setPassword(text)}
          value={password}
          placeholder="Password"
          style={styles.inputStyle}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonView}>
        <Button
          width={wp(90)}
          onPress={onPressSignIn}
          disabled={disableButtons}
          smoothEdges
          loading={loginLoading}
          title="LOGIN"
        />
      </View>
      <View style={styles.orContainer}>
        <View style={styles.lineStyle} />
        <Text style={styles.orStyle}>OR</Text>
        <View style={styles.lineStyle} />
      </View>
      <View style={styles.buttonView}>
        <Button
          width={wp(90)}
          onPress={() => {
            props.navigation.dispatch(StackActions.replace('Register'));
          }}
          disabled={disableButtons}
          smoothEdges
          title="CREATE ACCOUNT"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: hp(4),
  },
  buttonView: {
    height: hp(5),
    marginTop: hp(4),
  },
  inputContainer: {
    padding: 5,
  },
  inputStyle: {
    width: wp(90),
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  orContainer: {
    width: wp(90),
    marginTop: hp(5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  lineStyle: {
    borderBottomWidth: 1,
    flex: 1,
  },
  orStyle: {
    paddingHorizontal: 14,
  },
});

export default Login;
