import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/firebase'; // Import Firestore
import { doc, setDoc, getDoc } from 'firebase/firestore';

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // New state for username
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between login and signup

  const handleAuth = async () => {
    try {
      if (isSignUp) {
        // Validate username uniqueness
        const usernameDoc = doc(db, 'usernames', username);
        const usernameSnap = await getDoc(usernameDoc);
        if (usernameSnap.exists()) {
          alert('Username already taken, please choose another one.');
          return;
        }

        // Create account
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save username in Firestore
        await setDoc(doc(db, 'users', user.uid), { username });
        await setDoc(doc(db, 'usernames', username), { uid: user.uid }); // Track usernames globally

        alert('Account created successfully!');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert('Logged in successfully!');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isSignUp ? 'Sign Up' : 'Log In'}</Text>

      {isSignUp && (
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title={isSignUp ? 'Sign Up' : 'Log In'} onPress={handleAuth} />

      <Text style={styles.toggleText}>
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
        <Text
          style={styles.toggleLink}
          onPress={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp ? 'Log In' : 'Sign Up'}
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#be9b7b',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#854442',
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  toggleText: {
    marginTop: 15,
    color: '#555',
  },
  toggleLink: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
});
