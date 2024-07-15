import Products from "../../components/products";
import { useQuery } from "react-query";
import { useFetchProducts } from "../../hooks/useFetchProducts/useFetchProducts";
import { useLocation, useSearchParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FormEvent, useEffect, useRef } from "react";
import { usePagination } from "../../hooks/usePagination/usePagination";
import { L_ELLIPISIS, R_ELLIPISIS } from "../../constants/ellipisis";
import { Pagination } from "react-bootstrap";
const Shop = () => {
  const { getProducts } = useFetchProducts();
  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams(location.search);

  const searchByName = searchParams.get("name");
  const actualPage = searchParams.get("actualPage");

  const formRef = useRef<HTMLFormElement | null>(null);

  function handleSubmitFilter(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    setSearchParams({ name: name as string });
  }

  const { data, isLoading, refetch } = useQuery(
    ["products"],
    async () =>
      await getProducts({
        limit: "20",
        name: searchByName,
        page: actualPage ? actualPage : "1",
      })
  );

  useEffect(() => {
    refetch();
  }, [searchByName, actualPage]);

  const { avaiablePages, currentPage } = usePagination({
    currentPage: data?.currentPage as number,
    totalPages: data?.totalPages as number,
  });

  return (
    <div
      className="d-flex flex-column gap-3 mb-3 align-items-center"
      style={{ flex: "1" }}
    >
      <h1 className="text-center mb-4">Catálogo J.C</h1>
      <form
        onSubmit={handleSubmitFilter}
        ref={formRef}
        style={{ width: "90%", display: "flex", justifyContent: "end" }}
      >
        <label
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            width: "300px",
          }}
        >
          <input
            placeholder="Pesquise pelo nome do produto..."
            name="name"
            style={{
              border: "none",
              outline: "none",
              background: "#ccc",
              display: "block",
              width: "100%",
              borderRadius: "10px",
              padding: ".25rem",
            }}
            defaultValue={searchByName ? searchByName : ""}
            type="text"
          />
          <FaSearch
            onClick={() => formRef.current?.requestSubmit()}
            style={{
              position: "absolute",
              top: "0",
              right: "10",
              zIndex: "10",
              cursor: "pointer",
              height: "100%",
              width: "5%",
              display: "flex",
              alignItems: "center",
            }}
            size={22}
          />
        </label>
      </form>
      <section
        className="d-flex mx-auto gap-4 justify-content-between"
        style={{ flexFlow: "row wrap", width: "90%" }}
      >
        {isLoading ? (
          <p>Carregando...</p>
        ) : data && data.products.length > 0 ? (
          data.products.map((item) => (
            <Products product={item} key={item._id} />
          ))
        ) : (
          <p>Nenhum produto cadastrado.</p>
        )}
      </section>

      <Pagination>
        {avaiablePages.map((page) => {
          if (page === L_ELLIPISIS || page === R_ELLIPISIS) {
            return <Pagination.Ellipsis />;
          }
          return (
            <Pagination.Item
              onClick={() => {
                setSearchParams({
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
    </div>
  );
};

export default Shop;
