import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const colorArr = [
  '#e2bd74',
  '#e2a662',
  '#a3bb77',
  '#c3c77f',
  '#84af71',
  '#e18f55',
  '#00876c',
  '#e2d28c',
  '#df764e',
  '#d43d51',
  '#db5b4d',
  '#3f956c',
  '#63a26e',
];
const ContactCard = ({ item, setActiveContact }) => {
  const initials = item.name
    .split(' ')
    .map(n => n[0])
    .join('');
  const indexN = initials.split('').reduce((acc, a) => a.charCodeAt(0) + acc, 0);
  const imgBoxStyle = { backgroundColor: colorArr[indexN % colorArr.length] };
  return (
    <Pressable
      onPress={setActiveContact.bind(this, item)}
      style={({ pressed }) => [
        pressed && {
          backgroundColor: 'rgb(203, 206, 209)',
          opacity: 0.5,
        },
        styles.item,
      ]}>
      <View style={[styles.imgBox, imgBoxStyle]}>
        <Text style={styles.imgBoxText}>{initials.toUpperCase()}</Text>
      </View>
      <View style={styles.textBox}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description}>{item.email}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  item: {
    height: hp(12),
    width: wp(100),
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    flexDirection: 'row',
  },
  imgBox: {
    height: hp(10),
    width: hp(10),
    borderRadius: hp(5),
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgBoxText: {
    fontSize: 24,
    color: 'white',
  },
  textBox: {
    marginLeft: wp(4),
    paddingVertical: hp(1),
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
  },
});

export default ContactCard;
