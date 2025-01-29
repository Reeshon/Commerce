<<<<<<< HEAD
import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify'; // Import toast from react-toastify

const WishlistContext = createContext();

// Custom hook to use the WishlistContext
export function useWishlist() {
  return useContext(WishlistContext);
}

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);

  // Function to add a product to the wishlist
  const addToWishlist = (product) => {
    setWishlistItems(prevItems => [...prevItems, product]);
    toast.success(`${product.name} added to wishlist!`); // Use toast for success notification
  };

  // Function to remove a product from the wishlist
  const removeFromWishlist = (productId) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== productId));
    toast.info(`Product removed from wishlist.`); // Use toast for info notification
  };

  // Function to check if a product is in the wishlist
  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const value = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist
  };

  return (
    <WishlistContext.Provider value={value}>
=======
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
>>>>>>> gh-pages
      {children}
    </WishlistContext.Provider>
  );
}
<<<<<<< HEAD
=======

export function useWishlist() {
  return useContext(WishlistContext);
}
>>>>>>> gh-pages
