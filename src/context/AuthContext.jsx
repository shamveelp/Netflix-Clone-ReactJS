// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('onAuthStateChanged - User:', user);
      if (user) {
        try {
          const q = query(collection(db, 'users'), where('uid', '==', user.uid));
          const querySnapshot = await getDocs(q);
          console.log('Firestore Query Snapshot Empty:', querySnapshot.empty);
          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            console.log('Firestore Doc Data:', userDoc.data());
            setCurrentUser({ uid: user.uid, ...userDoc.data() });
          } else {
            console.log('No Firestore doc found for user');
            setCurrentUser({ uid: user.uid, email: user.email });
          }
        } catch (error) {
          console.error('Firestore Fetch Error:', error);
          setCurrentUser({ uid: user.uid, email: user.email });
        }
      } else {
        console.log('No user authenticated');
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, loading }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};