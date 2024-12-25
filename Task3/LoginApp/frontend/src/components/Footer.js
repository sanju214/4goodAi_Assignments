import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Footer = ({ navigation, loggedInUser }) => (
  <View style={styles.footerContainer}>
    <TouchableOpacity onPress={() => navigation.navigate('Home', { loggedInUser })}>
      <Text style={styles.footerText}>Home</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('Profile', { loggedInUser })}>
      <Text style={styles.footerText}>Profile</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#6C63FF',
    padding: 15,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  footerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Footer;
