import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { HiPencilAlt } from "react-icons/hi";
import { BsPersonFillLock } from "react-icons/bs";
import { Auth } from "../../context/authContext";
import { useState } from "react";
import EditUserModal from "../../components/editUserModal";
import ChangePasswordModal from "../../components/changePasswordModal";
const User = () => {
  const { user } = Auth();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const handleShowEditModal = () => setShowEditModal((prev) => !prev);
  const handleChangePasswordModal = () =>
    setShowChangePasswordModal((prev) => !prev);
  return (
    <Container className="bg-light rounded p-2">
      <EditUserModal handleShow={handleShowEditModal} show={showEditModal} />
      <ChangePasswordModal
        show={showChangePasswordModal}
        handleShow={handleChangePasswordModal}
      />
      <h3 className="text-center mt-4 mb-4 text-dark">Perfil do usuário</h3>
      <Col>
        <Row className="justify-content-md-center">
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
        </Row>
        <Row className="justify-content-md-center">
          <div
            className="d-flex flex-column align-items-center border p-4 mb-4 mt-4 bg-white rounded-3"
            style={{ width: "fit-content" }}
          >
            <div>
              <p
                className="text-dark text-start"
                style={{ fontSize: "1.2rem" }}
              >
                <b>ID do usuário:</b> {user?._id}{" "}
              </p>
              <p
                className="text-dark text-start"
                style={{ fontSize: "1.2rem" }}
              >
                <b>Nome:</b> {user?.name}{" "}
              </p>
              <p
                className="text-dark text-start"
                style={{ fontSize: "1.2rem" }}
              >
                <b>E-mail:</b> {user?.email}{" "}
              </p>
              <div className="d-flex gap-3 justify-content-center">
                <Button
                  variant="success"
                  className="d-flex align-items-center justify-content-center gap-1"
                  style={{ width: "100%", fontSize: "1.2rem" }}
                  onClick={handleShowEditModal}
                >
                  Editar usuário <HiPencilAlt className="text-light" />
                </Button>
                <Button
                  variant="primary"
                  className="d-flex align-items-center justify-content-center gap-1"
                  style={{ width: "100%", fontSize: "1.2rem" }}
                  onClick={handleChangePasswordModal}
                >
                  Trocar senha
                  <BsPersonFillLock />
                </Button>
              </div>
            </div>
          </div>
        </Row>
      </Col>
    </Container>
  );
};

export default User;
