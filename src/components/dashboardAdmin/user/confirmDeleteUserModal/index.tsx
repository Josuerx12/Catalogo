import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Admin } from "../../../../context/adminContext";
import { User } from "../../../../interfaces/user/userInterface";
import { useState } from "react";

type props = {
  handleShow: () => void;
  show: boolean;
  user: User;
};

const ConfirmDeleteUserModal = ({ handleShow, show, user }: props) => {
  const { deleteUser } = Admin();
  const [loadingUserPhoto, setLoadingUserPhoto] = useState(true);

  const handleLoadingPhotoStatus = () => {
    setLoadingUserPhoto(false);
  };

  const handleSubmitDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    await deleteUser(user._id);
    handleShow();
  };
  return (
    <Modal show={show} onHide={handleShow} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Deletar usuário - ID: {user?._id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => handleSubmitDelete(e)}>
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
            <Form.Control type="text" value={user?.name} disabled />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>E-mail</Form.Label>
            <Form.Control type="email" disabled value={user?.email} />
          </Form.Group>
          <Form.Check
            disabled
            type="switch"
            id="custom-switch"
            defaultChecked={user?.admin}
            label="Administrador"
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleShow}>
          Fechar
        </Button>
        <Button variant="warning" onClick={handleSubmitDelete}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmDeleteUserModal;
