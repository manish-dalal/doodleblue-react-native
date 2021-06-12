import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { ObjectId } from 'bson';

import Button from './Button';
import { Contacts } from '../state';
import colors from '../styles/colors';
const editIcon = <Icon name="edit" size={22} color="#000" />;
const deleteIcon = <Icon name="delete" size={22} color="#000" />;

const UpsertModal = ({ activeContact, onClose }) => {
  const [email, setemail] = useState(activeContact?.email || '');
  const [name, setname] = useState(activeContact?.name || '');
  const [mobile, setmobile] = useState(activeContact?.mobile || '');
  const [editable, seteditable] = useState(activeContact.id ? false : true);
  const dispatch = useDispatch();
  const contacts = useSelector(Contacts.selectContacts);

  const onPressAdd = () => {
    const state = {
      name: name.trim(),
      email: email.trim(),
      mobile: mobile.trim(),
      id: activeContact.id || new ObjectId().toString(),
    };
    const alreadyExist = contacts.filter(e => e.email === state.email || e.mobile === state.mobile);
    if (alreadyExist.length && alreadyExist[0].id !== state.id) {
      let str = '';
      if (alreadyExist[0].email === state.email) {
        str = 'Email';
      }
      if (alreadyExist[0].mobile === state.mobile) {
        str = 'Mobile number';
      }
      return Alert.alert(`${str} already exist`);
    }
    dispatch(Contacts.upsertContact(state));
    onClose();
  };
  const handleDelete = () => {
    dispatch(Contacts.deleteContact({ id: activeContact.id }));
    onClose();
  };
  const label = editable ? 'Edit' : 'View';
  const title = activeContact?.id ? label : 'Add';
  return (
    <Modal
      visible={!!activeContact}
      transparent={true}
      onRequestClose={onClose}
      onDismiss={onClose}>
      <TouchableOpacity style={styles.modalTouchable} onPress={onClose} activeOpacity={1}>
        <TouchableOpacity onPress={() => {}} activeOpacity={1} style={{ width: wp(90) }}>
          <View style={styles.modalStyle}>
            <View style={styles.actionsBox}>
              <Text style={styles.maintitle}>{`${title} contact`}</Text>
              {activeContact?.id && (
                <>
                  <TouchableOpacity
                    style={styles.actions}
                    onPress={seteditable.bind(this, !editable)}>
                    {editIcon}
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actions} onPress={handleDelete}>
                    {deleteIcon}
                  </TouchableOpacity>
                </>
              )}
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                onChangeText={setname}
                value={name}
                placeholder="Name"
                style={styles.inputStyle}
                editable={editable}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                onChangeText={setemail}
                value={email}
                placeholder="Email"
                style={styles.inputStyle}
                editable={editable}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                onChangeText={setmobile}
                value={mobile}
                placeholder="Mobile"
                style={styles.inputStyle}
                editable={editable}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                width={title === 'View' ? wp(80) : wp(38)}
                onPress={onClose}
                smoothEdges
                title="Close"
                color={colors.tomato}
              />
              {title !== 'View' && (
                <Button
                  width={wp(38)}
                  onPress={onPressAdd}
                  smoothEdges
                  title={title}
                  disabled={!editable || !(name && email && mobile)}
                />
              )}
            </View>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalTouchable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(150, 150, 150, 0.8)',
  },
  modalStyle: {
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 10,
  },
  actionsBox: {
    flexDirection: 'row',
    width: wp(80),
    justifyContent: 'flex-end',
    paddingBottom: 8,
  },
  actions: {
    padding: wp(1),
    marginRight: wp(2),
  },
  maintitle: { flex: 1, fontSize: 20, fontWeight: 'bold' },
  inputContainer: {
    padding: 5,
  },
  inputStyle: {
    width: wp(80),
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp(80),
    paddingTop: hp(1),
  },
});

export default UpsertModal;
