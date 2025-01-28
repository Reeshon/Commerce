import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar, Nav, Container, Form, Button } from 'react-bootstrap';
import Home from './Home';
import Products from './Products';
import Contact from './Contact';
import Cart from './Cart'; // Import Cart component
import Wishlist from './Wishlist'; // Import Wishlist component
import { fetchProducts, addToCartAPI, addToWishlistAPI, searchProductsAPI } from '../services/api';

// Create Context for Cart and Wishlist
export const AppContext = createContext();

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const addToCart = (product, quantity) => {
    const existingItem = cartItems.find(item => item.name === product.name);
    if (existingItem) {
      setCartItems(
        cartItems.map(item =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity }]);
    }
  };

  const removeFromCart = (productName) => {
    setCartItems(cartItems.filter(item => item.name !== productName));
  };

  const updateCartQuantity = (productName, quantity) => {
    setCartItems(
      cartItems.map(item =>
        item.name === productName ? { ...item, quantity } : item
      )
    );
  };

  const addToWishlist = (product) => {
    if (!wishlistItems.find(item => item.name === product.name)) {
      setWishlistItems([...wishlistItems, product]);
    }
  };

  const removeFromWishlist = (productName) => {
    setWishlistItems(wishlistItems.filter(item => item.name !== productName));
  };

  return (
    <AppContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        searchQuery,
        setSearchQuery,
      }}
    >
      <Router>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">Commerce</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/products">Products</Nav.Link>
                <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
                <Nav.Link as={Link} to="/wishlist">Wishlist</Nav.Link>
                <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
              </Nav>
              {/* Search Bar */}
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Container className="mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Container>
      </Router>
    </AppContext.Provider>
  );
}

export default App;