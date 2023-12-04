import { ProductCommands } from "../../context/productsContext";
import Products from "../../components/products";
import { Product } from "../../interfaces/product/productInterface";
import { Pagination } from "react-bootstrap";
import { useState } from "react";
import { usePagination } from "../../hooks/usePagination/usePagination";
const Shop = () => {
  const { products } = ProductCommands();
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
  return (
    <div className="d-flex flex-column gap-3 justify-content-center align-items-center">
      <h1 className="text-center mb-4">Catálogo J.C</h1>
      <section
        className="d-flex mx-auto gap-4 justify-content-center"
        style={{ flexFlow: "row wrap", width: "90%" }}
      >
        {Array.isArray(items) &&
          items.map((item) => (
            <Products key={item._id} product={item as Product} />
          ))}
        {!items && <p>Nenhum produto cadastrado.</p>}
      </section>
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
    </div>
  );
};

export default Shop;
