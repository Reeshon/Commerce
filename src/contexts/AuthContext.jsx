import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
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
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
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
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;