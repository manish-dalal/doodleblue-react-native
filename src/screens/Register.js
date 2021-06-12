import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { StackActions } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Button from '../components/Button';
import { User } from '../state';
import { getUserObject } from '../utilities/schema';
import { register } from '../utilities/methods';

function Register(props) {
  const [registerLoading, setRegisterLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();

  const onPressRegister = () => {
    if (!email || !password) {
      return Alert.alert('Please enter valid email & password');
    } else if (password !== confirmPassword) {
      return Alert.alert('', 'Password and confirm password does not match.');
    }
    setRegisterLoading(true);
    register({
      email,
      password,
      success: loginUser => {
        setRegisterLoading(false);
        dispatch(User.setUser(getUserObject(loginUser)));
      },
      failed: error => {
        Alert.alert(`Failed to sign in: ${error.message}`);
        setRegisterLoading(false);
      },
    });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>DOODLE BLUE REGISTER</Text>
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
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={text => setConfirmPassword(text)}
          value={confirmPassword}
          placeholder="Confirm Password"
          style={styles.inputStyle}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonView}>
        <Button
          width={wp(90)}
          onPress={onPressRegister}
          disabled={registerLoading}
          smoothEdges
          loading={registerLoading}
          title="REGISTER"
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
            props.navigation.dispatch(StackActions.replace('Login'));
          }}
          smoothEdges
          title="LOGIN ACCOUNT"
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

export default Register;
