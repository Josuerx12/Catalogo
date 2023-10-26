import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

type props = {
  show: boolean;
  handleShow: () => void;
};

const avaiableUnits = ["UN", "KG", "TON", "M"];

const AdminCreateProductModal = ({ show, handleShow }: props) => {
  return (
    <Modal show={show} onHide={handleShow} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Adicionar Novo Produto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nome do Produto</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="Adicione um nome para o novo produto."
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Categoria do produto </Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="Adicione uma categoria para o novo produto."
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Quantidade </Form.Label>
            <Form.Control
              type="number"
              required
              placeholder="Quatidade de produto em estoque"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Unidade de Medida do Produto</Form.Label>
            <Form.Select required placeholder="Quatidade de produto em estoque">
              <option value="">Selecione uma medida</option>
              {avaiableUnits.map((option) => (
                <option value={option}>{option.toLowerCase()}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descrição do Produto</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="Descrição do produto"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleShow}>
          Close
        </Button>
        <Button variant="primary">Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AdminCreateProductModal;
