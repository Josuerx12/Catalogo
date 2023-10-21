import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import { User } from "../../interfaces/user/userInterface";
import { useRef, useState } from "react";
import { Auth } from "../../context/authContext";
const EditUserModal = ({
  handleShow,
  show,
  userInfos,
}: {
  handleShow: () => void;
  show: boolean;
  userInfos: User | undefined;
}) => {
  const [image, setImage] = useState<File | null>();
  const [credentials, setCredentials] = useState({
    photo: userInfos?.photo,
    name: userInfos?.name,
    email: userInfos?.email,
    admin: userInfos?.admin,
  });
  const formRef = useRef<HTMLFormElement | null>(null);

  const formData = new FormData();

  if (image) formData.append("user-avatar", image);
  if (credentials.name) formData.append("name", credentials.name);
  if (credentials.email) formData.append("email", credentials.email);
  // if (credentials.admin) formData.append("admin", credentials.admin.toString());

  const { editUser } = Auth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editUser(formData);
  };

  return (
    <Modal show={show} onHide={handleShow} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Editar dados do usuário</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Form.Group className="mb-3 d-flex align-items-center flex-column">
            <Image
              style={{ width: "10rem" }}
              className="shadow-sm"
              src={
                credentials?.photo
                  ? `https://userphotoscatalogo.s3.us-east-2.amazonaws.com/${credentials.photo} `
                  : "/no-profile.jpg"
              }
              roundedCircle
            />
            <Form.Control
              className="mt-3"
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
        <Button variant="success" onClick={(e) => handleSubmit(e)}>
          Alterar dados
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditUserModal;
