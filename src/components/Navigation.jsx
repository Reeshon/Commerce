import React from 'react';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useCart } from '../contexts/CartContext.jsx';
import { useWishlist } from '../contexts/WishlistContext.jsx';
import SearchBar from './SearchBar.jsx';

function Navigation({ products }) {
  const { currentUser, logout } = useAuth();
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // Handle error if needed
    }
  };

=======
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import SearchBar from './SearchBar';

function Navigation({ products }) {
  const { currentUser } = useAuth();
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();

>>>>>>> gh-pages
  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">Deleen's Home Bake</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/cart">Cart ({cartItems.length})</Nav.Link>
            <Nav.Link as={Link} to="/wishlist">Wishlist ({wishlistItems.length})</Nav.Link>
            {currentUser && <Nav.Link as={Link} to="/profile">Profile</Nav.Link>}
            {!currentUser && (
<<<<<<< HEAD
              <Nav.Link as={Link} to="/admin">Admin</Nav.Link>
            )}
            <Nav.Link as={Link} to="/feedback">Feedback</Nav.Link>
          </Nav>
          <Nav>
            {!currentUser && (
=======
>>>>>>> gh-pages
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
              </>
            )}
<<<<<<< HEAD
            {currentUser && (
              <Button variant="outline-danger" onClick={handleLogout}>Log Out</Button>
            )}
=======
>>>>>>> gh-pages
          </Nav>
          <SearchBar products={products} />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

<<<<<<< HEAD
export default Navigation;
=======
export default Navigation;
>>>>>>> gh-pages
