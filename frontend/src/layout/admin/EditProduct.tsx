import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getProduct, updateProduct } from '../../utils/api';
import { Product } from '../../types';

const EditWrapper = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: hsl(var(--white));
  border-radius: 0.8rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  h2 {
    margin-bottom: 1.5rem;
  }

  .input-group {
    margin-bottom: 1rem;
  }

  input, textarea {
    width: 100%;
    padding: 0.8rem;
    border-radius: 0.4rem;
    border: 1px solid hsl(var(--divider));
  }

  button {
    background-color: hsl(var(--orange));
    color: white;
    border: none;
    border-radius: 0.4rem;
    padding: 0.8rem 1.5rem;
    font-size: 1.2rem;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: hsl(var(--dark-orange));
    }
  }
`;

const EditProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [productData, setProductData] = useState<Product>({
    id:'',
    image:'',
    name: '',
    description: '',
    price: 0,
    amount: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
    if(id){
        const response = await getProduct(id)
        setProductData(response);
    }

    };

    fetchProduct();
  }, [id]);

  const handleChange = <K extends keyof Product>(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const fieldName = e.target.name as K;
    console.log(fieldName)
    setProductData({ ...productData, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(id){
        await updateProduct(id,productData)
        navigate(`/products/${id}`);
    }
  };

  return (
    <EditWrapper>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" value={productData?.name} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" value={productData?.description} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label htmlFor="price">Price</label>
          <input id="price" name="price" type="number" min="0" value={productData?.price} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label htmlFor="stock">Stock</label>
          <input id="stock" name="amount" type="number" min="0" value={productData?.amount} onChange={handleChange} required />
        </div>
        <button type="submit">Update Product</button>
      </form>
    </EditWrapper>
  );
};

export default EditProductPage;
