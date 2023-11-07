import { useParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import { ProductCommands } from "../../context/productsContext";
import { Product } from "../../interfaces/product/productInterface";
import { useState } from "react";
import { RiArrowGoBackFill } from "react-icons/ri";
import { TiShoppingCart } from "react-icons/ti";
import CarouselProductImages from "../../components/productDetailCarousel";
const ProductDetails = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const { products } = ProductCommands();
  const { id } = useParams();
  const [produto] = useState<Product | undefined>(
    Array.isArray(products)
      ? products?.find((product) => product._id === id)
      : undefined
  );
  return (
    <div>
      <h3 className="m-4 text-center">Detalhes do Produto</h3>

      <div
        className="d-flex flex-column gap-2 mx-auto"
        style={{ width: "fit-content" }}
      >
        <div className="d-flex gap-3 w-100 justify-content-end">
          <button
            type="button"
            className="btn btn-outline-primary d-flex align-items-center gap-2"
            style={{ width: "fit-content" }}
          >
            <RiArrowGoBackFill />
            Voltar para loja
          </button>
          <button
            type="button"
            className="btn btn-outline-success d-flex align-items-center gap-2"
            style={{ width: "fit-content" }}
          >
            <TiShoppingCart />
            Veja seu carrinho
          </button>
        </div>
        <div className="d-flex flex-row flex-wrap align-items-center justify-content-center border p-3 mx-auto rounded">
          <CarouselProductImages image={produto?.photos} />
          <Form className="d-flex  flex-column p-2 m-3 rounded border">
            <h4 className="text-center p-3 text-secondary">{produto?.name}</h4>
            <div className="d-flex flex-row justify-content-center flex-wrap gap-3">
              <div>
                <h5 className="ms-2" style={{ fontSize: "1.5rem" }}>
                  Categoria:{" "}
                  <span className="text-black">{produto?.category}</span>
                </h5>
                <div className="d-flex align-items-center gap-2 m-2">
                  <Form.Label style={{ fontSize: "1.2rem" }}>
                    Produtos disponiveis:
                  </Form.Label>
                  <Form.Select
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    style={{ width: "fit-content" }}
                  >
                    {Array.from(Array(produto?.stock)).map((_, i) => (
                      <option value={i + 1}>{i + 1}</option>
                    ))}
                  </Form.Select>
                </div>
                <h3 style={{ fontSize: "1.6rem" }} className="m-2">
                  Valor:{" "}
                  <span>
                    {produto &&
                      (produto.value * quantity).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                  </span>
                </h3>
              </div>
              <div>
                <Form>
                  <Form.Control
                    as="textarea"
                    disabled
                    defaultValue={produto?.description}
                  ></Form.Control>
                </Form>
              </div>
            </div>
            <button type="button" className="btn btn-primary m-3 btn-lg">
              Adicionar ao Carrinho
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
