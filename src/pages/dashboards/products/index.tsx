import Table from "react-bootstrap/Table";
import { ProductCommands } from "../../../context/productsContext";
import ProductInfos from "../../../components/dashboardAdmin/products/productInfo";
import Button from "react-bootstrap/Button";
import { LuPackagePlus } from "react-icons/lu";
import { FaFilter } from "react-icons/fa";
import { useState } from "react";
import AdminCreateProductModal from "../../../components/dashboardAdmin/products/adminCreateProductModal";
import Pagination from "react-bootstrap/Pagination";
import { usePagination } from "../../../hooks/usePagination/usePagination";

const ProductsDashboard = () => {
  const { products } = ProductCommands();
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  const { actualPage, total, totalPages, items, nextPage, prevPage } =
    usePagination({ items: products, perPage: 5, page: 2 });

  console.log(actualPage, total, totalPages, items);
  return (
    <div className="productsDashboard">
      <AdminCreateProductModal
        show={showAddProductModal}
        handleShow={() => setShowAddProductModal((prev) => !prev)}
      />
      <h3 className="text-center mt-4 mb-3">Dashboard de produtos </h3>
      <div
        className="d-flex pt-2 pb-2 justify-content-end gap-2"
        style={{ width: "90%", margin: "auto" }}
      >
        <Button variant="primary">
          Filtrar Produtos <FaFilter style={{ color: "#fafafa" }} />
        </Button>
        <Button
          variant="success"
          onClick={() => setShowAddProductModal((prev) => !prev)}
        >
          <span>Adicionar Novo Produto </span>
          <LuPackagePlus style={{ fontSize: "1.3rem", textAlign: "center" }} />
        </Button>
      </div>

      {Array.isArray(products) && products?.length > 0 ? (
        <Table striped bordered hover style={{ width: "90%", margin: "auto" }}>
          <thead>
            <tr>
              <th className="text-center text-capitalize">id</th>
              <th className="text-center text-capitalize">nome do produto</th>
              <th className="text-center text-capitalize">categoria</th>
              <th className="text-center text-capitalize">estoque</th>
              <th className="text-center text-capitalize">valor</th>
              <th className="text-center text-capitalize">adicionado dia</th>
              <th className="text-center text-capitalize">atualizado dia</th>
              <th className="text-center text-capitalize">Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <ProductInfos key={product._id} product={product} />
            ))}
          </tbody>
        </Table>
      ) : (
        <div>
          <p className="text-center" style={{ fontSize: "1.2rem" }}>
            Nenhum produto encontrado.{" "}
          </p>
          <p className="text-center" style={{ fontSize: "1.2rem" }}>
            Para adicionar um novo produto
            <span
              className="link-primary"
              style={{ cursor: "pointer" }}
              onClick={() => setShowAddProductModal((prev) => !prev)}
            >
              Clique aqui
            </span>
          </p>
        </div>
      )}
      <Pagination>
        <Pagination.Item></Pagination.Item>
      </Pagination>
    </div>
  );
};

export default ProductsDashboard;
