import { Product } from "../../../../interfaces/product/ProductInterface";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Carousel from "react-bootstrap/Carousel";
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
          <Carousel data-bs-theme="dark" fade={true} slide={false} touch={true}>
            {product.photos
              ? product.photos.map((photo, index) => (
                  <Carousel.Item interval={6000}>
                    <img
                      style={{
                        width: "100%",
                        height: "14rem",
                        margin: "0 auto",
                      }}
                      src={`https://productphotoscatalogo.s3.us-east-2.amazonaws.com/${photo.photo}`}
                      alt={photo.photo}
                    />
                    <Carousel.Caption
                      style={{
                        background: "#ffffffe6",
                        width: "fit-content",
                        margin: "auto",
                        padding: "1rem",
                        borderRadius: ".425rem",
                      }}
                    >
                      <h4>Foto 0{index + 1}</h4>
                      <Button variant="danger">Deletar Foto</Button>
                    </Carousel.Caption>
                  </Carousel.Item>
                ))
              : ""}
          </Carousel>
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
              {avaiableUnits.map((option) => (
                <option value={option}>{option.toLowerCase()}</option>
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
