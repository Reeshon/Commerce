import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { showToast } from './toast';
import { auth } from '../config/firebase';

export const isAdmin = async () => {
  try {
    const idTokenResult = await auth.currentUser?.getIdTokenResult();
    return idTokenResult?.claims?.admin === true;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};

export const requireAdmin = (Component) => {
  return function AdminProtectedComponent(props) {
    const [isAdminUser, setIsAdminUser] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
      const checkAdmin = async () => {
        const admin = await isAdmin();
        if (!admin) {
          navigate('/');
          showToast.error('Access denied');
        }
        setIsAdminUser(admin);
        setLoading(false);
      };
      checkAdmin();
    }, [navigate]);

    if (loading) return <div>Loading...</div>;
    return isAdminUser ? <Component {...props} /> : null;
  };
};
