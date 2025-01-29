import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { updateWishlist, getWishlist } from '../services/database';
import { showToast } from '../utils/toast';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [items, setItems] = useState([]);
  const { currentUser } = useAuth();

  const loadWishlist = useCallback(async () => {
    try {
      const wishlistItems = await getWishlist(currentUser.uid);
      setItems(wishlistItems);
    } catch (error) {
      console.error('Failed to load wishlist:', error);
      showToast.error('Failed to load wishlist');
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      loadWishlist();
    } else {
      setItems([]);
    }
  }, [currentUser, loadWishlist]);

  const addToWishlist = async (product) => {
    try {
      const newItems = [...items, product];
      await updateWishlist(currentUser.uid, newItems);
      setItems(newItems);
      showToast.success('Added to wishlist');
    } catch (error) {
      console.error('Failed to add to wishlist:', error);
      showToast.error('Failed to add to wishlist');
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const newItems = items.filter(item => item.id !== productId);
      await updateWishlist(currentUser.uid, newItems);
      setItems(newItems);
      showToast.success('Removed from wishlist');
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
      showToast.error('Failed to remove from wishlist');
    }
  };

  return (
    <WishlistContext.Provider value={{ items, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
