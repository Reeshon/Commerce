<<<<<<< HEAD
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Products from './components/Products';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';
import Search from './components/Search';
import Navigation from './components/Navigation';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
    </Router>
=======
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { AuthProvider } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';
import Search from './components/Search';
import { ToastContainer } from 'react-toastify/dist/react-toastify.cjs.development';
import 'react-toastify/dist/ReactToastify.min.css';
import ProductDetail from './components/ProductDetail';
import Login from './components/Login';
import Signup from './components/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './components/Profile';
import AdminDashboard from './components/Admin/AdminDashboard';
import ProductManagement from './components/Admin/ProductManagement';
import OrderManagement from './components/Admin/OrderManagement';
import { requireAdmin } from './utils/adminAuth';
import OrderDetails from './components/Admin/OrderDetails';
import FeedbackForm from './components/FeedbackForm';
import MetaTags from './components/MetaTags';

function App() {
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

  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <div className="App">
              <Navigation products={products} />
              <div className="main-content">
                <Routes>
                  <Route 
                    path="/" 
                    element={
                      <>
                        <MetaTags 
                          title="Home - Deleen's Home Bake" 
                          description="Welcome to Deleen's Home Bake. Discover our delicious homemade baked goods." 
                          keywords="home bake, cakes, bread, pastries, cookies" 
                        />
                        <Home />
                      </>
                    } 
                  />
                  <Route 
                    path="/cart" 
                    element={
                      <>
                        <MetaTags 
                          title="Cart - Deleen's Home Bake" 
                          description="View and manage your cart items." 
                          keywords="cart, home bake, cakes, bread, pastries, cookies" 
                        />
                        <Cart />
                      </>
                    } 
                  />
                  <Route 
                    path="/wishlist" 
                    element={
                      <>
                        <MetaTags 
                          title="Wishlist - Deleen's Home Bake" 
                          description="View and manage your wishlist items." 
                          keywords="wishlist, home bake, cakes, bread, pastries, cookies" 
                        />
                        <Wishlist />
                      </>
                    } 
                  />
                  <Route 
                    path="/search" 
                    element={
                      <>
                        <MetaTags 
                          title="Search - Deleen's Home Bake" 
                          description="Search for your favorite baked goods." 
                          keywords="search, home bake, cakes, bread, pastries, cookies" 
                        />
                        <Search />
                      </>
                    } 
                  />
                  <Route 
                    path="/product/:id" 
                    element={
                      <>
                        <MetaTags 
                          title="Product Details - Deleen's Home Bake" 
                          description="View details of your selected product." 
                          keywords="product details, home bake, cakes, bread, pastries, cookies" 
                        />
                        <ProductDetail products={products} />
                      </>
                    } 
                  />
                  <Route 
                    path="/login" 
                    element={
                      <>
                        <MetaTags 
                          title="Login - Deleen's Home Bake" 
                          description="Login to your account." 
                          keywords="login, home bake, cakes, bread, pastries, cookies" 
                        />
                        <Login />
                      </>
                    } 
                  />
                  <Route 
                    path="/signup" 
                    element={
                      <>
                        <MetaTags 
                          title="Sign Up - Deleen's Home Bake" 
                          description="Create a new account." 
                          keywords="sign up, home bake, cakes, bread, pastries, cookies" 
                        />
                        <Signup />
                      </>
                    } 
                  />
                  <Route 
                    path="/profile" 
                    element={
                      <ProtectedRoute>
                        <>
                          <MetaTags 
                            title="Profile - Deleen's Home Bake" 
                            description="View and update your profile." 
                            keywords="profile, home bake, cakes, bread, pastries, cookies" 
                          />
                          <Profile />
                        </>
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin" 
                    element={
                      <ProtectedRoute>
                        <>
                          <MetaTags 
                            title="Admin Dashboard - Deleen's Home Bake" 
                            description="Admin dashboard for managing products and orders." 
                            keywords="admin, dashboard, home bake, cakes, bread, pastries, cookies" 
                          />
                          <AdminDashboard />
                        </>
                      </ProtectedRoute>
                    }
                  >
                    <Route path="products" element={requireAdmin(ProductManagement)} />
                    <Route path="orders" element={requireAdmin(OrderManagement)} />
                    <Route path="orders/:orderId" element={requireAdmin(OrderDetails)} />
                  </Route>
                  <Route 
                    path="/feedback" 
                    element={
                      <>
                        <MetaTags 
                          title="Feedback - Deleen's Home Bake" 
                          description="Provide your feedback." 
                          keywords="feedback, home bake, cakes, bread, pastries, cookies" 
                        />
                        <FeedbackForm />
                      </>
                    } 
                  />
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
