import { Product } from "../../../../interfaces/product/ProductInterface";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

type props = {
  show: boolean;
  handleShow: () => void;
  product: Product;
};
const AdminDeleteProductModal = ({ show, handleShow, product }: props) => {
  return (
    <Modal show={show} onHide={handleShow} backdrop="static">
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
        <Button variant="danger" onClick={handleShow}>
          Fechar
        </Button>
        <Button variant="success">Deletar Produto</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AdminDeleteProductModal;
