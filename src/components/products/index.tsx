import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { Product } from "../../interfaces/product/ProductInterface";
const Products = ({ product }: { product: Product }) => {
  const { _id, name, photos, unit, stock, value } = product;
  return (
    <Col>
      <Card className="mb-3" style={{ margin: "auto", width: "18rem" }}>
        <Card.Img
          variant="top"
          src={`https://productphotoscatalogo.s3.us-east-2.amazonaws.com/${photos[0].photo}`}
        />
        <Card.Body>
          <Card.Title className="text-center">{name}</Card.Title>
          <Card.Text>Cod.: {_id}</Card.Text>
          <Card.Text className="d-flex gap-2 justify-content-center">
            <b>Produtos disponíveis:</b>
            <select name="units">
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
            <Button variant="primary">Detalhes do produto</Button>
            <Button variant="success">Adicionar ao carrinho</Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Products;
