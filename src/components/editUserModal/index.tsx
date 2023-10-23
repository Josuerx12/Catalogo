import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useRef, useState } from "react";
import { Auth } from "../../context/authContext";

type props = {
  show: boolean;
  handleShow: () => void;
};

const EditUserModal = ({ handleShow, show }: props) => {
  const { editUser, user } = Auth();
  const [image, setImage] = useState<File | null>();
  const [credentials, setCredentials] = useState({
    name: user?.name,
    email: user?.email,
    admin: user?.admin,
  });
  const formRef = useRef<HTMLFormElement | null>(null);

  const formData = new FormData();

  if (image) formData.append("user-avatar", image);
  if (credentials.name) formData.append("name", credentials.name);
  if (credentials.email) formData.append("email", credentials.email);
  // if (credentials.admin) formData.append("admin", credentials.admin.toString());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await editUser(formData);
    handleShow();
  };

  return (
    <Modal show={show} onHide={handleShow} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Editar dados do usuário</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Form.Group className="mb-3 d-flex align-items-center justify-content-center flex-column">
            <img
              className="rounded-circle"
              style={{ width: "13rem" }}
              src={
                user?.photo
                  ? `https://userphotoscatalogo.s3.us-east-2.amazonaws.com/${user.photo} `
                  : "/no-profile.jpg"
              }
              alt={
                user?.photo ? user.photo : "Usuário não possui foto de perfil."
              }
            />
            <Form.Label style={{ fontWeight: "600" }}>
              Trocar foto de perfil
            </Form.Label>
            <Form.Control
              type="file"
              name="user-avatar"
              required
              accept="image/*"
              multiple={false}
              onChange={(e) => {
                const inputElement = e.target as HTMLInputElement;
                if (inputElement.files && inputElement.files.length > 0) {
                  const selectedFile = inputElement.files[0];
                  setImage(selectedFile);
                }
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nome:</Form.Label>
            <Form.Control
              type="text"
              name="name"
              required
              defaultValue={credentials?.name}
              onChange={(e) =>
                setCredentials((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              type="email"
              required
              defaultValue={credentials?.email}
              placeholder="Insira um novo e-mail"
              onChange={(e) =>
                setCredentials((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </Form.Group>
          {/* {userInfos?.admin ? (
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Administrador"
              defaultChecked={credentials.admin}
              onChange={(e) =>
                setCredentials((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.checked,
                }))
              }
              name="admin"
            />
          ) : (
            <Form.Check
              disabled
              type="switch"
              id="custom-switch"
              defaultChecked={credentials.admin}
              onChange={(e) =>
                setCredentials((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.checked,
                }))
              }
              label="Administrador"
            />
          )} */}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleShow}>
          Close
        </Button>
        <Button variant="success" onClick={handleSubmit}>
          Alterar dados
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditUserModal;
