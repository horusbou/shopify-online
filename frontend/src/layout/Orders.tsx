import { useState, useEffect } from "react";
import styled from "styled-components";
import { deleteAnOrder, getUserUnderReviewOrders,getUserInctiveOrders } from "../utils/api";
import { Cart } from "../types";
import { useGlobalContext } from "../context/context";

const Orders = () => {
  const {state:{user}} = useGlobalContext()
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  const handleOrderClick = (order: any) => {
    setSelectedOrder(order);
  };

  useEffect(() => {
    async function getDataFromApi() {
      let orders: Cart[] = ((await Promise.all([getUserUnderReviewOrders(user?.id),getUserInctiveOrders(user?.id)])).flat());
      setOrders(
        orders.map((o) => ({
          id: o.id,
          status: o?.status,
          items: o?.cartProducts.length,
          products: o.cartProducts.map((p) => ({
            name: p.product.name,
            quantity: p.quantity,
            stock: p.product.amount,
          })),
        }))
      );
    }
    getDataFromApi();
  }, []);

  const handleOrderDelete = async (orderId: string) => {
        await deleteAnOrder(orderId);
        setOrders(orders.filter((order) => order.id !== orderId));
  };

  return (
    <OrdersWrapper>
      <h1>Order Status</h1>
      {orders.length > 0 ? (
        <OrdersTable>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Status</th>
              <th>Items</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.status}</td>
                <td>{order.items}</td>
                <td>
                  <button onClick={() => handleOrderClick(order)}>View</button>
                  {order.status=="under_review" &&<button onClick={() => handleOrderDelete(order.id)} style={{ marginLeft: "0.5rem", backgroundColor: "red" }}>
                    Delete
                  </button>}
                </td>
              </tr>
            ))}
          </tbody>
        </OrdersTable>
      ) : (
        <p>No orders found.</p>
      )}

      {selectedOrder && (
        <OrderDetailsWrapper>
            <CloseButton onClick={() => setSelectedOrder(null)}>X</CloseButton>
          <h2>Order Details: {selectedOrder.id}</h2>
          <ProductsTable>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {selectedOrder.products.map((product: any, index: number) => (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>{product.stock}</td>
                </tr>
              ))}
            </tbody>
          </ProductsTable>
        </OrderDetailsWrapper>
      )}
    </OrdersWrapper>
  );
};

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.8rem;
  cursor: pointer;
  color: #888;

  &:hover {
    color: #000;
  }
`;

const OrdersWrapper = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;

  h1 {
    font-size: 2.4rem;
    margin-bottom: 1.5rem;
    color: #333;
  }

  p {
    font-size: 1.2rem;
    color: gray;
  }
`;

const OrdersTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;

  thead {
    background-color: #007bff;
    color: white;
  }

  th, td {
    padding: 1rem;
    text-align: center;
    border: 1px solid #ddd;
  }

  tbody tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  tbody tr:hover {
    background-color: #e6f7ff;
  }

  button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
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

    th {
      background-color: #f4f4f4;
    }
  }
`;


const ProductsTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead {
    background-color: #28a745;
    color: white;
  }

  th, td {
    padding: 1rem;
    text-align: center;
    border: 1px solid #ddd;
  }

  tbody tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  tbody tr:hover {
    background-color: #d4edda;
  }
`;

export default Orders;
