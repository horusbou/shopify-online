import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { deleteProduct, getProducts } from '../../utils/api';

const ProductsWrapper = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1rem;
  background-color: hsl(var(--white));
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h2 {
    margin-bottom: 1.5rem;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    padding: 1rem;
    border-bottom: 1px solid hsl(var(--divider));
    text-align: center;
    font-size: 1.4rem;
  }

  th {
    background-color: hsl(var(--light-grayish-blue));
    color: hsl(var(--very-dark-blue));
  }

  tr:hover {
    background-color: hsl(var(--pale-orange));
  }

  .action-buttons {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
  }

  .btn {
    padding: 0.5rem 1rem;
    font-size: 1.2rem;
    border-radius: 0.4rem;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .view-btn {
    background-color: hsl(var(--orange));
    color: white;
  }

  .edit-btn {
    background-color: green;
    color: white;
  }

  .delete-btn {
    background-color: red;
    color: white;
  }

  .btn:hover {
    opacity: 0.8;
  }
`;

interface Product {
  id: string;
  name: string;
  price: number;
  amount: number;
  description: string;
  image: string;
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await getProducts()
      setProducts(response);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts(); // Fetch products when the component mounts
  }, []);

  const handleDelete = async (id: string) => {
      try {
        await deleteProduct(id)
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    
  };

  const handleViewDetails = (id: string) => {
    navigate(`/products/${id}`);
  };

  const handleEditProduct = (id: string) => {
    navigate(`/admin/products/edit/${id}`); 
  };

  return (
    <ProductsWrapper>
      <h2>All Products</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.amount}</td>
              <td className="action-buttons">
                <button className="btn view-btn" onClick={() => handleViewDetails(product.id)}>View</button>
                <button className="btn edit-btn" onClick={() => handleEditProduct(product.id)}>Edit</button>
                <button className="btn delete-btn" onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ProductsWrapper>
  );
};

export default ProductsPage;
