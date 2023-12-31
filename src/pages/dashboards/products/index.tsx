/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Product } from "../../../interfaces/product/productInterface";
import AdminProductFilter from "../../../components/dashboardAdmin/filters/adminProductFilter";

const ProductsDashboard = () => {
  const { products } = ProductCommands();
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    id: "",
    name: "",
    category: "",
    description: "",
  });
  const [page, setPage] = useState(1);

  const { actualPage, total, totalPages, items } = usePagination({
    items: products,
    perPage: 10,
    page: page,
  });

  function nextPage() {
    if (totalPages > page) {
      setPage((prev) => prev + 1);
    }
  }

  function prevPage() {
    if (page - 1 > 0) {
      setPage((prev) => prev - 1);
    }
  }

  const filteredProducts: Product[] | undefined =
    items?.filter((item): item is Product => {
      if (
        item &&
        "_id" in item &&
        "name" in item &&
        "category" in item &&
        "description" in item
      ) {
        return (
          item._id.toLowerCase().includes(filters.id) &&
          item.name.toLowerCase().includes(filters.name.toLowerCase()) &&
          item.category
            .toLowerCase()
            .includes(filters.category.toLowerCase()) &&
          item.description
            .toLowerCase()
            .includes(filters.description.toLowerCase())
        );
      }
      return false;
    }) ?? undefined;
  return (
    <section
      className="d-flex flex-column justify-content-between"
      style={{ flex: "1" }}
    >
      <div className="d-flex flex-column  gap-3">
        <AdminCreateProductModal
          show={showAddProductModal}
          handleShow={() => setShowAddProductModal((prev) => !prev)}
        />
        <AdminProductFilter
          show={showFilters}
          handleShow={() => setShowFilters((prev) => !prev)}
          setFilter={setFilters}
          products={items as Product[]}
        />
        <h3 className="text-center ">Dashboard de produtos </h3>
        <div
          className="d-flex justify-content-end gap-2"
          style={{ width: "90%", margin: "auto" }}
        >
          <Button
            variant="primary"
            onClick={() => setShowFilters((prev) => !prev)}
          >
            Filtrar Produtos <FaFilter style={{ color: "#fafafa" }} />
          </Button>
          <Button
            variant="success"
            onClick={() => setShowAddProductModal((prev) => !prev)}
          >
            <span>Adicionar Novo Produto </span>
            <LuPackagePlus
              style={{ fontSize: "1.3rem", textAlign: "center" }}
            />
          </Button>
        </div>

        {Array.isArray(products) && products?.length > 0 ? (
          <Table
            striped
            bordered
            hover
            style={{ width: "90%", margin: "auto" }}
          >
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
              {filteredProducts?.map((product) => (
                <ProductInfos key={product._id} product={product as Product} />
              ))}
              :
            </tbody>
          </Table>
        ) : (
          <div>
            <p className="text-center" style={{ fontSize: "1.2rem" }}>
              Nenhum produto encontrado.
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
        {filteredProducts?.length === 0 && (
          <p className="text-center">
            Nenhum produto encontrado com base nos filtros...
          </p>
        )}
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <Pagination>
          <Pagination.Prev onClick={prevPage} />
          {Array.from(Array(totalPages)).map((_, i) => (
            <Pagination.Item
              key={i + 1}
              active={page === i + 1 ? true : false}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={nextPage} />
        </Pagination>
        <p>
          Mostrando {actualPage + 1} de{" "}
          {actualPage + 10 < total ? actualPage + 10 : total} total de {total}{" "}
          resultados.
        </p>
      </div>
    </section>
  );
};

export default ProductsDashboard;
