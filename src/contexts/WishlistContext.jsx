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
      {children}
    </WishlistContext.Provider>
  );
}
