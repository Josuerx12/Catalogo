import { useParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import { ProductCommands } from "../../context/productsContext";
import { Product } from "../../interfaces/product/productInterface";
import { useState } from "react";
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

  console.log(produto);
  return (
    <div>
      <h3 className="m-3 text-center">Detalhes do Produto</h3>

      <div className="border w-75 mb-4 mx-auto p-3 rounded">
        <h4 className="text-center p-3 text-secondary">{produto?.name}</h4>
        <CarouselProductImages image={produto?.photos} />

        <Form
          className="d-flex flex-column mx-auto p-2 m-3 rounded align-items-center border"
          style={{ width: "30rem" }}
        >
          <h5 className="m-2" style={{ fontSize: "1.5rem" }}>
            Categoria: <span className="text-black">{produto?.category}</span>
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
          <h3 style={{ fontSize: "2.2rem" }} className="m-2">
            Valor:{" "}
            <span className="text-success">
              {produto &&
                (produto.value * quantity).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
            </span>
          </h3>
          <button type="button" className="btn btn-primary m-3 btn-lg">
            Adicionar ao Carrinho
          </button>
        </Form>
      </div>
    </div>
  );
};

export default ProductDetails;
