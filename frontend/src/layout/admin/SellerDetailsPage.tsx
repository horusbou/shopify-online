import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { UserType } from '../../types';
import { getSeller } from '../../utils/api';

const DetailsWrapper = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: hsl(var(--white));
  border-radius: 0.8rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  h2 {
    margin-bottom: 2rem;
  }
  .detail-row {
    font-size: 1.6rem;
    margin-bottom: 1.2rem;
  }
`;

const SellerDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [seller, setSeller] = useState<UserType>();

  const fetchSellerDetails = async () => { 
    if(id){
      const response = await getSeller(id)
      setSeller(response);
    }     

  };

  useEffect(() => {
    fetchSellerDetails();
  }, [id]);
  if (!id) {
    return <DetailsWrapper>Loading seller details...</DetailsWrapper>;
  }
  if (!seller) {
    return <DetailsWrapper>Loading seller details...</DetailsWrapper>;
  }
  console.log(seller)
  return (
    <DetailsWrapper>
      <h2>Seller Details</h2>
      <div className="detail-row">ID: {seller.id}</div>
      <div className="detail-row">Name: {seller.name}</div>
      <div className="detail-row">Email: {seller.email}</div>
      <div className="detail-row">Status: {seller.isActive ? 'Active' : 'Disabled'}</div>
    </DetailsWrapper>
  );
};

export default SellerDetailsPage;
