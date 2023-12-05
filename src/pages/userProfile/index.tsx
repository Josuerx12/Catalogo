import Button from "react-bootstrap/Button";
import { HiPencilAlt } from "react-icons/hi";
import { BsPersonFillLock } from "react-icons/bs";
import { Auth } from "../../context/authContext";
import { useState } from "react";
import EditUserModal from "../../components/userProfile/editUserModal";
import ChangePasswordModal from "../../components/userProfile/changePasswordModal";
const User = () => {
  const { user } = Auth();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [loadingPhoto, setLoadingPhoto] = useState(true);

  const handleShowEditModal = () => setShowEditModal((prev) => !prev);
  const handlePhotoLoading = () => setLoadingPhoto(false);
  const handleChangePasswordModal = () =>
    setShowChangePasswordModal((prev) => !prev);
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center bg-light rounded mx-auto p-2 m-2"
      style={{ width: "90%", flex: "1" }}
    >
      <EditUserModal handleShow={handleShowEditModal} show={showEditModal} />
      <ChangePasswordModal
        show={showChangePasswordModal}
        handleShow={handleChangePasswordModal}
      />
      <h3 className="text-center mt-4 mb-4 text-dark">Perfil do usuário</h3>
      {loadingPhoto && (
        <img
          className="rounded shadow bg-body"
          style={{
            width: "14rem",
            aspectRatio: "1",
          }}
          src="/carregando-1.gif"
        />
      )}
      <img
        style={
          loadingPhoto
            ? { display: "none" }
            : { width: "14rem", height: "12rem" }
        }
        className="rounded shadow bg-body p-0"
        src={
          user?.photo
            ? `https://userphotoscatalogo.s3.us-east-2.amazonaws.com/${user.photo}`
            : "/no-profile.jpg"
        }
        onLoad={handlePhotoLoading}
      />
      <div
        className="w-100 d-flex flex-column align-items-center border p-4 mb-4 mt-4 bg-white rounded-3"
        style={{ width: "fit-content" }}
      >
        <div>
          <p className="text-dark text-start" style={{ fontSize: "1.2rem" }}>
            <b>ID do usuário:</b> {user?._id}{" "}
          </p>
          <p className="text-dark text-start" style={{ fontSize: "1.2rem" }}>
            <b>Nome:</b> {user?.name}{" "}
          </p>
          <p className="text-dark text-start" style={{ fontSize: "1.2rem" }}>
            <b>E-mail:</b> {user?.email}{" "}
          </p>
          <div className="d-flex gap-3 flex-wrap justify-content-start">
            <Button
              variant="success"
              className="d-flex align-items-center justify-content-center gap-1"
              style={{ fontSize: "1.2rem" }}
              onClick={handleShowEditModal}
            >
              Editar usuário <HiPencilAlt className="text-light" />
            </Button>
            <Button
              variant="primary"
              className="d-flex align-items-center justify-content-center gap-1"
              style={{ fontSize: "1.2rem" }}
              onClick={handleChangePasswordModal}
            >
              Trocar senha
              <BsPersonFillLock />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
