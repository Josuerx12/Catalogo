import Table from "react-bootstrap/Table";
import { ProductCommands } from "../../../context/productsContext";
import ProductInfos from "../../../components/dashboard/productInfo";
import Button from "react-bootstrap/Button";

const ProductsDashboard = () => {
  const { products } = ProductCommands();
  return (
    <div className="productsDashboard">
      <h3 className="text-center mt-4 mb-3">Dashboard de produtos </h3>
      <div
        className="d-flex pt-2 pb-2 justify-content-end"
        style={{ width: "90%", margin: "auto" }}
      >
        <Button variant="primary">Adicionar Produto</Button>
      </div>
      <Table striped bordered hover style={{ width: "90%", margin: "auto" }}>
        <thead>
          <tr>
            <th className="text-center text-uppercase">id</th>
            <th className="text-center text-uppercase">nome do produto</th>
            <th className="text-center text-uppercase">categoria</th>
            <th className="text-center text-uppercase">estoque</th>
            <th className="text-center text-uppercase">valor</th>
            <th className="text-center text-uppercase">adicionado dia</th>
            <th className="text-center text-uppercase">atualizado dia</th>
            <th className="text-center text-uppercase">Ações</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(products) &&
            products.map((product) => (
              <ProductInfos key={product._id} product={product} />
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProductsDashboard;
