/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Product } from "../../interfaces/product/productInterface";
import { Auth } from "../../context/authContext";
import { useCartStore } from "../../store/cartStore";
const Products = ({ product }: { product: Product }) => {
  const { _id, category, name, photos, unit, stock } = product;
  const [quantity, setQuantity] = useState<number>(1);
  const { addCart } = useCartStore();
  const { user } = Auth();
  const [loadingImage, setLoadingImage] = useState(true);
  return (
    <Card
      style={{
        flexBasis: "300px",
      }}
    >
      {loadingImage && (
        <div
          className="top-0 start-0 w-100 bg-secondary animate__animated animate__flash"
          style={{ opacity: 0.7, aspectRatio: "1" }}
        ></div>
      )}
      <Card.Img
        style={
          loadingImage
            ? { display: "none" }
            : {
                width: "100%",
                aspectRatio: "1",
                objectFit: "cover",
              }
        }
        variant="top"
        onLoad={() => setLoadingImage((prev) => !prev)}
        src={
          photos.length > 0
            ? `https://catalogo-product-pic.s3.us-east-2.amazonaws.com/${photos[0].photo}`
            : "/no-profile.jpg"
        }
      />
      <Card.Body>
        <Card.Title className="text-center">{name}</Card.Title>
        <Card.Text className="text-center">
          Categoria: <b>{category}</b>
        </Card.Text>
        <Card.Text className="d-flex gap-2 justify-content-center">
          <b>Produtos disponíveis:</b>
          <select
            disabled={user ? false : true}
            onChange={(e: any) => setQuantity(parseInt(e.target.value))}
            name="units"
          >
            {Array.from(Array(stock), (_, i) => (
              <option value={i + 1} key={i}>
                {i + 1} {unit}
              </option>
            ))}
          </select>
        </Card.Text>
        {/* {value && (
          <Card.Text
            style={{
              fontSize: "1.4rem",
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            {value.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </Card.Text>
        )} */}
        <div className="d-grid gap-2">
          <Link to={`/produto/${_id}`} className="btn btn-primary">
            Detalhes do produto
          </Link>
          {user ? (
            <Button
              variant="success"
              onClick={() => addCart(product, quantity)}
            >
              Adicionar ao carrinho
            </Button>
          ) : (
            false
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Products;
