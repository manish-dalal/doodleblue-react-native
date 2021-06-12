import React, { useState } from 'react';
import { StyleSheet, View, FlatList, SafeAreaView, TextInput } from 'react-native';
import { useSelector } from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Button from '../components/Button';
import { Contacts } from '../state';
import Header from '../components/Header';
import ContactCard from '../components/ContactCard';
import UpsertModal from '../components/UpsertModal';
import colors from '../styles/colors';

function Home(props) {
  const contacts = useSelector(Contacts.selectContacts);
  const [activeContact, setActiveContact] = useState('');
  const [search, setSearch] = useState('');

  const getSearchData = () => {
    return contacts.filter(
      e =>
        e.name.toLowerCase().includes(search) ||
        e.email.toLowerCase().includes(search) ||
        e.mobile.toLowerCase().includes(search)
    );
  };

  const renderItem = ({ item }) => {
    return <ContactCard item={item} setActiveContact={setActiveContact} />;
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.searchBox}>
        <TextInput
          onChangeText={setSearch}
          value={search}
          placeholder="Search"
          style={styles.inputStyle}
          autoCapitalize="none"
        />
        <Button
          width={wp(16)}
          onPress={setActiveContact.bind(this, true)}
          smoothEdges
          title="Add"
          color={colors.tomato}
        />
      </View>
      <View style={styles.body}>
        <FlatList
          data={search.length ? getSearchData() : contacts}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
        {activeContact ? (
          <UpsertModal onClose={setActiveContact.bind(this, '')} activeContact={activeContact} />
        ) : (
          <View />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    alignItems: 'center',
  },
  searchBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
    paddingTop: hp(2),
    paddingBottom: hp(1),
  },
  inputStyle: {
    width: wp(72),
    borderWidth: 1,
    padding: 5,
    borderRadius: 20,
    paddingLeft: 20,
    color: 'black',
  },
});

export default Home;
