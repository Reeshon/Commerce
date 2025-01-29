import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext.jsx';
import { WishlistProvider } from './contexts/WishlistContext.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';
import Search from './components/Search';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [products] = useState([
    {
      id: 1,
      name: "Classic Chocolate Cake",
      price: 29.99,
      image: "https://placehold.co/300x200/png?text=Chocolate+Cake",
      description: "Rich chocolate layers with ganache"
    },
    // ...existing products...
  ]);

  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <div className="App">
              <Navigation products={products} />
              <div className="main-content">
                <Routes>
                  {/* ...existing routes... */}
                </Routes>
              </div>
              <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </div>
          </Router>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
