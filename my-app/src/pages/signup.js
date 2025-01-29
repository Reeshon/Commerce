import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Form, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { showToast } from '../utils/toast';
import MetaTags from '../components/MetaTags';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup, signInWithGoogle } = useAuth();
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      showToast.error('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      await signup(email, password);
      showToast.success('Account created successfully!');
      router.push('/');
    } catch (error) {
      console.error('Signup error:', error);
      showToast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
      showToast.success('Successfully signed up with Google!');
      router.push('/');
    } catch (error) {
      console.error('Google sign up error:', error);
      showToast.error('Failed to sign up with Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
      <MetaTags 
        title="Sign Up - Deleen's Home Bake" 
        description="Create a new account." 
        keywords="sign up, home bake, cakes, bread, pastries, cookies" 
      />
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Sign Up</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group id="email" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group id="password" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group id="password-confirm" className="mb-3">
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control 
              type="password" 
              required 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Button disabled={loading} className="w-100 mb-3" type="submit">
            Sign Up
          </Button>
          <Button 
            variant="outline-danger" 
            disabled={loading} 
            className="w-100"
            onClick={handleGoogleSignIn}
            type="button"
          >
            Sign up with Google
          </Button>
          <div className="text-center mt-3">
            <p>Already have an account? <a href="/login">Log In</a></p>
          </div>
        </Form>
      </div>
    </Container>
  );
}

export default Signup;