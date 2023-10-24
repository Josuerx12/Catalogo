import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { Auth } from "../../context/authContext";

type props = {
  show: boolean;
  handleShow: () => void;
};

type newPass = {
  password: null | string;
  confirmPassword: null | string;
};

const ChangePasswordModal = ({ show, handleShow }: props) => {
  const [newPassword, setNewPassword] = useState<newPass>({
    password: null,
    confirmPassword: null,
  });

  const { editUser } = Auth();

  const formData = new FormData();

  if (newPassword.password && newPassword.password.length >= 8)
    formData.append("password", newPassword.password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.password === newPassword.confirmPassword) {
      await editUser(formData);
      handleShow();
      return;
    }
    alert("As senhas devem ser iguais.");
  };

  return (
    <Modal show={show} onHide={handleShow} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Alterar senha do usuário</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Nova senha:</Form.Label>
            <Form.Control
              name="password"
              type="password"
              required
              minLength={8}
              onChange={(e) =>
                setNewPassword((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            ></Form.Control>
            <Form.Text className="text-muted">
              Sua nova senha deve conter pelo menos 8 caracteres 1 caracter
              especial e 1 letra maiúscula
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirme a nova senha:</Form.Label>
            <Form.Control
              name="confirmPassword"
              type="password"
              required
              minLength={8}
              onChange={(e) =>
                setNewPassword((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            ></Form.Control>
            <Form.Text className="text-muted">
              {newPassword.confirmPassword !== newPassword.password
                ? "As senhas devem ser iguais."
                : "Senhas identicas"}
            </Form.Text>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleShow}>
          Fechar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangePasswordModal;
