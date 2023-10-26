import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useState, useRef } from "react";
import { User } from "../../interfaces/user/userInterface";
import { Admin } from "../../context/adminContext";
type props = {
  handleShow: () => void;
  show: boolean;
  user: User;
};
const AdminEditUserModal = ({ handleShow, show, user }: props) => {
  const { editUser } = Admin();
  const [newCredentials, setNewCredentials] = useState({
    name: user?.name,
    email: user?.email,
    newPassword: "",
    confirmNewPassword: "",
    admin: user?.admin,
  });

  const formRef = useRef<HTMLFormElement | null>(null);

  const [loadingUserPhoto, setLoadingUserPhoto] = useState(true);

  const handleLoadingPhotoStatus = () => {
    setLoadingUserPhoto(false);
  };

  const formData = new FormData();

  const handleEditUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    formData.append("name", newCredentials.name);
    formData.append("email", newCredentials.email);
    formData.append("admin", newCredentials.admin.toString());
    if (newCredentials.newPassword) {
      formData.append("password", newCredentials.newPassword);
    }
    await editUser(user._id, formData);
    handleShow();
  };

  return (
    <>
      <Modal show={show} onHide={handleShow} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Editar usuário - ID: {user?._id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form ref={formRef} onSubmit={handleEditUserSubmit}>
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
                  user?.photo
                    ? user.photo
                    : "Usuário não possui foto de perfil."
                }
              />
            </div>

            <Form.Group className="mb-3">
              <Form.Label>Nome:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                defaultValue={newCredentials?.name}
                onChange={(e) =>
                  setNewCredentials((prev) => ({
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
                defaultValue={newCredentials.email}
                onChange={(e) =>
                  setNewCredentials((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nova senha</Form.Label>
              <Form.Control
                name="password"
                type="password"
                minLength={8}
                pattern="^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$"
                onChange={(e) =>
                  setNewCredentials((prev) => ({
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
              <Form.Label>Confirmar nova senha</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                onChange={(e) =>
                  setNewCredentials((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
              {newCredentials?.newPassword !==
                newCredentials?.confirmNewPassword && (
                <Form.Text className="text-red">Senhas não conferem</Form.Text>
              )}
            </Form.Group>
            <Form.Check
              type="switch"
              id="custom-switch"
              defaultChecked={newCredentials.admin}
              label="Administrador"
              name="admin"
              onChange={(e) =>
                setNewCredentials((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.checked,
                }))
              }
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleShow}>
            Fechar
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

export default AdminEditUserModal;
