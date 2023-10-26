import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Product } from "../../../../interfaces/product/ProductInterface";
import { useState } from "react";
import { SiGoogletagmanager } from "react-icons/si";
import AdminCreateProductModal from "../adminCreateProductModal";
import AdminEditProductModal from "../editProductModal";
import AdminDeleteProductModal from "../deleteProductModal";

const ProductInfos = ({ product }: { product: Product }) => {
  const createdAt = new Date(product.createdAt).toLocaleString("pt-BR");
  const updatedAt = new Date(product.updatedAt).toLocaleString("pt-BR");
  const price = product.value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [showDeleteProductModal, setShowDeleteProductModal] = useState(false);
  return (
    <>
      <AdminEditProductModal
        show={showEditProductModal}
        handleShow={() => setShowEditProductModal((prev) => !prev)}
        product={product}
      />
      <AdminDeleteProductModal
        show={showDeleteProductModal}
        handleShow={() => setShowDeleteProductModal((prev) => !prev)}
        product={product}
      />
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
            variant="dark"
            title={
              <span style={{ fontSize: "1.1rem" }}>
                Gerenciar <SiGoogletagmanager />
              </span>
            }
            size="sm"
          >
            <Dropdown.Item
              onClick={() => setShowEditProductModal((prev) => !prev)}
            >
              Editar
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => setShowDeleteProductModal((prev) => !prev)}
            >
              Excluir
            </Dropdown.Item>
          </DropdownButton>
        </td>
      </tr>
    </>
  );
};

export default ProductInfos;
