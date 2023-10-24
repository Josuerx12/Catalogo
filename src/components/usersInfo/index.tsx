import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { RiUserSettingsLine } from "react-icons/ri";
import { User } from "../../interfaces/user/userInterface";
const UsersInfo = ({ user }: { user: User }) => {
  return (
    <tr>
      <td>{user?._id}</td>
      <td>{user?.name}</td>
      <td>{user?.email}</td>
      <td>{user?.admin ? "Sim" : "Não"}</td>
      <td>{user?.createdAt}</td>
      <td>{user?.updatedAt}</td>
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
          <Dropdown.Item>Excluir</Dropdown.Item>
        </DropdownButton>
      </td>
    </tr>
  );
};

export default UsersInfo;
