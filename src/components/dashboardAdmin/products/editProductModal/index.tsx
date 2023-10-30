import { Product } from "../../../../interfaces/product/productInterface";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

type props = {
  show: boolean;
  handleShow: () => void;
  product: Product;
};
const avaiableUnits = ["UN", "KG", "TON", "M"];
const AdminEditProductModal = ({ show, handleShow, product }: props) => {
  return (
    <Modal show={show} onHide={handleShow} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Editando produto Id: {product._id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <h5 className="text-center">Fotos do Produto</h5>
          <div className="d-flex gap-4 justify-content-center align-items-center border p-3 mb-4 flex-nowrap overflow-visible">
            {product.photos
              ? product.photos.map((photo) => (
                  <div
                    className="d-flex flex-column gap-3 overflow-visible border p-3 rounded"
                    key={photo._id}
                  >
                    <img
                      className="rounded shadow bg-body"
                      style={{
                        width: "10rem",
                        height: "8rem",
                      }}
                      src={`https://productphotoscatalogo.s3.us-east-2.amazonaws.com/${photo.photo}`}
                      alt={photo.photo}
                    />
                    <Button variant="outline-danger" size="sm">
                      Deletar Foto
                    </Button>
                  </div>
                ))
              : ""}
          </div>
          <Form.Group className="mb-3">
            <Form.Label>Adicione novas fotos ao seu produto:</Form.Label>
            <Form.Control type="file" multiple={true} accept="image/*" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nome do Produto:</Form.Label>
            <Form.Control
              defaultValue={product.name}
              type="text"
              required
              placeholder="Adicione um nome para o novo produto."
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Categoria do produto:</Form.Label>
            <Form.Control
              type="text"
              defaultValue={product.category}
              required
              placeholder="Adicione uma categoria para o novo produto."
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Quantidade:</Form.Label>
            <Form.Control
              type="number"
              required
              defaultValue={product.stock}
              placeholder="Quatidade de produto em estoque"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Unidade de Medida do Produto:</Form.Label>
            <Form.Select required defaultValue={product.unit}>
              <option value="">Selecione uma medida</option>
              {avaiableUnits.map((option, index) => (
                <option key={index} value={option}>
                  {option.toLowerCase()}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Preço:</Form.Label>
            <Form.Control
              type="number"
              required
              placeholder="Preço do produto"
              defaultValue={product.value}
            />
          </Form.Group>
          <Form.Group className="mb-3 d-flex flex-column">
            <Form.Label>Descrição do Produto:</Form.Label>
            <Form.Control
              as="textarea"
              defaultValue={product.description}
              rows={4}
              aria-label="With textarea"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleShow}>
          Fechar
        </Button>
        <Button variant="success">Criar Produto</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AdminEditProductModal;
