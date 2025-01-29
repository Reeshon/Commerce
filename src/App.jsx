import React, { useState } from 'react';
<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { AuthProvider } from './contexts/AuthContext';
=======
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext.jsx';
import { WishlistProvider } from './contexts/WishlistContext.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
>>>>>>> gh-pages
import Navigation from './components/Navigation';
import Home from './components/Home';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';
import Search from './components/Search';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
<<<<<<< HEAD
import ProductDetail from './components/ProductDetail';
import Login from './components/Login';
import Signup from './components/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './components/Profile';
import AdminDashboard from './components/Admin/AdminDashboard.jsx';
import ProductManagement from './components/Admin/ProductManagement.jsx';
import OrderManagement from './components/Admin/OrderManagement.jsx';
import OrderDetails from './components/Admin/OrderDetails.jsx';
import FeedbackForm from './components/FeedbackForm';
import MetaTags from './components/MetaTags';
import { requireAdmin } from './utils/adminAuth';
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({error}) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: 'red' }}>{error.message}</pre>
    </div>
  )
}
=======
>>>>>>> gh-pages

function App() {
  const [products] = useState([
    {
      id: 1,
      name: "Classic Chocolate Cake",
      price: 29.99,
      image: "https://placehold.co/300x200/png?text=Chocolate+Cake",
      description: "Rich chocolate layers with ganache"
    },
<<<<<<< HEAD
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
    // ...additional products...
  ]);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Router basename="/Commerce">
              <div className="App">
                <Navigation products={products} />
                <div className="main-content">
                  <Routes>
                    <Route path="/" element={<><MetaTags title="Home" /><Home /></>} />
                    <Route path="/cart" element={<><MetaTags title="Cart" /><Cart /></>} />
                    <Route path="/wishlist" element={<><MetaTags title="Wishlist" /><Wishlist /></>} />
                    <Route path="/search" element={<><MetaTags title="Search" /><Search products={products} /></>} />
                    <Route path="/product/:id" element={<><MetaTags title="Product Details" /><ProductDetail products={products} /></>} />
                    <Route path="/login" element={<><MetaTags title="Login" /><Login /></>} />
                    <Route path="/signup" element={<><MetaTags title="Sign Up" /><Signup /></>} />
                    <Route path="/profile" element={<ProtectedRoute><><MetaTags title="Profile" /><Profile /></></ProtectedRoute>} />
                    <Route path="/admin" element={<ProtectedRoute><><MetaTags title="Admin" /><AdminDashboard /></></ProtectedRoute>}>
                      <Route path="products" element={requireAdmin(ProductManagement)} />
                      <Route path="orders" element={requireAdmin(OrderManagement)} />
                      <Route path="orders/:orderId" element={requireAdmin(OrderDetails)} />
                    </Route>
                    <Route path="/feedback" element={<><MetaTags title="Feedback" /><FeedbackForm /></>} />
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
    </ErrorBoundary>
=======
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
>>>>>>> gh-pages
  );
}

export default App;
