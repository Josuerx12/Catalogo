import { ProductCommands } from "../../context/productsContext";
import Products from "../../components/products";
import { Product } from "../../interfaces/product/productInterface";
const Shop = () => {
  const { products } = ProductCommands();
  return (
    <div>
      <h1 className="text-center mb-4 mt-3">Catálogo J.C</h1>
      <section
        className="d-flex mx-auto gap-4 justify-content-center"
        style={{ flexFlow: "row wrap", width: "90%" }}
      >
        {Array.isArray(products) &&
          products?.map((item: Product) => (
            <Products key={item._id} product={item} />
          ))}
        {!products && <p>Nenhum produto cadastrado.</p>}
      </section>
    </div>
  );
};

export default Shop;
