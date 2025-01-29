import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { auth } from './firebase-config';
// Import your components here
// import Home from './components/Home';
// import Login from './components/Login';
// import Register from './components/Register';

function App() {
  if (!auth) {
    return <div>Error: Firebase not initialized. Check your API key.</div>;
  }

  return (
    <Router>
      <div className="App">
        <Switch>
          {/* <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} /> */}
          {/* Add more routes as needed */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
