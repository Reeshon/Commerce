import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  signInWithPopup,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase.jsx';
import { createUserProfile } from '../services/database';
import { showToast } from '../utils/toast';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function signup(email, password, displayName) {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName });
      await createUserProfile(result.user.uid, { email, displayName });
      showToast.success('Account created successfully!');
      return result;
    } catch (error) {
      showToast.error(error.message);
      throw error;
    }
  }

  async function login(email, password) {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      showToast.success('Logged in successfully!');
      return result;
    } catch (error) {
      showToast.error(error.message);
      throw error;
    }
  }

  async function logout() {
    try {
      await signOut(auth);
      showToast.success('Logged out successfully');
    } catch (error) {
      showToast.error(error.message);
      throw error;
    }
  }

  async function resetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email);
      showToast.success('Password reset email sent');
    } catch (error) {
      showToast.error(error.message);
      throw error;
    }
  }

  async function updateUserProfile(profileData) {
    try {
      await updateProfile(auth.currentUser, profileData);
      setCurrentUser(prev => ({ ...prev, ...profileData }));
      showToast.success('Profile updated successfully');
    } catch (error) {
      showToast.error(error.message);
      throw error;
    }
  }

  async function signInWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      showToast.success('Signed in with Google successfully!');
      return result;
    } catch (error) {
      showToast.error(error.message);
      throw error;
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateUserProfile,
    signInWithGoogle,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
