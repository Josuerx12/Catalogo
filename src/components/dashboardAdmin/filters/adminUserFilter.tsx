/* eslint-disable @typescript-eslint/no-explicit-any */
import Offcanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { useState } from "react";

type Props = {
  show: boolean;
  handleShow: () => void;
  setFilter: any;
};

const AdminUserFilter = ({ show, handleShow, setFilter }: Props) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilter(formData);
    handleShow();
  };

  const cleanFilters = () => {
    setFilter({
      id: "",
      name: "",
      email: "",
    });

    setFormData({
      id: "",
      name: "",
      email: "",
    });
    handleShow();
  };

  return (
    <>
      <Offcanvas show={show} onHide={handleShow}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filtrar Usuários</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ex: 651e21554deafb768b4e7207"
                name="id"
                value={formData.id}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nome:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Ex: John Doe"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Ex: johndoe@email.com"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
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
    </>
  );
};

export default AdminUserFilter;
