import * as Yup from 'yup';

export const productSchema = Yup.object().shape({
  name: Yup.string().trim().required('Product name is required'),
  price: Yup.number().positive('Price must be positive').required('Price is required'),
  description: Yup.string().trim().required('Description is required'),
  image: Yup.string().url('Invalid image URL').required('Image URL is required'),
  category: Yup.string().trim().required('Category is required'),
  ingredients: Yup.array().of(Yup.string().trim()),
  allergens: Yup.array().of(Yup.string().trim()),
  stock: Yup.number().integer().min(0, 'Stock must be at least 0').required('Stock is required')
});

export const userSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  displayName: Yup.string().trim(),
  isAdmin: Yup.boolean(),
  createdAt: Yup.date().required('Creation date is required'),
  updatedAt: Yup.date()
});

export const orderSchema = Yup.object().shape({
  userId: Yup.string().required('User ID is required'),
  userEmail: Yup.string().email('Invalid email').required('User email is required'),
  items: Yup.array().of(
    Yup.object().shape({
      productId: Yup.string().required('Product ID is required'),
      quantity: Yup.number().integer().min(1, 'Quantity must be at least 1').required('Quantity is required'),
      price: Yup.number().positive('Price must be positive').required('Price is required'),
      name: Yup.string().trim().required('Product name is required')
    })
  ).required('Items are required'),
  status: Yup.string().oneOf(['pending', 'processing', 'shipped', 'delivered', 'cancelled']).required('Status is required'),
  subtotal: Yup.number().positive('Subtotal must be positive').required('Subtotal is required'),
  total: Yup.number().positive('Total must be positive').required('Total is required'),
  createdAt: Yup.date().required('Creation date is required'),
  updatedAt: Yup.date(),
  shippingAddress: Yup.object().shape({
    street: Yup.string().trim().required('Street is required'),
    city: Yup.string().trim().required('City is required'),
    state: Yup.string().trim().required('State is required'),
    postalCode: Yup.string().trim().required('Postal code is required'),
    country: Yup.string().trim().required('Country is required')
  })
});
