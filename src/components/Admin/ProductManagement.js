import React, { useState, useEffect, useCallback } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import { getProducts, addProduct, updateProduct } from '../../services/database';
import { showToast } from '../../utils/toast';
import ProductForm from '../ProductForm';
import MetaTags from '../MetaTags';

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const loadProducts = useCallback(async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      showToast.error('Failed to load products');
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleSaveProduct = async (product) => {
    try {
      if (currentProduct?.id) {
        await updateProduct(currentProduct.id, product);
        showToast.success('Product updated successfully');
      } else {
        await addProduct(product);
        showToast.success('Product added successfully');
      }
      setShowModal(false);
      loadProducts();
    } catch (error) {
      showToast.error(error.message);
    }
  };

  return (
    <>
      <MetaTags 
        title="Product Management - Deleen's Home Bake" 
        description="Manage products in the admin dashboard." 
        keywords="admin, product management, home bake, cakes, bread, pastries, cookies" 
      />
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Product Management</h2>
        <Button onClick={() => {
          setCurrentProduct(null);
          setShowModal(true);
        }}>
          Add New Product
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.description}</td>
              <td>
                <Button 
                  variant="outline-primary" 
                  size="sm"
                  onClick={() => {
                    setCurrentProduct(product);
                    setShowModal(true);
                  }}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentProduct ? 'Edit Product' : 'Add New Product'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProductForm 
            initialData={currentProduct || {}} 
            onSubmit={handleSaveProduct} 
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProductManagement;
