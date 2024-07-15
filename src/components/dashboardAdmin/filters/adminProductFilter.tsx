/* eslint-disable @typescript-eslint/no-explicit-any */
import Offcanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { FormEvent } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

type Props = {
  show: boolean;
  handleShow: () => void;
};

const AdminProductFilter = ({ show, handleShow }: Props) => {
  const location = useLocation();
  const [params, setParams] = useSearchParams(location.search);

  const searchByName = params.get("name");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setParams({ name: formData.get("name") as string });
    handleShow();
  };

  const cleanFilters = () => {
    setParams({ name: "" });
    handleShow();
  };

  return (
    <Offcanvas show={show} onHide={handleShow}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Filtrar Produtos</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form onSubmit={handleSubmit}>
          {/* <Form.Group className="mb-3">
            <Form.Label>ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ex: 651e21554deafb768b4e7207"
              name="id"
              value={formData.id}
              onChange={handleChange}
            />
          </Form.Group> */}
          <Form.Group className="mb-3">
            <Form.Label>Nome:</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Ex: John Doe"
              defaultValue={searchByName ? searchByName : ""}
            />
          </Form.Group>
          {/* <Form.Group className="mb-3">
            <Form.Label>Categoría:</Form.Label>
            <Form.Select name="category" placeholder="Selecione uma categoria.">
              <option defaultChecked value="">
                Selecione uma categoria para filtrar
              </option>
            </Form.Select>
          </Form.Group> */}
          {/* <Form.Group className="mb-3">
            <Form.Label>Descrição:</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              placeholder="Ex: Roupa bonita."
     
            />
          </Form.Group> */}
          <div className="d-flex gap-3">
            <Button variant="outline-primary" type="submit" className="w-50">
              Filtrar
            </Button>
            <Button
              onClick={cleanFilters}
              className="w-50"
              variant="outline-secondary"
            >
              Limpar Filtros
            </Button>
          </div>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default AdminProductFilter;
