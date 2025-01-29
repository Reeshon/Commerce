import * as yup from 'yup';

export const productSchema = yup.object().shape({
  name: yup.string().trim().required('Product name is required'),
  price: yup.number().positive('Price must be positive').required('Price is required'),
  description: yup.string().trim().required('Description is required'),
  image: yup.string().url('Invalid image URL').required('Image URL is required'),
  category: yup.string().trim().required('Category is required'),
  ingredients: yup.array().of(yup.string().trim()),
  allergens: yup.array().of(yup.string().trim()),
  stock: yup.number().integer().min(0, 'Stock must be at least 0').required('Stock is required')
});

export const userSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  displayName: yup.string().trim(),
  isAdmin: yup.boolean(),
  createdAt: yup.date().required('Creation date is required'),
  updatedAt: yup.date()
});

export const orderSchema = yup.object().shape({
  userId: yup.string().required('User ID is required'),
  userEmail: yup.string().email('Invalid email').required('User email is required'),
  items: yup.array().of(
    yup.object().shape({
      productId: yup.string().required('Product ID is required'),
      quantity: yup.number().integer().min(1, 'Quantity must be at least 1').required('Quantity is required'),
      price: yup.number().positive('Price must be positive').required('Price is required'),
      name: yup.string().trim().required('Product name is required')
    })
  ).required('Items are required'),
  status: yup.string().oneOf(['pending', 'processing', 'shipped', 'delivered', 'cancelled']).required('Status is required'),
  subtotal: yup.number().positive('Subtotal must be positive').required('Subtotal is required'),
  total: yup.number().positive('Total must be positive').required('Total is required'),
  createdAt: yup.date().required('Creation date is required'),
  updatedAt: yup.date(),
  shippingAddress: yup.object().shape({
    street: yup.string().trim().required('Street is required'),
    city: yup.string().trim().required('City is required'),
    state: yup.string().trim().required('State is required'),
    postalCode: yup.string().trim().required('Postal code is required'),
    country: yup.string().trim().required('Country is required')
  })
});
