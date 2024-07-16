/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from "react-bootstrap/Table";
import ProductInfos from "../../../components/dashboardAdmin/products/productInfo";
import Button from "react-bootstrap/Button";
import { LuPackagePlus } from "react-icons/lu";
import { FaFilter } from "react-icons/fa";
import { useEffect, useState } from "react";
import AdminCreateProductModal from "../../../components/dashboardAdmin/products/adminCreateProductModal";
import { Product } from "../../../interfaces/product/productInterface";

import { useFetchProducts } from "../../../hooks/useFetchProducts/useFetchProducts";
import { useQuery } from "react-query";
import AdminProductFilter from "../../../components/dashboardAdmin/filters/adminProductFilter";
import { useLocation, useSearchParams } from "react-router-dom";
import { Pagination } from "react-bootstrap";
import { L_ELLIPISIS, R_ELLIPISIS } from "../../../constants/ellipisis";
import { usePagination } from "../../../hooks/usePagination/usePagination";

const ProductsDashboard = () => {
  const location = useLocation();
  const [params, setParams] = useSearchParams(location.search);

  const searchByName = params.get("name");
  const actualPage = params.get("actualPage");

  const { getProducts } = useFetchProducts();
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const { isLoading, data, refetch } = useQuery(
    ["products"],
    async () =>
      await getProducts({
        limit: "20",
        name: searchByName ? searchByName : "",
        page: actualPage ? actualPage : "1",
      })
  );

  const { avaiablePages, currentPage } = usePagination({
    currentPage: data?.currentPage as number,
    totalPages: data?.totalPages as number,
  });

  useEffect(() => {
    refetch();
  }, [searchByName, actualPage]);

  if (isLoading) {
    return <p>Carregando....</p>;
  }

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

        {data && data.products?.length > 0 ? (
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
                <th className="text-center text-capitalize">adicionado dia</th>
                <th className="text-center text-capitalize">atualizado dia</th>
                <th className="text-center text-capitalize">Ações</th>
              </tr>
            </thead>
            <tbody>
              {data.products?.map((product) => (
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
      </div>

      <Pagination style={{ margin: "1rem auto" }}>
        {avaiablePages.map((page) => {
          if (page === L_ELLIPISIS || page === R_ELLIPISIS) {
            return <Pagination.Ellipsis />;
          }
          return (
            <Pagination.Item
              onClick={() => {
                setParams({
                  actualPage: String(page),
                  name: searchByName ? String(searchByName) : "",
                });
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              disabled={page === currentPage}
              active={Number(page) === Number(currentPage)}
            >
              {page}
            </Pagination.Item>
          );
        })}
      </Pagination>
    </section>
  );
};

export default ProductsDashboard;
