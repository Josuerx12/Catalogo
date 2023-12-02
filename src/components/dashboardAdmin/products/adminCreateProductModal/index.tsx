import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Admin } from "../../../../context/adminContext";
import { useState, useRef } from "react";

type props = {
  show: boolean;
  handleShow: () => void;
};

const avaiableUnits = ["UN", "KG", "TON", "M"];

const AdminCreateProductModal = ({ show, handleShow }: props) => {
  const [images, setImages] = useState<FileList | null>(null);
  const [newProductCredentials, setNewProductCredentials] = useState({
    name: null,
    category: null,
    stock: null,
    unit: null,
    value: null,
    description: null,
  });
  const { addProduct, productRequesting } = Admin();

  const formRef = useRef<HTMLFormElement | null>(null);

  const formData = new FormData();

  if (newProductCredentials.name)
    formData.append("name", newProductCredentials.name);
  if (newProductCredentials.category)
    formData.append("category", newProductCredentials.category);
  if (newProductCredentials.stock)
    formData.append("stock", parseInt(newProductCredentials.stock).toString());
  if (newProductCredentials.unit)
    formData.append("unit", newProductCredentials.unit);
  if (newProductCredentials.value)
    formData.append(
      "value",
      parseFloat(newProductCredentials.value).toString()
    );
  if (newProductCredentials.description)
    formData.append("description", newProductCredentials.description);
  if (images) {
    for (let i = 0; i < images.length; i++) {
      formData.append("product-pics", images[i]);
    }
  }

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    await addProduct(formData);
    handleShow();
  };

  return (
    <Modal show={show} onHide={handleShow} size="xl" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Adicionar Novo Produto:</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form ref={formRef} onSubmit={handleAddProduct}>
          <Form.Group className="mb-3">
            <Form.Label>Nome do Produto:</Form.Label>
            <Form.Control
              name="name"
              minLength={10}
              onChange={(e) =>
                setNewProductCredentials((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              type="text"
              required
              placeholder="Adicione um nome para o novo produto."
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Categoria do produto:</Form.Label>
            <Form.Control
              minLength={5}
              name="category"
              onChange={(e) =>
                setNewProductCredentials((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              type="text"
              required
              placeholder="Adicione uma categoria para o novo produto."
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Quantidade:</Form.Label>
            <Form.Control
              name="stock"
              onChange={(e) =>
                setNewProductCredentials((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              type="string"
              pattern="^[1-9]\d*$"
              required
              placeholder="Quatidade de produto em estoque"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Unidade de Medida do Produto:</Form.Label>
            <Form.Select
              required
              name="unit"
              onChange={(e) =>
                setNewProductCredentials((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            >
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
              type="string"
              pattern="^[1-9]\d*(\.\d+)?$"
              step="any"
              onChange={(e) =>
                setNewProductCredentials((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              required
              placeholder="Preço do produto"
              name="value"
            />
          </Form.Group>
          <Form.Group className="mb-3 d-flex flex-column">
            <Form.Label>Descrição do Produto:</Form.Label>
            <Form.Control
              onChange={(e) =>
                setNewProductCredentials((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              name="description"
              as="textarea"
              rows={4}
              aria-label="With textarea"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Selecione as Fotos do Produto:</Form.Label>
            <Form.Control
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setImages(e.target.files)
              }
              type="file"
              multiple={true}
              accept="image/*"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {productRequesting ? (
          <Button variant="danger" disabled onClick={handleShow}>
            Cancelar
          </Button>
        ) : (
          <Button variant="danger" onClick={handleShow}>
            Cancelar
          </Button>
        )}
        {productRequesting ? (
          <Button variant="warning" disabled>
            Criando Produto
          </Button>
        ) : (
          <Button
            variant="success"
            onClick={() => formRef.current?.requestSubmit()}
          >
            Criar Produto
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default AdminCreateProductModal;
