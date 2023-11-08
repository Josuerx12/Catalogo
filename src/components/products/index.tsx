import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { Product } from "../../interfaces/product/productInterface";
import { Auth } from "../../context/authContext";
const Products = ({ product }: { product: Product }) => {
  const { _id, category, name, photos, unit, stock, value } = product;
  const { user } = Auth();
  return (
    <Col>
      <Card className="mb-3" style={{ margin: "auto", width: "20rem" }}>
        <Card.Img
          style={{ width: "100%", height: "20rem" }}
          variant="top"
          src={
            photos.length > 0
              ? `https://productphotoscatalogo.s3.us-east-2.amazonaws.com/${photos[0].photo}`
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
            <select disabled={user ? false : true} name="units">
              {Array.from(Array(stock), (_, i) => (
                <option value={i + 1} key={i}>
                  {i + 1} {unit}
                </option>
              ))}
            </select>
          </Card.Text>
          <Card.Text
            style={{
              fontSize: "1.6rem",
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            {value.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </Card.Text>
          <div className="d-grid gap-2">
            <Link to={`/produto/${_id}`} className="btn btn-primary">
              Detalhes do produto
            </Link>
            {user ? (
              <Button variant="success">Adicionar ao carrinho</Button>
            ) : (
              false
            )}
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Products;
