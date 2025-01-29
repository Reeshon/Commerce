import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation.jsx';
import Home from './components/Home.jsx';
import { CartProvider } from './contexts/CartContext.jsx';
import { WishlistProvider } from './contexts/WishlistContext.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cart from './components/Cart.jsx';
import Wishlist from './components/Wishlist.jsx';
import ProductDetail from './components/ProductDetail.jsx';
import Profile from './components/Profile.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Checkout from './components/Checkout.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import { initAnalytics, logEvent } from './utils/analyticsWrapper';
import { auth } from './config/firebase';

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products] = useState([
    {
      id: 1,
      name: "Classic Chocolate Cake",
      price: 29.99,
      image: "https://placehold.co/300x200/png?text=Chocolate+Cake",
      description: "Rich chocolate layers with ganache"
    },
    {
      id: 2,
      name: "Artisan Bread",
      price: 6.99,
      image: "https://placehold.co/300x200/png?text=Artisan+Bread",
      description: "Freshly baked sourdough"
    },
    {
      id: 3,
      name: "Cupcake Box",
      price: 19.99,
      image: "https://placehold.co/300x200/png?text=Cupcake+Box",
      description: "Assorted flavors, box of 6"
    }
  ]);

  useEffect(() => {
    const initApp = async () => {
      try {
        if (!auth) {
          throw new Error('Firebase authentication is not initialized');
        }
        await initAnalytics();
        // Simulate loading
        setTimeout(() => {
          setLoading(false);
          logEvent('app_loaded');
        }, 1000);
      } catch (err) {
        console.error("Error initializing app:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    initApp();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ErrorBoundary>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <div className="App">
              <Navigation products={products} />
              <div className="main-content">
                <Routes>
                  <Route path="/" element={<Home products={products} />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/product/:id" element={<ProductDetail products={products} />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                  <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                </Routes>
              </div>
              <ToastContainer />
            </div>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
