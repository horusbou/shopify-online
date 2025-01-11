import SingleCartItem from "./SingleCartItem"
import { useGlobalContext } from "../context/context"
import styled from "styled-components"
import { Link } from "react-router-dom"

const FloatingCart = ({ className }:{className:string}) => {
  const { state } = useGlobalContext()
  return (
    <FloatingCartWrapper className={className}>
      <header>
        <p>Cart</p>
      </header>
      <div className="divider"></div>
      <ul className="cart-items">
        {state.cart.length > 0 ? (
          state.cart.map((cartItem) => {
            return <SingleCartItem key={cartItem.id} {...cartItem} />
          })
        ) : (
          <p className="empty">Your cart is empty.</p>
        )}
        {state.cart.length > 0 && <CheckoutLink to="/checkout">Checkout</CheckoutLink>}
      </ul>
    </FloatingCartWrapper>
  )
}

const CheckoutLink = styled(Link)`
  display: inline-block;
  padding: 1rem 2.4rem;
  background-color: hsl(var(--orange));
  color: white;
  font-size: 1.6rem;
  font-weight: 700;
  border-radius: 0.6rem;
  text-align: center;
  width: 100%;
  transition: background-color 0.3s, color 0.3s;
  border:solid 1px hsl(var(--orange));

  &:hover {
    background-color: hsl(var(--dark-orange));
    color: hsl(var(--orange));
  }
`

const FloatingCartWrapper = styled.div`
  display: none;
  position: absolute;
  border-radius: 1rem;
  background-color: hsl(var(--white));
  top: 6rem;
  right: -1.6rem;
  margin: 0 auto;
  z-index: 1000;
  width: 36rem;
  box-shadow: 0 2rem 5rem -2rem hsl(var(--black) / 0.9);
  &.active {
    display: block;
  }

  header {
    padding: 2.4rem 2.4rem 0 2.4rem;
    margin-bottom: 2.7rem;

    p {
      font-size: 1.6rem;
      font-weight: 700;
    }
  }

  .divider {
    width: 100%;
    height: 0.1rem;
    background-color: hsl(var(--divider));
  }

  .cart-items {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2.4rem;
    min-height: 18.8rem;
    gap: 2.4rem;

    .empty {
      text-align: center;
      font-size: 1.6rem;
      line-height: 2.6rem;
      font-weight: 700;
      color: hsl(var(--dark-grayish-blue));
    }
  }
`

export default FloatingCart