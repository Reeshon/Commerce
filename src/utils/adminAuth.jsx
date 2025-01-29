import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

export const requireAdmin = (Component) => {
    return function AdminProtectedComponent(props) {
        const [isAdminUser, setIsAdminUser] = useState(false);
        const [loading, setLoading] = useState(true);
        const { currentUser } = useAuth();
        const navigate = useNavigate();

        useEffect(() => {
            const checkAdminStatus = async () => {
                if (!currentUser) {
                    navigate('/login');
                    return;
                }

                try {
                    const db = getFirestore();
                    const userRef = doc(db, 'users', currentUser.uid);
                    const userSnap = await getDoc(userRef);

                    if (userSnap.exists() && userSnap.data().isAdmin) {
                        setIsAdminUser(true);
                    } else {
                        navigate('/');
                    }
                } catch (error) {
                    console.error('Error checking admin status:', error);
                    navigate('/');
                } finally {
                    setLoading(false);
                }
            };

            checkAdminStatus();
        }, [currentUser, navigate]);

        if (loading) return <div>Loading...</div>;
        return isAdminUser ? <Component {...props} /> : null;
    };
};