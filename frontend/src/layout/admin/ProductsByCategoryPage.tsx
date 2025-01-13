import React, { useEffect, useState } from "react";
import { getProductsByCategory, removeProductFromCategory } from "../../utils/api";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Product } from "../../types";

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

  .remove-btn {
    background-color: red;
    color: white;
  }

  .btn:hover {
    opacity: 0.8;
  }
`;

const ProductsByCategoryPage: React.FC = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    if (categoryId) {
      const response = await getProductsByCategory(categoryId);
      setProducts(response);
    }
  };

  const handleRemoveProduct = async (productId: string) => {
    if (categoryId) {
      await removeProductFromCategory(categoryId, productId);
      fetchProducts(); // Refresh the product list
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [categoryId]);

  return (
    <ProductsWrapper>
      <h2>Products in Category</h2>
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
                <button className="btn remove-btn" onClick={() => handleRemoveProduct(product.id)}>
                  Remove from Category
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ProductsWrapper>
  );
};

export default ProductsByCategoryPage;
