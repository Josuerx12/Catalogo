import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState, useRef } from "react";
type props = {
  handleShow: () => void;
  show: boolean;
};
const AdminCreateUserModal = ({ handleShow, show }: props) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [credencials, setCredencials] = useState({
    name: "",
    email: "",
    newPassword: "",
    confirmNewPassword: "",
    admin: false,
  });

  const handleCreateUserSubmit = () => {};
  return (
    <>
      <Modal show={show} onHide={handleShow} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Cadastrar um novo usuário</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form ref={formRef} onSubmit={handleCreateUserSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nome:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                defaultValue={credencials?.name}
                onChange={(e) =>
                  setCredencials((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                required
                minLength={10}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type="email"
                name="email"
                required
                defaultValue={credencials.email}
                onChange={(e) =>
                  setCredencials((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                name="password"
                type="password"
                minLength={8}
                pattern="^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$"
                onChange={(e) =>
                  setCredencials((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
              <Form.Text>
                Digite uma senha forte para alterar a senha do usuário
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirmar senha</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                onChange={(e) =>
                  setCredencials((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
              {credencials?.newPassword !== credencials?.confirmNewPassword && (
                <Form.Text className="text-red">Senhas não conferem</Form.Text>
              )}
            </Form.Group>
            <Form.Check
              type="switch"
              id="custom-switch"
              defaultChecked={credencials.admin}
              label="Administrador"
              name="admin"
              onChange={(e) =>
                setCredencials((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.checked,
                }))
              }
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleShow}>
            Cancelar
          </Button>
          <Button
            variant="success"
            type="submit"
            onClick={() => formRef.current?.requestSubmit()}
          >
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdminCreateUserModal;
