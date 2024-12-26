import React, { useState, createContext, useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import ProfileScreen from './screens/ProfileScreen';
import HomeScreen from './screens/HomeScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import SummarizeCommitsScreen from './screens/SummarizeCommitsScreen'; // Import the new screen

const Stack = createStackNavigator();
export const AuthContext = createContext(null);

const CustomHeader = ({ onLogout }) => {
  const { loggedInUser } = useContext(AuthContext);
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerLeft}>{loggedInUser?.name || 'Guest'}</Text>
      <TouchableOpacity onPress={onLogout}>
        <Text style={styles.headerRight}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const Footer = ({ navigation }) => {
  const { loggedInUser } = useContext(AuthContext);
  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('Home', { loggedInUser })}>
        <Text style={styles.footerText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Profile', { loggedInUser })}>
        <Text style={styles.footerText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const AppNavigator = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogout = (navigation) => {
    setLoggedInUser(null); // Clear user state
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }], // Reset navigation stack
    });
  };

  return (
    <AuthContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            header: ({ navigation }) => (
              <CustomHeader onLogout={() => handleLogout(navigation)} />
            ),
          }}
        >
          <Stack.Screen
            name="Login"
            options={{ headerShown: true }}
          >
            {(props) => (
              <LoginScreen {...props} setLoggedInUser={setLoggedInUser} />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="Profile"
            options={{ headerShown: true }}
          >
            {(props) => (
              <ProfileScreen {...props} />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="Home"
            options={{ headerShown: true }}
          >
            {(props) => (
              <HomeScreen {...props} />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="SummarizeCommits"
            component={SummarizeCommitsScreen}
            options={{ headerShown: true }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#6C63FF',
  },
  headerLeft: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerRight: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
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

export default AppNavigator;
