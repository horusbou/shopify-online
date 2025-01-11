import styled from "styled-components"
import ImageCarousel from "../components/ImageCarousel"
import ProductInfo from "../components/ProductInfo"
import { productImages, productThumbnails } from "../assets"
import { useParams } from "react-router-dom"
import { getProduct } from "../utils/api"
import { useEffect, useState } from "react"
import { Product as ProductType  } from "../types"

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const [data,setData] = useState<ProductType>()
  useEffect(()=>{
    const getProductDetails = async ()=>{
      const data = await getProduct<ProductType>(id as string)
      setData(data)
    }
    getProductDetails()
  },[id])
  return (
    <ProductWrapper>
      <ImageCarousel
        productImages={Array(data?.image).map((img,idx)=>({url:"http://localhost:3000"+img,alt:idx}))}
        productThumbnails={Array(data?.image).map((img,idx)=>({url:"http://localhost:3000"+img,alt:idx}))}
      />
      <ProductInfo {...data} />
    </ProductWrapper>
  )
}

const ProductWrapper = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media only screen and (min-width: 768px) {
    margin-top: 5rem;
  }

  @media only screen and (min-width: 1000px) {
    margin-top: 9rem;
    gap: 5rem;
    display: grid;
    grid-template-columns: 44.5rem 44.5rem;
  }

  @media only screen and (min-width: 1200px) {
    gap: 11rem;
  }
`

export default Product