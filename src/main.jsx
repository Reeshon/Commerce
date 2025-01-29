<<<<<<< HEAD
import React, { Component } from 'react';
=======
import React from 'react'
>>>>>>> gh-pages
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

<<<<<<< HEAD
class SideEffect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // initial state
    };
    // ...existing code...
  }

  componentDidMount() {
    // Move side effects here
    // ...existing code...
  }

  // ...existing code...
}

export default SideEffect;

=======
>>>>>>> gh-pages
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
