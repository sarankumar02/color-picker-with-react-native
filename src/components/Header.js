import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet, Platform } from 'react-native';

const Header = () => (
  <Appbar.Header style = {styles.item}>
      <Appbar.Content title="Color Picker" titleStyle={styles.headerText}/>
      {/* <Appbar.Action icon="magnify" onPress={() => {}} /> */}
  </Appbar.Header>

);

export default Header;

const styles = StyleSheet.create ({
   item: {
      backgroundColor : "#282828"
   },
   headerText: {
      color: 'white',
      fontSize: 22,
      fontFamily: 'CircularStd-Book',
      textAlign: 'center',
  },
})