import ProductCard from "../components/ProductCard"
import { useGlobalContext } from "../context/context"
  
  const ProductList = () => {
    const {state} = useGlobalContext()

    return (
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {state.products.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    )
  }

export default ProductList