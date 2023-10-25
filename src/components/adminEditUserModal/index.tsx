import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState, useRef } from "react";
import { User } from "../../interfaces/user/userInterface";
type props = {
  handleShow: () => void;
  show: boolean;
  user: User;
};
const AdminEditUserModal = ({ handleShow, show, user }: props) => {
  const [newCredentials, setNewCredentials] = useState({
    name: user?.name,
    email: user?.email,
    newPassword: "",
    confirmNewPassword: "",
    admin: user?.admin,
  });

  const formRef = useRef(null);

  // const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/
  // regex.test(newCredentials.newPassword)

  const [loadingUserPhoto, setLoadingUserPhoto] = useState(true);

  const handleLoadingPhotoStatus = () => {
    setLoadingUserPhoto(false);
  };

  const handleButtonClick = () => {
    if (formRef.current) formRef.current.dispatchEvent(new Event("submit"));
  };

  return (
    <Modal show={show} onHide={handleShow} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Editar usuário - ID: {user?._id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form ref={formRef}>
          <div style={{ width: "100%" }} className="d-flex mb-4">
            {loadingUserPhoto && (
              <img
                className="rounded-circle"
                style={{
                  width: "15rem ",
                }}
                src="/carregando-1.gif"
              />
            )}
            <img
              className="rounded-circle"
              style={
                loadingUserPhoto
                  ? { display: "none", margin: "auto" }
                  : { width: "15rem", margin: "auto" }
              }
              onLoad={handleLoadingPhotoStatus}
              src={
                user?.photo
                  ? `https://userphotoscatalogo.s3.us-east-2.amazonaws.com/${user.photo} `
                  : "/no-profile.jpg"
              }
              alt={
                user?.photo ? user.photo : "Usuário não possui foto de perfil."
              }
            />
          </div>

          <Form.Group className="mb-3">
            <Form.Label>Nome:</Form.Label>
            <Form.Control
              type="text"
              defaultValue={newCredentials?.name}
              required
              minLength={10}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              type="email"
              required
              defaultValue={newCredentials.email}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nova senha</Form.Label>
            <Form.Control
              type="password"
              minLength={8}
              pattern="^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirmar nova senha</Form.Label>
            <Form.Control type="password" />
          </Form.Group>
          <Form.Check
            type="switch"
            id="custom-switch"
            defaultChecked={newCredentials.admin}
            label="Administrador"
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleShow}>
          Fechar
        </Button>
        <Button variant="success" onClick={handleButtonClick}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AdminEditUserModal;
