import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { RiUserSettingsLine } from "react-icons/ri";
import { User } from "../../interfaces/user/userInterface";
import { useState } from "react";
import ConfirmDeleteUserModal from "../confirmDeleteUserModal";
const UsersInfo = ({ user }: { user: User }) => {
  const [showDeleteUserModal, setshowDeleteUserModal] = useState(false);

  const handleShowDeleteUserModal = () =>
    setshowDeleteUserModal((prev) => !prev);

  return (
    <>
      <ConfirmDeleteUserModal
        show={showDeleteUserModal}
        handleShow={handleShowDeleteUserModal}
        user={user}
      />
      <tr>
        <td>{user?._id}</td>
        <td>{user?.name}</td>
        <td>{user?.email}</td>
        <td>{user?.admin ? "Sim" : "Não"}</td>
        <td>{new Date(user?.createdAt).toLocaleDateString("pt-BR")}</td>
        <td>{new Date(user?.updatedAt).toLocaleDateString("pt-BR")}</td>
        <td>
          <DropdownButton
            id="dropdown-basic-button"
            title={
              <span>
                Gerenciar <RiUserSettingsLine className="text-white" />
              </span>
            }
            size="sm"
          >
            <Dropdown.Item>Editar</Dropdown.Item>
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
