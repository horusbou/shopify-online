import { Link } from "react-router-dom"
import styled from "styled-components"


const ProductCard = ({
  id,
  companyName = "N/A",
  name= "N/A",
  description= "No description available.",
  price=0,
  isOnSale = false,
  salePercent=0,
  image
}: Props) => {
  return (
    <CardWrapper>
      <img src={"http://localhost:3000"+image} alt={name} className="product-image" />
      <div className="inner-info">
        <h2 className="company-name">{companyName}</h2>
        <p className="product-name">{name}</p>
        <p className="product-description">{description}</p>
        <div className="pricing">
          <p className="price">
            $
            {isOnSale
              ? (price * salePercent).toFixed(2)
              : price.toFixed(2)}
          </p>
          {isOnSale && (
            <p className="percent">{+salePercent.toFixed(2) * 100 + "%"}</p>
          )}
          {isOnSale && (
            <p className="original-price">${price.toFixed(2)}</p>
          )}
        </div>
      </div>

        <Link className="to-product-btn" to={"/products/"+id}>
          To Product
        </Link>
    </CardWrapper>
  )
}

const CardWrapper = styled.section`
  background-color: white;
  border-radius: 0.8rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding: 1.6rem;
  width: 100%;
  max-width: 30rem;
  margin: 1.6rem;

  @media screen and (min-width: 600px) {
    width: 24rem;
  }

  .product-image {
    width: 100%;
    height: auto;
    border-radius: 0.8rem;
    object-fit: cover;
    margin-bottom: 1.6rem;
  }

  .inner-info {
    margin-bottom: 1.6rem;

    .company-name {
      font-size: 1.2rem;
      color: hsl(var(--orange));
      margin-bottom: 1rem;
    }

    .product-name {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 1.2rem;
    }

    .product-description {
      font-size: 1.4rem;
      color: hsl(var(--dark-grayish-blue));
      line-height: 2.4rem;
      margin-bottom: 2.4rem;
    }

    .pricing {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .price {
        font-size: 2.4rem;
        font-weight: 700;
      }

      .percent {
        color: hsl(var(--orange));
        background-color: hsl(var(--pale-orange));
        font-size: 1.4rem;
        font-weight: 700;
        padding: 0.5rem 0.7rem;
        border-radius: 0.4rem;
      }

      .original-price {
        text-decoration: line-through;
        font-size: 1.4rem;
        font-weight: 700;
        color: hsl(var(--grayish-blue));
      }
    }
  }

  .to-product-btn {
    display: inline-block;
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
    text-decoration: none;  /* Remove underline */

    &:hover,
    &:focus {
      background-color: hsl(var(--dark-orange));
      color: hsl(var(--orange));
      border: solid 1px hsl(var(--orange));
    }

    &:active {
      background-color: hsl(var(--dark-orange));
      color: hsl(var(--orange));
      border: solid 1px hsl(var(--orange));
    }
  }
`


interface Props {
  companyName: string,
  id: string,
  name: string,
  description: string,
  price: number,
  isOnSale: boolean,
  salePercent: number,
  image:string
}




export default ProductCard
