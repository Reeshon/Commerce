import axios from 'axios';

// Base URL for backend APIs
const BASE_URL = 'https://commerce-zeta-pearl.vercel.app/api';

// Products API
export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

// Cart API
// Add more service functions as needed
export const addToCartAPI = async (product, quantity) => {
  try {
    const response = await axios.post(`${BASE_URL}/cart`, { product, quantity });
    return response.data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

export const removeFromCartAPI = async (productName) => {
  try {
    const response = await axios.delete(`${BASE_URL}/cart/${productName}`);
    return response.data;
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};

export const updateCartAPI = async (productName, quantity) => {
  try {
    const response = await axios.put(`${BASE_URL}/cart/${productName}`, { quantity });
    return response.data;
  } catch (error) {
    console.error('Error updating cart:', error);
    throw error;
  }
};

// Wishlist API
export const addToWishlistAPI = async (product) => {
  try {
    const response = await axios.post(`${BASE_URL}/wishlist`, { product });
    return response.data;
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    throw error;
  }
};

export const removeFromWishlistAPI = async (productName) => {
  try {
    const response = await axios.delete(`${BASE_URL}/wishlist/${productName}`);
    return response.data;
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    throw error;
  }
};

// Search API
export const searchProductsAPI = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, { params: { q: query } });
    return response.data;
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
};