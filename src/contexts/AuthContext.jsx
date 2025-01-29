import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
<<<<<<< HEAD
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged 
} from 'firebase/auth';
import { toast } from 'react-toastify';
import { app } from '../firebase';

const AuthContext = createContext();

// Custom hook to use the AuthContext
=======
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  signInWithPopup,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';
import { createUserProfile } from '../services/database';

const AuthContext = createContext();

>>>>>>> gh-pages
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
<<<<<<< HEAD
  const auth = getAuth(app);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Function to sign up with email and password
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        toast.success('Signup successful!');
        return userCredential.user;
      })
      .catch((error) => {
        toast.error(error.message);
        throw error;
      });
  };

  // Function to log in with email and password
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        toast.success('Logged in successfully!');
        return userCredential.user;
      })
      .catch((error) => {
        toast.error(error.message);
        throw error;
      });
  };

  // Function to sign in with Google
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
      .then((result) => {
        toast.success('Signed in with Google!');
        return result.user;
      })
      .catch((error) => {
        toast.error(error.message);
        throw error;
      });
  };
  
  // Function to log out
  const logout = () => {
    return auth.signOut()
      .then(() => {
        toast.info('Logged out successfully!');
      })
      .catch((error) => {
        toast.error(error.message);
        throw error;
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setLoading(false);
    });
    
    return unsubscribe;
  }, [auth]);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    signInWithGoogle
    // ...other auth functions
=======
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function signup(email, password) {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await createUserProfile(result.user.uid, {
        email: result.user.email,
        displayName: result.user.displayName || email.split('@')[0]
      });
      console.log('Signup success:', result.user);
      return result;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  }

  async function login(email, password) {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log('Login success:', result.user);
      return result;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async function signInWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Google sign in success:', result.user);
      return result;
    } catch (error) {
      console.error('Google sign in error:', error);
      throw error;
    }
  }

  async function updateUserProfile(profileData) {
    try {
      await updateProfile(currentUser, profileData);
      setCurrentUser(prev => ({ ...prev, ...profileData }));
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  }

  async function resetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error('Password reset error:', error);
      throw error;
    }
  }

  function logout() {
    return signOut(auth);
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
    loading,
    signup,
    login,
    logout,
    signInWithGoogle,
    isAuthenticated: !!currentUser,
    updateUserProfile,
    resetPassword
>>>>>>> gh-pages
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
<<<<<<< HEAD

export default AuthProvider;
=======
>>>>>>> gh-pages
