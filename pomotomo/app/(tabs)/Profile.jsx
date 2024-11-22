import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { auth, db } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function Profile() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUsername(docSnap.data().username || 'Anonymous');
        }
      }
    };

    fetchUsername();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Welcome, {username}!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#be9b7b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    color: '#854442',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
