import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import Footer from '../components/Footer';

const ForgotPasswordScreen = ({ navigation }) => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await axios.post('http://localhost:5000/forgot-password', data);
      alert('Password reset link sent!');
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
      alert('Failed to send reset link. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Forgot Password</Text>
          <Controller
            control={control}
            name="email"
            rules={{
              required: 'Email is required',
              pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email format' },
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#6C63FF"
                onChangeText={onChange}
                value={value}
                keyboardType="email-address"
              />
            )}
          />
          {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

          <TouchableOpacity
            style={[styles.button, isLoading && styles.disabledButton]}
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Send Reset Link</Text>
            )}
          </TouchableOpacity>
        </View>
        <Footer navigation={navigation} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#6C63FF',
  },
  input: {
    borderWidth: 1,
    borderColor: '#6C63FF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
    color: '#333',
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#6C63FF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#a3a3a3',
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ForgotPasswordScreen;
