import { db } from '../config/firebase';
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs,
  setDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  addDoc
} from 'firebase/firestore';
import { productSchema, userSchema, orderSchema } from './validation';

// Utility functions
const updateProductStock = async (productId, quantity) => {
  const productRef = doc(db, 'products', productId);
  const productSnap = await getDoc(productRef);
  
  if (!productSnap.exists()) {
    throw new Error('Product not found');
  }

  const currentStock = productSnap.data().stock;
  if (currentStock + quantity < 0) {
    throw new Error('Insufficient stock');
  }

  await updateDoc(productRef, {
    stock: currentStock + quantity,
    updatedAt: serverTimestamp()
  });
};

const clearCart = async (userId) => {
  await deleteDoc(doc(db, 'carts', userId));
};

// Users
export const createUserProfile = async (uid, data) => {
  try {
    await setDoc(doc(db, 'users', uid), data);
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};

export const getUserProfile = async (userId) => {
  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
};

// Orders
export const createOrder = async (userId, orderData) => {
  await orderSchema.validate(orderData);

  // Validate stock availability
  for (const item of orderData.items) {
    const productSnap = await getDoc(doc(db, 'products', item.productId));
    if (!productSnap.exists()) {
      throw new Error(`Product ${item.productId} not found`);
    }
    if (productSnap.data().stock < item.quantity) {
      throw new Error(`Insufficient stock for ${productSnap.data().name}`);
    }
  }

  // Create order and update stock
  const orderRef = await addDoc(collection(db, 'orders'), {
    ...orderData,
    userId,
    status: 'pending',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });

  // Update product stock
  for (const item of orderData.items) {
    await updateProductStock(item.productId, -item.quantity);
  }

  // Clear cart after successful order
  await clearCart(userId);

  return orderRef.id;
};

export const getUserOrders = async (userId) => {
  const q = query(collection(db, 'orders'), where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const updateOrderStatus = async (orderId, status) => {
  await updateDoc(doc(db, 'orders', orderId), { 
    status,
    updatedAt: new Date().toISOString()
  });
};

// Admin Orders
export const getAllOrders = async () => {
  const q = query(
    collection(db, 'orders'), 
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const getOrderDetails = async (orderId) => {
  const docRef = doc(db, 'orders', orderId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

// Wishlist
export const updateWishlist = async (uid, items) => {
  try {
    const docRef = doc(db, 'wishlists', uid);
    await setDoc(docRef, { items }, { merge: true });
  } catch (error) {
    console.error('Error updating wishlist:', error);
    throw error;
  }
};

export const getWishlist = async (uid) => {
  try {
    const docRef = doc(db, 'wishlists', uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data().items : [];
  } catch (error) {
    console.error('Error getting wishlist:', error);
    throw error;
  }
};

// Products
export const getProducts = async () => {
  const querySnapshot = await getDocs(collection(db, 'products'));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const updateProduct = async (productId, data) => {
  await productSchema.validate(data);
  await updateDoc(doc(db, 'products', productId), data);
};

// Admin Products
export const addProduct = async (productData) => {
  await productSchema.validate(productData);
  return await addDoc(collection(db, 'products'), {
    ...productData,
    stock: productData.stock || 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
};

// Admin Users
export const setUserRole = async (userId, isAdmin) => {
  await updateDoc(doc(db, 'users', userId), {
    isAdmin,
    updatedAt: new Date().toISOString()
  });
};

// Analytics
export const getOrderAnalytics = async () => {
  const querySnapshot = await getDocs(collection(db, 'orders'));
  const orders = querySnapshot.docs.map(doc => doc.data());
  
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const averageOrderValue = totalOrders ? totalRevenue / totalOrders : 0;
  
  const statusBreakdown = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});

  return {
    totalOrders,
    totalRevenue,
    averageOrderValue,
    statusBreakdown
  };
};

// Carts
export const getCart = async (userId) => {
  const docRef = doc(db, 'carts', userId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : { items: [] };
};

export const updateCart = async (userId, items) => {
  await setDoc(doc(db, 'carts', userId), {
    userId,
    items,
    updatedAt: serverTimestamp()
  });
};
