import { ProductCommands } from "../../context/productsContext";
import Products from "../../components/products";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Product } from "../../interfaces/product/productInterface";
const Shop = () => {
  const { products } = ProductCommands();
  return (
    <div>
      <h3 className="text-center mb-4 mt-3">
        Itens disponíveis - Catálogo J.C
      </h3>
      <Container>
        <Row>
          {Array.isArray(products) &&
            products?.map((item: Product) => (
              <Products key={item._id} product={item} />
            ))}
          {!products && <p>Nenhum produto cadastrado.</p>}
        </Row>
      </Container>
    </div>
  );
};

export default Shop;
