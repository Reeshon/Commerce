import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```
```javascript
import React from 'react';
import { auth } from './firebaseConfig';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const provider = new GoogleAuthProvider();

const handleGoogleSignIn = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // Handle successful sign-in
      console.log("Signed in as:", result.user);
    })
    .catch((error) => {
      console.error("Google sign up error:", error);
    });
};

function App() {
  return (
    <div className="App">
      {/* ...existing components... */}
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
      {/* ...existing components... */}
    </div>
  );
}

export default App;