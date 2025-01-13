import ProductCard from "../components/ProductCard";
import { useGlobalContext } from "../context/context";
import { useParams } from "react-router-dom";

const ProductList = () => {
  const { state } = useGlobalContext();
  const { cat_id } = useParams<{ cat_id: string }>();

  const filteredProducts = cat_id
    ? state.products.filter((product) =>
        product.categories?.some((category) => category.id === cat_id)
      )
    : state.products;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", justifyContent: "center" }}>
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))
      ) : (
        <p>No products found for this category.</p>
      )}
    </div>
  );
};

export default ProductList;
