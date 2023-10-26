import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { RiUserSettingsLine } from "react-icons/ri";
import { User } from "../../../interfaces/user/userInterface";
import { useState } from "react";
import ConfirmDeleteUserModal from "../../confirmDeleteUserModal";
import AdminEditUserModal from "../../adminEditUserModal";
const UsersInfo = ({ user }: { user: User }) => {
  const [showDeleteUserModal, setshowDeleteUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);

  const handleShowDeleteUserModal = () =>
    setshowDeleteUserModal((prev) => !prev);

  const handleShowEditUserModal = () => setShowEditUserModal((prev) => !prev);

  const createdAt = new Date(user.createdAt).toLocaleString("pt-BR");
  const updatedAt = new Date(user.updatedAt).toLocaleString("pt-BR");
  return (
    <>
      <ConfirmDeleteUserModal
        show={showDeleteUserModal}
        handleShow={handleShowDeleteUserModal}
        user={user}
      />
      <AdminEditUserModal
        show={showEditUserModal}
        handleShow={handleShowEditUserModal}
        user={user}
      />
      <tr>
        <td className="text-center">{user?._id}</td>
        <td className="text-center">{user?.name}</td>
        <td className="text-center">{user?.email}</td>
        <td className="text-center">{user?.admin ? "Sim" : "Não"}</td>
        <td className="text-center">{createdAt}</td>
        <td className="text-center">{updatedAt}</td>
        <td className="text-center">
          <DropdownButton
            id="dropdown-basic"
            variant="success"
            title={
              <span style={{ fontSize: "1.1rem" }}>
                Gerenciar
                <RiUserSettingsLine className="text-white" />
              </span>
            }
            size="sm"
          >
            <Dropdown.Item onClick={handleShowEditUserModal}>
              Editar
            </Dropdown.Item>
            <Dropdown.Item onClick={handleShowDeleteUserModal}>
              Excluir
            </Dropdown.Item>
          </DropdownButton>
        </td>
      </tr>
    </>
  );
};

export default UsersInfo;
