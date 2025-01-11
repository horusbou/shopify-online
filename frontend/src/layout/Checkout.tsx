import styled from 'styled-components'
import { useGlobalContext } from '../context/context'
import { useNavigate } from 'react-router-dom';
import { cartToOrder } from '../utils/api';
import { useEffect, useState } from 'react';
import ErrorModal from '../components/ErrorModal';

const CheckoutPage = () => {
  const { state: { cart, user },setCart } = useGlobalContext();
  const navigate = useNavigate();
  const [adressError,setAdressError] = useState(false)

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.amount, 0)
  }

  if(cart.length == 0){
    navigate("/")
    return;
  }
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }


    if (cart.length === 0) {
      navigate('/');
      return;
    }
  }, [cart, user, navigate]);

  async function handleSubmit() {
    if(user?.address && user?.city && user?.country){
      await cartToOrder()
      setCart([])
    }else{
      setAdressError(true)
    }
  }

  return (
    <CheckoutWrapper>
      {adressError && <ErrorModal  message="you need to add adresse to proceed." onClose={()=>setAdressError(false)} />}
      <h1>Checkout</h1>
      <div className="order-summary">
        <h2>Order Summary</h2>
        <ul>
          {cart.map(item => (
            <li key={item.id}>
              <div className="item-details">
                <span className="item-name">{item.name}</span>
                <span className="item-price">${item.price.toFixed(2)}</span>
                <span className="item-quantity">x{item.amount}</span>
              </div>
            </li>
          ))}
        </ul>
        <div className="total">
          <span>Total:</span>
          <span>${calculateTotal().toFixed(2)}</span>
        </div>
      </div>

      <div className="shipping-info">
        <h2>Shipping Information</h2>
          <div className="stored-address">
            <p><strong>Address:</strong> {user.address}</p>
            <p><strong>City:</strong> {user.city}</p>
            <p><strong>Postal Code:</strong> {user.postalCode}</p>
            <p><strong>Country:</strong> {user.country}</p>
          </div>
      </div>

      <button className="submit-btn" onClick={handleSubmit}>Complete Order</button>
    </CheckoutWrapper>
  )
}


const CheckoutWrapper = styled.section`

padding: 2.4rem;
max-width: 1200px;
margin: 0 auto;

h1 {
  font-size: 2.4rem;
  text-align: center;
  margin-bottom: 2.4rem;
}

.order-summary {
  background-color: hsl(var(--light-gray));
  padding: 2rem;
  border-radius: 0.8rem;
  margin-bottom: 3.2rem;

  h2 {
    font-size: 1.8rem;
    margin-bottom: 1.2rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      display: flex;
      justify-content: space-between;
      padding: 0.8rem 0;
      border-bottom: 1px solid hsl(var(--grayish-blue));

      .item-details {
        display: flex;
        justify-content: space-between;
        width: 100%;
      }
    }
  }

  .total {
    font-size: 1.8rem;
    font-weight: 700;
    display: flex;
    justify-content: space-between;
    margin-top: 2.4rem;
  }
}

.shipping-info,
.payment-info {
  margin-bottom: 2.4rem;

  h2 {
    font-size: 1.8rem;
    margin-bottom: 1.2rem;
  }

  input {
    width: 100%;
    padding: 1.2rem;
    margin-bottom: 1.2rem;
    font-size: 1.4rem;
    border: 1px solid hsl(var(--grayish-blue));
    border-radius: 0.6rem;
  }
}

.submit-btn {
  width: 100%;
  padding: 1.6rem;
  border:solid 1px hsl(var(--orange));
  background-color: hsl(var(--orange));
  color: white;
  font-size: 1.6rem;
  font-weight: 700;
  border: none;
  border-radius: 0.8rem;
  cursor: pointer;

  &:hover {
    background-color: hsl(var(--dark-orange));
    border:solid 1px hsl(var(--orange));
    color: hsl(var(--orange));
  }
}
  .address-option {
    margin-bottom: 1.6rem;

    label {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      font-size: 1.4rem;
      cursor: pointer;
    }

    input {
      flex-grow: 0;
      width:50%;
    }
    p {
      flex-grow: 1;
    }
  }

  .stored-address, .new-address {
    margin-top: 1.6rem;

    p {
      font-size: 1.4rem;
      margin: 0.4rem 0;
    }
  }
`

export default CheckoutPage
