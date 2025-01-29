import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { updateWishlist, getWishlist } from '../services/database';
import { showToast } from '../utils/toast';

const WishlistContext = createContext();

export const useWishlist = () => {
  return useContext(WishlistContext);
};

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const { currentUser } = useAuth();

  const loadWishlist = useCallback(async () => {
    try {
      const wishlistItems = await getWishlist(currentUser.uid);
      setWishlistItems(wishlistItems);
    } catch (error) {
      console.error('Failed to load wishlist:', error);
      showToast.error('Failed to load wishlist');
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      loadWishlist();
    } else {
      setWishlistItems([]);
    }
  }, [currentUser, loadWishlist]);

  const addToWishlist = async (product) => {
    if (!currentUser) {
      showToast.error('Please log in to add items to your wishlist');
      return;
    }
    try {
      const newItems = [...wishlistItems, product];
      setWishlistItems(newItems);
      await updateWishlist(currentUser.uid, newItems);
      showToast.success('Added to wishlist');
    } catch (error) {
      console.error('Failed to add to wishlist:', error);
      showToast.error('Failed to add to wishlist');
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const newItems = wishlistItems.filter(item => item.id !== productId);
      setWishlistItems(newItems);
      await updateWishlist(currentUser.uid, newItems);
      showToast.success('Removed from wishlist');
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
      showToast.error('Failed to remove from wishlist');
    }
  };

  const value = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
