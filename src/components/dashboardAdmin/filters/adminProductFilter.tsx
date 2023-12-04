/* eslint-disable @typescript-eslint/no-explicit-any */
import Offcanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { Product } from "../../../interfaces/product/productInterface";

type Props = {
  show: boolean;
  handleShow: () => void;
  setFilter: any;
  products: Product[];
};

const AdminProductFilter = ({
  show,
  handleShow,
  setFilter,
  products,
}: Props) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    category: "",
    description: "",
  });

  const uniqueCategories = new Set(products.map((item) => item.category));

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
      category: "",
      description: "",
    });

    setFormData({
      id: "",
      name: "",
      category: "",
      description: "",
    });
    handleShow();
  };

  return (
    <Offcanvas show={show} onHide={handleShow}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Filtrar Produtos</Offcanvas.Title>
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
            <Form.Label>Categoría:</Form.Label>
            <Form.Select
              name="category"
              onChange={(e: any) => handleChange(e)}
              placeholder="Selecione uma categoria."
              value={formData.category}
            >
              <option defaultChecked value="">
                Selecione uma categoria para filtrar
              </option>
              {Array.from(uniqueCategories).map((categories, index) => (
                <option value={categories} key={index}>
                  {categories}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descrição:</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              placeholder="Ex: Roupa bonita."
              value={formData.description}
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
  );
};

export default AdminProductFilter;
