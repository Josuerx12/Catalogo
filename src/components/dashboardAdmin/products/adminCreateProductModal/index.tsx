import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useRef } from "react";
import { useAdminProducts } from "../../../../hooks/useAdminProducts/useAdminProducts";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

type props = {
  show: boolean;
  handleShow: () => void;
};

const avaiableUnits = ["UN", "KG", "TON", "M"];

const AdminCreateProductModal = ({ show, handleShow }: props) => {
  const { addProduct } = useAdminProducts();

  const query = useQueryClient();

  const formRef = useRef<HTMLFormElement | null>(null);

  const { mutateAsync, isLoading } = useMutation(
    ["createNewProduct"],
    addProduct,
    {
      onSuccess: () =>
        Promise.all([
          toast.success("Novo produto cadastrado com sucesso!"),
          handleShow(),
          query.invalidateQueries("products"),
        ]),
      onError: () => {
        toast.error("Erro ao criar novo produto, contacte o administrador!");
      },
    }
  );

  const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const credentials = new FormData(e.currentTarget);

    await mutateAsync(credentials);
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
              type="text"
              required
              placeholder="Adicione uma categoria para o novo produto."
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Quantidade:</Form.Label>
            <Form.Control
              name="stock"
              type="string"
              pattern="^[1-9]\d*$"
              required
              placeholder="Quatidade de produto em estoque"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Unidade de Medida do Produto:</Form.Label>
            <Form.Select required name="unit">
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
              placeholder="Preço do produto"
              name="value"
            />
          </Form.Group>
          <Form.Group className="mb-3 d-flex flex-column">
            <Form.Label>Descrição do Produto:</Form.Label>
            <Form.Control
              name="description"
              as="textarea"
              rows={4}
              aria-label="With textarea"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Selecione as Fotos do Produto:</Form.Label>
            <Form.Control
              name="product-pics"
              type="file"
              multiple={true}
              accept="image/*"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {isLoading ? (
          <Button variant="danger" disabled onClick={handleShow}>
            Cancelar
          </Button>
        ) : (
          <Button variant="danger" onClick={handleShow}>
            Cancelar
          </Button>
        )}
        {isLoading ? (
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
