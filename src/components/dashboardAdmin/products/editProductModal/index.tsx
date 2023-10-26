import { Product } from "../../../../interfaces/product/ProductInterface";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

type props = {
  show: boolean;
  handleShow: () => void;
  product: Product;
};
const AdminEditProductModal = ({ show, handleShow, product }: props) => {
  return (
    <Modal show={show} onHide={handleShow} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleShow}>
          Close
        </Button>
        <Button variant="primary">Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AdminEditProductModal;
