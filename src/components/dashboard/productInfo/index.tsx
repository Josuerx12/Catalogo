import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Product } from "../../../interfaces/product/ProductInterface";

const ProductInfos = ({ product }: { product: Product }) => {
  const createdAt = new Date(product.createdAt).toLocaleString("pt-BR");
  const updatedAt = new Date(product.updatedAt).toLocaleString("pt-BR");
  const price = product.value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return (
    <tr>
      <td className="text-center">{product._id}</td>
      <td className="text-center">{product.name}</td>
      <td className="text-center">{product.category}</td>
      <td className="text-center">
        <span style={{ fontWeight: "500" }}>{product.stock} </span>
        <span style={{ fontWeight: "700" }}>{product.unit}</span>
      </td>
      <td className="text-center">{price}</td>
      <td className="text-center">{createdAt}</td>
      <td className="text-center">{updatedAt}</td>
      <td className="text-center">
        <DropdownButton
          id="dropdown-basic"
          variant="success"
          title={<span style={{ fontSize: "1.1rem" }}>Gerenciar</span>}
          size="sm"
        >
          <Dropdown.Item>Editar</Dropdown.Item>
          <Dropdown.Item>Excluir</Dropdown.Item>
        </DropdownButton>
      </td>
    </tr>
  );
};

export default ProductInfos;
