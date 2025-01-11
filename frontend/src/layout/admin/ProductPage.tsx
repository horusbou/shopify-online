import React, { useState } from 'react';
import styled from 'styled-components';
import { addProducts } from '../../utils/api';

const CardWrapper = styled.section`
  background-color: white;
  border-radius: 0.8rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding: 1.6rem;
  width: 100%;
  max-width: 50rem;
  margin: 1.6rem auto;

  @media screen and (min-width: 600px) {
    width: 100%;
  }

  .product-form {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  }

  input,
  textarea {
    width: 100%;
    padding: 1rem;
    font-size: 1.4rem;
    border: 1px solid hsl(var(--divider));
    border-radius: 0.6rem;
  }

  textarea {
    resize: none;
    height: 100px;
  }

  label {
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    display: block;
  }

  .submit-btn {
    background-color: hsl(var(--orange));
    color: white;
    font-size: 1.6rem;
    font-weight: 700;
    padding: 1rem 1.5rem;
    border: none;
    border-radius: 0.6rem;
    cursor: pointer;
    text-align: center;
    width: 100%;
    transition: background-color 0.3s, color 0.3s, border 0.3s;

    &:hover {
      background-color: hsl(var(--dark-orange));
    }
  }

  .product-list {
    margin-top: 2rem;
  }

  .product-item {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.6rem;
    border: 1px solid hsl(var(--divider));
    border-radius: 0.8rem;
    background-color: hsl(var(--pale-orange));
  }

  .product-item img {
    max-width: 100%;
    height: auto;
    border-radius: 0.8rem;
  }
`;

const ProductPage: React.FC = () => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    imageFile: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProductData({ ...productData, imageFile: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('description', productData.description);
    formData.append('price', productData.price);
    formData.append('stock', productData.stock);
    if (productData.imageFile) {
      formData.append('image', productData.imageFile);
    }
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    await addProducts(formData)
    

    //setProductData({ name: '', description: '', price: '', stock: '', imageFile: null });
  };

  return (
    <CardWrapper>
      <h2>Add Product</h2>
      <form className="product-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Product Name</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Enter product name"
          value={productData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          placeholder="Enter product description"
          value={productData.description}
          onChange={handleChange}
          required
        />

        <label htmlFor="price">Price</label>
        <input
          id="price"
          name="price"
          type="number"
          placeholder="Enter product price"
          min={0}
          value={productData.price}
          onChange={handleChange}
          required
        />

        <label htmlFor="stock">Stock</label>
        <input
          id="stock"
          name="stock"
          type="number"
          placeholder="Enter stock quantity"
          min={0}
          value={productData.stock}
          onChange={handleChange}
          required
        />

        <label htmlFor="imageUpload">Upload Image</label>
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />

        <button type="submit" className="submit-btn">
          Add Product
        </button>
      </form>

    </CardWrapper>
  );
};

export default ProductPage;
