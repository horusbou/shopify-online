import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { activateSeller, disableSeller, getSellers } from '../../utils/api';
import { UserType } from '../../types';

const TableWrapper = styled.div`
  background-color: hsl(var(--white));
  border-radius: 0.8rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin: 2rem auto;
  width: 100%;
  max-width: 800px;

  h2 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 2rem;
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

  .btn-group {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  .view-btn, .disable-btn, .activate-btn {
    padding: 0.8rem 1.2rem;
    font-size: 1.2rem;
    border-radius: 0.6rem;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .view-btn {
    background-color: hsl(var(--orange));
    color: white;
    border:solid 1px hsl(var(--orange));
  }

  .view-btn:hover {
    background-color: hsl(var(--dark-orange));
    color:hsl(var(--orange));
  }

  .disable-btn {
    color: red;
    border:solid 1px red;
  }

  .disable-btn:hover {
    background-color: red;
    color:white;
  }
  .activate-btn {
    background-color: green;
    color: white;
  }

  .activate-btn:hover {
    background-color: darkgreen;
  }
`;

const SellerPage: React.FC = () => {
  const [sellers, setSellers] = useState<UserType[]>([]);
  const navigate = useNavigate();

  const handleDisable = (id: string) => {
    const updatedSellers = sellers.map((seller) =>
      seller.id === id ? { ...seller, isActive: false } : seller
    );
    disableSeller(id)
    setSellers(updatedSellers);
  };
  const handleActivate = (id: string) => {
    const updatedSellers = sellers.map((seller) =>
      seller.id === id ? { ...seller, isActive: true } : seller
    );
    activateSeller(id)
    setSellers(updatedSellers);
  };

  const fetchSellers = async () => {
    const response = await getSellers()
    setSellers(response);
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  /*const handleDisable = async (id: number) => {
    await axios.put(`/api/sellers/${id}/disable`);
    fetchSellers(); 
  };*/

  const handleViewDetails = (id: number) => {
    navigate(`/admin/sellers/${id}`);
  };

  return (
    <TableWrapper>
      <h2>Seller Management</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sellers.map((seller: any) => (
            <tr key={seller.id}>
              <td>{seller.id}</td>
              <td>{seller.name}</td>
              <td>{seller.email}</td>
              <td>{seller.isActive ? 'Active' : 'Disabled'}</td>
              <td className="btn-group">
                <button
                  className="view-btn"
                  onClick={() => handleViewDetails(seller.id)}
                >
                  View Details
                </button>
                {seller.isActive ? (
                  <button
                    className="disable-btn"
                    onClick={() => handleDisable(seller.id)}
                  >
                    Disable
                  </button>
                ) : (
                  <button
                    className="activate-btn"
                    onClick={() => handleActivate(seller.id)}
                  >
                    Re-Activate
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableWrapper>
  );
};

export default SellerPage;
