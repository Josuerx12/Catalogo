import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState, useRef } from "react";
import { Admin } from "../../../../context/adminContext";
type props = {
  handleShow: () => void;
  show: boolean;
};
const AdminCreateUserModal = ({ handleShow, show }: props) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const { createUser, userErrors: errors, loading } = Admin();
  const [credencials, setCredencials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    admin: false,
  });

  const handleCreateUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await createUser(credencials);

    if (res.status === 200) {
      handleShow();
      setCredencials({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        admin: false,
      });
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleShow} backdrop="static" size="xl">
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
              <Form.Text className={errors?.name ? "text-danger" : ""}>
                {errors?.name
                  ? errors.name.msg
                  : "Insira um nome de usuário à qual deseja ser chamado."}
              </Form.Text>
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
              <Form.Text className={errors?.email ? "text-danger" : ""}>
                {errors?.email
                  ? errors.email.msg
                  : "Insira um e-mail válido para criar um novo usuário."}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                name="password"
                type="password"
                required
                minLength={8}
                pattern="^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$"
                onChange={(e) =>
                  setCredencials((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
              <Form.Text className={errors?.password ? "text-danger" : ""}>
                {errors?.password
                  ? errors.password.msg
                  : "A senha deve conter no mínimo 8 caracteres, 1 letra maiuscula e caractere especial."}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirmar senha</Form.Label>
              <Form.Control
                type="password"
                required
                name="confirmPassword"
                onChange={(e) =>
                  setCredencials((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
              {credencials?.password !== credencials?.confirmPassword && (
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
          <Button
            variant="danger"
            disabled={loading ? true : false}
            onClick={handleShow}
          >
            Cancelar
          </Button>
          <Button
            variant="success"
            disabled={loading ? true : false}
            type="submit"
            onClick={() => formRef.current?.requestSubmit()}
          >
            {loading ? "Cadastrando usuário" : "Cadastrar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdminCreateUserModal;
