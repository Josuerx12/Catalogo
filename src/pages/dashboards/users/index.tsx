import Table from "react-bootstrap/Table";
import UsersInfo from "../../../components/usersInfo";
import { Admin } from "../../../context/adminContext";
import { User } from "../../../interfaces/user/userInterface";
import Spinner from "react-bootstrap/Spinner";

const UsersDashboard = () => {
  const { users, loading, errors } = Admin();
  return (
    <div className="usersDashboard">
      <h3 className="text-center mt-4 mb-3">Dashboard de usuários </h3>
      {loading && (
        <div
          style={{ width: "100%", minHeight: "90dvh" }}
          className="d-flex align-items-center justify-content-center"
        >
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Carregando...</span>
          </Spinner>
        </div>
      )}
      {!loading && !errors && (
        <Table striped bordered hover style={{ width: "90%", margin: "auto" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome Completo</th>
              <th>E-mail</th>
              <th>Admin</th>
              <th>Entrou dia</th>
              <th>Atualizou dia</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              !errors &&
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
