import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

type props = {
  show: boolean;
  handleShow: () => void;
};

const ChangePasswordModal = ({ show, handleShow }: props) => {
  return (
    <Modal show={show} onHide={handleShow} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Alterar senha do usuário</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleShow}>
          Close
        </Button>
        <Button variant="primary" onClick={handleShow}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangePasswordModal;
