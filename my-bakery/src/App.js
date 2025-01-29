import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route 
      path="*" 
      element={<App />}
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    />
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```
```javascript
import React, { useState } from 'react';
import { auth } from './firebaseConfig';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);
  
  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      console.log("Signed in successfully:", result.user);
    } catch (error) {
      console.error("Sign in error:", error.message);
    }
  };

  return (
    <div className="App">
      {!user ? (
        <button className="btn btn-primary" onClick={handleGoogleSignIn}>
          Sign in with Google
        </button>
      ) : (
        <div>
          <p>Welcome, {user.displayName}!</p>
          <button onClick={() => auth.signOut()}>Sign Out</button>
        </div>
      )}
    </div>
  );
}

export default App;