import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext.jsx';
import { getCart, updateCart } from '../services/database.js';
import { showToast } from '../utils/toast';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      loadCart();
    }
  }, [currentUser]);

  const loadCart = async () => {
    if (!currentUser) return;
    try {
      const cart = await getCart(currentUser.uid);
      setCartItems(cart.items || []);
    } catch (error) {
      console.error('Error loading cart:', error);
      showToast.error('Failed to load cart');
    }
  };

  const addToCart = async (product, quantity = 1) => {
    try {
      const newItems = [...cartItems];
      const existingItem = newItems.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        newItems.push({ ...product, quantity });
      }
      
      setCartItems(newItems);
      if (currentUser) {
        await updateCart(currentUser.uid, newItems);
      }
      showToast.success('Added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      showToast.error('Failed to add to cart');
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const newItems = cartItems.filter(item => item.id !== productId);
      setCartItems(newItems);
      if (currentUser) {
        await updateCart(currentUser.uid, newItems);
      }
      showToast.success('Removed from cart');
    } catch (error) {
      console.error('Error removing from cart:', error);
      showToast.error('Failed to remove from cart');
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const newItems = cartItems.map(item => 
        item.id === productId ? { ...item, quantity } : item
      );
      setCartItems(newItems);
      if (currentUser) {
        await updateCart(currentUser.uid, newItems);
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      showToast.error('Failed to update quantity');
    }
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    loadCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
