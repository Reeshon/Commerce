import React from 'react';
<<<<<<< HEAD
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import '../styles/Navigation.css';

function Navigation() {
  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/">Commerce</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/products">Products</Nav.Link>
            <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
            <Nav.Link as={Link} to="/wishlist">Wishlist</Nav.Link>
            <Nav.Link as={Link} to="/search">Search</Nav.Link>
=======
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { showToast } from '../utils/toast';
import Search from './Search';
import { useNavigate } from 'react-router-dom';

function Navigation({ products }) {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      showToast.success('Logged out successfully');
      navigate('/');
    } catch {
      showToast.error('Failed to log out');
    }
  };

  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Deleen's Home Bake</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/cart">
              <Nav.Link>Cart</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/wishlist">
              <Nav.Link>Wishlist</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/feedback">
              <Nav.Link>Feedback</Nav.Link>
            </LinkContainer>
          </Nav>
          <Search products={products} className="d-flex" />
          <Nav>
            {currentUser ? (
              <NavDropdown title={currentUser.email} id="basic-nav-dropdown">
                <LinkContainer to="/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/signup">
                  <Nav.Link>Sign Up</Nav.Link>
                </LinkContainer>
              </>
            )}
>>>>>>> gh-pages
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
