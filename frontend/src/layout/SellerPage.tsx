import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getUserUnderReviewOrders,deleteAnOrder,getUserInctiveOrders, validateAnOrder } from '../utils/api';
import { Cart, CartProduct } from '../types';

interface Order {
  id: string;
  customerName: string;
  items: number;
  cartProduct:CartProduct[];
  totalAmount: number;
  status: string;
}

const SellerPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(()=>{
    setIsLoading(true)
    async function getOrders() {
      let carts: Cart[] = (await Promise.all([getUserUnderReviewOrders(),getUserInctiveOrders()])).flat();
      let refactored:Order[] = carts.map(c=>({
        id:c.id,
        customerName:c.user?.name,
        items:c.cartProducts.length,
        cartProduct:c.cartProducts,
        totalAmount:c.cartProducts.map(p=>p.quantity*p.product.price).reduce((a,b)=>a+b,0),
        status:c.status
      }))
      console.log({refactored})
      setOrders(refactored)
    }
    getOrders()
    setIsLoading(false)
  },[])


  const handleViewOrder = (order:any)=>{
    setSelectedOrder(order);
  }
  const handleValidateOrder = async (orderId: string) => {
    setOrders(orders.map(order =>
      order.id === orderId && order.status === 'under_review'
        ? { ...order, status: 'active' }
        : order
    ));
    await validateAnOrder(orderId)
  };

  const handleCancelOrder = async (orderId: string) => {
    setOrders(orders.map(order =>
      order.id === orderId && order.status === 'under_review'
        ? { ...order, status: 'inactive' }
        : order
    ));
    await deleteAnOrder(orderId)
  };

  return (
    <Container>
      <Heading>Orders to Validate</Heading>
      {isLoading ? (
        <LoadingText>Loading orders...</LoadingText>
      ) : (
        <Table>
          <thead>
            <tr>
              <TableHeader>Order ID</TableHeader>
              <TableHeader>Customer Name</TableHeader>
              <TableHeader>Items</TableHeader>
              <TableHeader>Total Amount</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Actions</TableHeader>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.items}</TableCell>
                <TableCell>{order.totalAmount} USD</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  {
                    order.status === 'under_review' ?
                    <>
                      <ValidateButton onClick={() => handleValidateOrder(order.id)}>
                        Validate Order
                      </ValidateButton>
                      <CancelButton onClick={() => handleCancelOrder(order.id)}>
                        Cancel Order
                      </CancelButton>
                    </>
                    :
                    <>
                    <ViewButton onClick={() => handleViewOrder(order)}>
                        View Order
                      </ViewButton>   
                    </>
                  }
                </TableCell>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {selectedOrder && (
        <OrderDetailsWrapper>
            <CloseButton onClick={() => setSelectedOrder(null)}>X</CloseButton>
          <h2>Order Details: {selectedOrder.id}</h2>
          <ProductsTable>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>price</th>
                <th>Quantity</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
            {selectedOrder.cartProduct.map((cproduct) => (
                <tr key={cproduct.id}>
                  <td>{cproduct.product.name}</td>
                  <td>{cproduct.product.price}</td>
                  <td>{cproduct.quantity}</td>
                  <td>{cproduct.product.amount}</td>
                </tr>
              ))}
            </tbody>
          </ProductsTable>
        </OrderDetailsWrapper>
      )}
    </Container>
  );
};

export default SellerPage;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.8rem;
  cursor: pointer;
  color: black;

  &:hover {
    color: black;
  }
`;
const OrderDetailsWrapper = styled.div`
  position: relative;
  margin-top: 2rem;
  padding: 1.6rem;
  background-color: #f0f0f0;
  border-radius: 0.6rem;

  h2 {
    font-size: 1.8rem;
    margin-bottom: 1.2rem;
  }

  table {
    width: 100%;
    border-collapse: collapse;

    th, td {
      border: 1px solid #ddd;
      padding: 0.8rem;
      text-align: left;
    }

  }
`;


const ProductsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 0.5rem;
  overflow: hidden;

  thead {
    background-color: hsl(220, 13%, 18%);
    color: white;
  }

  th, td {
    padding: 1rem;
    text-align: center;
    border: 1px solid hsl(0, 0%, 90%);
  }

  th {
    font-size: 1.2rem;
    text-transform: uppercase;
    letter-spacing: 0.05rem;
  }

  tbody tr:nth-child(even) {
    background-color: hsl(220, 14%, 96%);
  }

  tbody tr:nth-child(odd) {
    background-color: hsl(0, 0%, 100%);
  }

  tbody tr:hover {
    background-color: hsl(140, 40%, 85%);
    transition: background-color 0.3s ease;
  }

  td {
    font-size: 1.1rem;
  }

  caption {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: hsl(220, 13%, 30%);
    font-weight: bold;
  }
`;



const Container = styled.div`
  padding: 20px;
`;

const Heading = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const LoadingText = styled.p`
  font-size: 1.2rem;
  color: black;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
`;

const ValidateButton = styled.button`
  padding: 5px 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  margin-right: 10px;

  &:hover {
    background-color: #45a049;
  }
`;

const CancelButton = styled.button`
  padding: 5px 10px;
  background-color: #f44336;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #d32f2f;
  }
`;

const ViewButton = styled.button`
  padding: 5px 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  margin-left: 10px;

  &:hover {
    background-color: #45a049;
  }
`;
