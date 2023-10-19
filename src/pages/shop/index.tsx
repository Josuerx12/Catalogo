import { ProductCommands } from "../../context/productsContext";
import Products from "../../components/products";
import { Product } from "../../interfaces/product/productInterface";
const Shop = () => {
  const { products, errors, loading } = ProductCommands();
  return (
    <div>
      {products?.map((item: Product) => (
        <Products key={item._id} product={item} />
      ))}
    </div>
  );
};

export default Shop;
