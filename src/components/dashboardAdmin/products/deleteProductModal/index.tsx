import { Product } from "../../../../interfaces/product/productInterface";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Admin } from "../../../../context/adminContext";

type props = {
  show: boolean;
  handleShow: () => void;
  product: Product;
};

const AdminDeleteProductModal = ({ show, handleShow, product }: props) => {
  const { deleteProduct, productRequesting } = Admin();

  const handleDeleteProduct = async () => {
    await deleteProduct(product._id);
  };
  return (
    <Modal show={show} onHide={handleShow} size="xl" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Deletar Produto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Tem certeza que deseja deletar o produto?</p>
        <p>
          nome: <b>{product.name}</b>
        </p>
        <p>
          ID: <b> {product._id}</b>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="danger"
          disabled={productRequesting ? true : false}
          onClick={handleShow}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleDeleteProduct}
          disabled={productRequesting ? true : false}
          className={productRequesting ? "btn btn-warning" : "btn btn-success"}
        >
          {productRequesting ? "Deletando Produto" : "Deletar Produto"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AdminDeleteProductModal;
