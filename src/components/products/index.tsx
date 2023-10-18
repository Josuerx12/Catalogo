import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Product } from "../../interfaces/product/productInterface";
const Products = (product: Product) => {
  const { _id, name, category, photos, unit, stock, value } = product;
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={`https://user-and-stores-pics.s3.us-east-2.amazonaws.com/${photos[0].photo}`}
      />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>Cod.: {_id}</Card.Text>
        <Card.Subtitle>{category}</Card.Subtitle>
        <Card.Text>
          Quantidade:
          <select name="units">
            {Array.from(Array(stock), (_, i) => (
              <option value={i + 1} key={i}>
                {i + 1} {unit}
              </option>
            ))}
          </select>
        </Card.Text>
        <Card.Text>
          {value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
};

export default Products;
