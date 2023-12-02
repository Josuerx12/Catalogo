import Table from "react-bootstrap/Table";
import UsersInfo from "../../../components/dashboardAdmin/user/usersInfo";
import { Admin } from "../../../context/adminContext";
import { User } from "../../../interfaces/user/userInterface";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import { FaFilter, FaUserPlus } from "react-icons/fa";
import { useState } from "react";
import AdminCreateUserModal from "../../../components/dashboardAdmin/user/adminCreateUserModal";

const UsersDashboard = () => {
  const { users, loading, userErrors } = Admin();
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  return (
    <div className="usersDashboard">
      <AdminCreateUserModal
        show={showCreateUserModal}
        handleShow={() => setShowCreateUserModal((prev) => !prev)}
      />
      <h3 className="text-center mt-4 mb-3">Dashboard de usuários </h3>
      <div
        className="d-flex pt-2 pb-2 justify-content-end gap-2"
        style={{ width: "90%", margin: "auto" }}
      >
        <Button variant="primary">
          Filtrar Usuários <FaFilter style={{ color: "#fafafa" }} />
        </Button>
        <Button
          onClick={() => setShowCreateUserModal((prev) => !prev)}
          variant="success"
          style={{ textAlign: "center" }}
        >
          Criar Novo Usuário <FaUserPlus style={{ fontSize: "1.3rem" }} />
        </Button>
      </div>
      {loading && (
        <div
          style={{ width: "100%", minHeight: "90dvh" }}
          className="d-flex align-items-center justify-content-center"
        >
          <span>Carregando...</span>
          <Spinner animation="border" role="status"></Spinner>
        </div>
      )}
      {!loading && !userErrors && (
        <Table striped bordered hover style={{ width: "90%", margin: "auto" }}>
          <thead>
            <tr>
              <th className="text-center text-uppercase">ID</th>
              <th className="text-center text-uppercase">Nome Completo</th>
              <th className="text-center text-uppercase">E-mail</th>
              <th className="text-center text-uppercase">Admin</th>
              <th className="text-center text-uppercase">Entrou dia</th>
              <th className="text-center text-uppercase">Atualizou dia</th>
              <th className="text-center text-uppercase">Ações</th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              !userErrors &&
              Array.isArray(users) &&
              users?.map((user: User) => (
                <UsersInfo user={user} key={user._id} />
              ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default UsersDashboard;
