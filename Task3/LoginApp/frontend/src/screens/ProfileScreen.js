import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Footer from '../components/Footer';
import { AuthContext } from '../AppNavigator';

const ProfileScreen = ({ navigation }) => {
  const { loggedInUser } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={{
            uri: 'https://t4.ftcdn.net/jpg/04/83/90/95/360_F_483909569_OI4LKNeFgHwvvVju60fejLd9gj43dIcd.jpg',
          }}
          style={styles.avatar}
        />
        <Text style={styles.welcomeText}>
          Welcome, {loggedInUser?.name || 'Guest'}
        </Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.label}>Name: {loggedInUser?.name || 'N/A'}</Text>
          <Text style={styles.label}>Age: {loggedInUser?.age || 'N/A'}</Text>
          <Text style={styles.label}>City: {loggedInUser?.city || 'N/A'}</Text>
          <Text style={styles.label}>Contact: {loggedInUser?.contact || 'N/A'}</Text>
          <Text style={styles.label}>Email: {loggedInUser?.email || 'N/A'}</Text>
        </View>
      </View>
      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  profileContainer: {
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
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 24,
    color: '#6C63FF',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detailsContainer: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    color: '#6C63FF',
    marginBottom: 10,
  },
});

export default ProfileScreen;
