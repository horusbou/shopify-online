import { Delete } from "../icons"
import { useGlobalContext } from "../context/context"
import styled from "styled-components"

const SingleCartItem = ({
  id,
  name,
  price,
  isOnSale,
  salePercent,
  amount,
  images,
}:Props) => {
  const { removeItem } = useGlobalContext()

  const actualPrice = isOnSale
    ? (price * salePercent).toFixed(2)
    : price.toFixed(2)

  const totalPrice = (+actualPrice * amount).toFixed(2)

  return (
    <SingleItemWrapper>
      <img src={images[0]} alt={images[0]} />
      <div className="item-info">
        <p className="name">{name}</p>
        <p className="total">
          ${actualPrice}
          &nbsp;x&nbsp;{amount}&nbsp;
          <span>${totalPrice}</span>
        </p>
      </div>
      <button onClick={() => removeItem(id)}>
        <Delete />
      </button>
    </SingleItemWrapper>
  )
}

const SingleItemWrapper = styled.li`
  display: flex;
  align-items: center;
  gap: 1.6rem;

  img {
    border-radius: 0.4rem;
    width: 5rem;
    height: 5rem;
  }

  .item-info {
    gap: 1.6rem;
    .name {
      font-size: 1.6rem;
      color: hsl(var(--dark-grayish-blue));
      margin-bottom: 0.4rem;
    }
    .total {
      font-size: 1.6rem;

      span {
        margin-left: 0.5rem;
        font-weight: 700;
      }
    }
  }
`

interface Props {
  id: string,
  name: string,
  price: number,
  salePercent:number,
  amount: number,
  isOnSale: boolean,
  images: string[],
}

SingleCartItem.defaultProps = {
  productPrice: 0,
  amount: 0,
  isOnSale: false,
  images: [],
}

export default SingleCartItem