import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Footer from '../components/Footer';

const HomeScreen = ({ navigation, loggedInUser }) => (
  <View style={styles.container}>
    <View style={styles.contentContainer}>
      <Text style={styles.welcomeText}>
        Welcome to the Home Screen, {loggedInUser?.name || 'Guest'}!
      </Text>
    </View>
    <Footer navigation={navigation} loggedInUser={loggedInUser} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  contentContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6C63FF',
  },
});

export default HomeScreen;
