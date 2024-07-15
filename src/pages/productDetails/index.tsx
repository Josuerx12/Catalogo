import { Link, useParams } from "react-router-dom";
import { Form, Spinner } from "react-bootstrap";
import { useState } from "react";
import { RiArrowGoBackFill } from "react-icons/ri";
import { TiShoppingCart } from "react-icons/ti";
import CarouselProductImages from "../../components/productDetailCarousel";
import { Auth } from "../../context/authContext";
import { useCartStore } from "../../store/cartStore";
import { useQuery } from "react-query";
import { useFetchProducts } from "../../hooks/useFetchProducts/useFetchProducts";
const ProductDetails = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const { addCart } = useCartStore();
  const { id } = useParams();
  const { user } = Auth();

  const { getProduct } = useFetchProducts();

  const { data, isLoading } = useQuery(
    ["product" + id],
    async () => await getProduct(id as string)
  );

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  return (
    <div
      className="mx-auto w-100 mb-3"
      style={{ flex: "1", maxWidth: "1200px" }}
    >
      <h3 className="m-4 text-center">Detalhes do data</h3>

      <div
        className="d-flex flex-column gap-2 mx-auto"
        style={{ width: "90%" }}
      >
        <div className="d-flex gap-3 w-100 justify-content-end">
          <button
            onClick={() => {
              history.back();
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            type="button"
            className="btn btn-outline-primary d-flex align-items-center gap-2"
            style={{ width: "fit-content" }}
          >
            <RiArrowGoBackFill />
            Voltar para loja
          </button>
          {user ? (
            <Link
              className="btn btn-outline-success d-flex align-items-center gap-2"
              style={{ width: "fit-content" }}
              to="/carrinho"
            >
              <TiShoppingCart />
              Veja seu carrinho
            </Link>
          ) : (
            false
          )}
        </div>
        <div className="d-flex flex-row w-100 gap-4 flex-wrap align-items-center justify-content-around border p-3 mx-auto rounded">
          {data ? (
            <CarouselProductImages image={data?.photos} />
          ) : (
            <img
              className="rounded carrouselResponsive"
              src="/carregando-1.gif"
              alt="Carregando foto"
            />
          )}
          {data ? (
            <Form
              className="d-flex flex-column p-2 align-items-center rounded border"
              style={{ flex: "2", flexBasis: "400px" }}
            >
              <h2 className="text-center p-3 text-secondary">{data?.name}</h2>
              <div
                className="d-flex mx-auto flex-row justify-content-between flex-wrap gap-5"
                style={{ width: "90%" }}
              >
                <div className="mx-auto ">
                  <h5 className="ms-2" style={{ fontSize: "1.5rem" }}>
                    Categoria:{" "}
                    <span className="text-black ">{data?.category}</span>
                  </h5>
                  <div className="d-flex align-items-center gap-2 m-2">
                    <Form.Label style={{ fontSize: "1.2rem" }}>
                      datas disponiveis:
                    </Form.Label>
                    <Form.Select
                      disabled={user ? false : true}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                      style={{ width: "fit-content" }}
                    >
                      {Array.from(Array(data?.stock)).map((_, i) => (
                        <option key={i} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                  <h3 style={{ fontSize: "1.6rem" }} className="m-2">
                    Valor:{" "}
                    <span>
                      {data &&
                        (data.value * quantity).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                    </span>
                  </h3>
                </div>
                <div style={{ flex: "1", flexBasis: "200px" }}>
                  <Form.Control
                    as="textarea"
                    className="w-100 "
                    disabled
                    defaultValue={data?.description}
                  ></Form.Control>
                </div>
              </div>
              <button
                type="button"
                disabled={user ? false : true}
                style={{ width: "90%" }}
                onClick={() => addCart(data, quantity)}
                className={
                  user
                    ? "btn btn-primary m-3 btn-lg text-capitalize"
                    : "btn btn-warning m-3 btn-lg text-capitalize"
                }
              >
                {user
                  ? "Adicionar ao Carrinho"
                  : "faça login para montar seu carrinho"}
              </button>
            </Form>
          ) : (
            <div className="d-flex align-items-center justify-content-center">
              Carregando dados do data <Spinner animation="grow" />{" "}
              <Spinner animation="grow" /> <Spinner animation="grow" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
