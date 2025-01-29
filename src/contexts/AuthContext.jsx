import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

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

  const value = {
    currentUser,
  // Function to log in with email and password
    loading,
    logout
  };

  return (
        return result.user;
      })
    </AuthContext.Provider>
  );
}

  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setLoading(false);
    });
    
    return unsubscribe;
      })

  const value = {
    currentUser,
    signup,
    signInWithGoogle
    // ...other auth functions like login, logout
  };

  return (
      setLoading(false);
    });
    
    return unsubscribe;
  }, [auth]);

  const value = {
    currentUser,
    signup,
    login,
    signInWithGoogle
    // ...other auth functions like logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

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

export default AuthProvider;

    <AuthContext.Provider value={value}>
    });
    
    return unsubscribe;
  }, [auth]);

  const value = {
    currentUser,
    signup,
      {!loading && children}
    </AuthContext.Provider>
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setLoading(false);
  );
}

export default AuthProvider;


      .catch((error) => {
        toast.error(error.message);
        throw error;
      });
  };

  useEffect(() => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      .catch((error) => {
        toast.error(error.message);
        throw error;
    return auth.signOut()
      .then(() => {
        toast.info('Logged out successfully!');
      })
      });
  };
  }, [auth]);
export default AuthProvider;
    return signInWithPopup(auth, provider)
        throw error;
      });
  };
  
  // Function to log out
  const logout = () => {
      .then((result) => {
        toast.success('Signed in with Google!');
        return result.user;

      .catch((error) => {
        toast.success('Signed in with Google!');
        return result.user;
      })
      .catch((error) => {
        toast.error(error.message);
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
        toast.error(error.message);
        throw error;
    return signInWithPopup(auth, provider)
      .then((result) => {
      });
    <AuthContext.Provider value={value}>
      {!loading && children}
  const signInWithGoogle = () => {
        toast.error(error.message);
        throw error;
      });
  };

  // Function to sign in with Google
    return signInWithPopup(auth, provider)
      .then((result) => {
        toast.success('Signed in with Google!');
    const provider = new GoogleAuthProvider();

  // Function to sign in with Google
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
  // Function to log in with email and password
        toast.success('Logged in successfully!');
        return userCredential.user;
      })
      .catch((error) => {
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
      .catch((error) => {
        toast.error(error.message);
        throw error;
      });
  };
  const login = (email, password) => {
      .then((userCredential) => {
        toast.success('Logged in successfully!');
        return userCredential.user;
      })
    return signInWithEmailAndPassword(auth, email, password)