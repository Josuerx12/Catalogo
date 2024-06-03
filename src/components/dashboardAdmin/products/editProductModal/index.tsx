import { Product } from "../../../../interfaces/product/productInterface";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Admin } from "../../../../context/adminContext";
import { ChangeEvent, useRef, useState } from "react";

type props = {
  show: boolean;
  handleShow: () => void;
  product: Product;
};
const avaiableUnits = ["UN", "KG", "TON", "M"];
const AdminEditProductModal = ({ show, handleShow, product }: props) => {
  const [productCredentials, setProductCredentials] = useState({
    name: null,
    category: null,
    stock: null,
    unit: null,
    value: null,
    description: null,
  });
  const [images, setImages] = useState<FileList | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const { editProduct, deleteImageProduct, productRequesting } = Admin();

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    if (productCredentials.name)
      formData.append("name", productCredentials.name);
    if (productCredentials.category)
      formData.append("category", productCredentials.category);
    if (productCredentials.stock)
      formData.append("stock", productCredentials.stock);
    if (productCredentials.unit)
      formData.append("unit", productCredentials.unit);
    if (productCredentials.value)
      formData.append("value", productCredentials.value);
    if (productCredentials.description)
      formData.append("description", productCredentials.description);
    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append("product-pics", images[i]);
      }
    }

    await editProduct(product._id, formData);
    handleShow();
  };

  return (
    <Modal show={show} onHide={handleShow} size="xl" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Editando produto Id: {product._id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleEditSubmit} ref={formRef}>
          <h5 className="text-center">Fotos do Produto</h5>
          <div className="d-flex gap-4 justify-content-start align-items-center border p-3 mb-4 flex-nowrap overflow-auto">
            {product.photos.length > 0 ? (
              product.photos.map((photo) => (
                <div
                  className="d-flex flex-column gap-3 border p-3 rounded"
                  key={photo._id}
                >
                  <img
                    className="rounded shadow bg-body"
                    style={{
                      width: "12rem",
                      height: "12rem",
                    }}
                    src={`https://catalogo-product-pic.s3.us-east-2.amazonaws.com/${photo.photo}`}
                    alt={photo.photo}
                  />
                  <Button
                    onClick={() => deleteImageProduct(product._id, photo._id)}
                    variant={productRequesting ? "danger" : "outline-danger"}
                    disabled={productRequesting ? true : false}
                    size="sm"
                  >
                    Deletar Foto
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-danger">Produto sem foto</p>
            )}
          </div>
          <Form.Group className="mb-3">
            <Form.Label>Adicione novas fotos ao seu produto:</Form.Label>
            <Form.Control
              type="file"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setImages(e.target.files)
              }
              multiple={true}
              accept="image/*"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nome do Produto:</Form.Label>
            <Form.Control
              defaultValue={product.name}
              name="name"
              onChange={(e) =>
                setProductCredentials((prev) => ({
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
              name="category"
              onChange={(e) =>
                setProductCredentials((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              type="text"
              defaultValue={product.category}
              required
              placeholder="Adicione uma categoria para o novo produto."
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Quantidade:</Form.Label>
            <Form.Control
              name="stock"
              onChange={(e) =>
                setProductCredentials((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              type="string"
              required
              pattern="^[1-9]\d*$"
              defaultValue={product.stock}
              placeholder="Quatidade de produto em estoque"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Unidade de Medida do Produto:</Form.Label>
            <Form.Select
              required
              name="unit"
              onChange={(e) =>
                setProductCredentials((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              defaultValue={product.unit}
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
              pattern="^[1-9]\d*(\.\d+)?$"
              type="string"
              onChange={(e) =>
                setProductCredentials((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              name="value"
              required
              placeholder="Preço do produto"
              defaultValue={product.value}
            />
          </Form.Group>
          <Form.Group className="mb-3 d-flex flex-column">
            <Form.Label>Descrição do Produto:</Form.Label>
            <Form.Control
              name="description"
              onChange={(e) =>
                setProductCredentials((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              as="textarea"
              defaultValue={product.description}
              rows={4}
              aria-label="With textarea"
            />
          </Form.Group>
        </Form>
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
          onClick={() => formRef.current?.requestSubmit()}
          disabled={productRequesting ? true : false}
          className={productRequesting ? "btn btn-warning" : "btn btn-success"}
        >
          {productRequesting ? "Editando Produto" : "Editar Produto"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AdminEditProductModal;
