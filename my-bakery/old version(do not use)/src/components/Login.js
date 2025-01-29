import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { showToast } from '../utils/toast';
import * as yup from 'yup';

const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required')
});

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await loginSchema.validate({ email, password });
      setLoading(true);
      await login(email, password);
      showToast.success('Welcome back!');
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      showToast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
      showToast.success('Successfully signed in with Google!');
      navigate('/');
    } catch (error) {
      console.error('Google sign in error:', error);
      showToast.error('Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Log In</h2>
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
          <Button disabled={loading} className="w-100 mb-3" type="submit">
            Log In
          </Button>
          <Button 
            variant="outline-danger" 
            disabled={loading} 
            className="w-100"
            onClick={handleGoogleSignIn}
            type="button"
          >
            Sign in with Google
          </Button>
          <div className="text-center mt-3">
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
          </div>
        </Form>
      </div>
    </Container>
  );
}

export default Login;
