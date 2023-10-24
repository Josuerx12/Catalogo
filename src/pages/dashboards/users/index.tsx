import Table from "react-bootstrap/Table";
import UsersInfo from "../../../components/usersInfo";
import { Admin } from "../../../context/adminContext";
import { User } from "../../../interfaces/user/userInterface";

const UsersDashboard = () => {
  const { users, loading, errors } = Admin();
  return (
    <div className="usersDashboard">
      <h3 className="text-center mt-4 mb-3">Dashboard de usuários </h3>
      <Table striped bordered hover style={{ width: "90%", margin: "auto" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome Completo</th>
            <th>E-mail</th>
            <th>Admin</th>
            <th>Entrou</th>
            <th>Atualizou</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {!loading &&
            !errors &&
            Array.isArray(users) &&
            users?.map((user: User) => <UsersInfo user={user} />)}
        </tbody>
      </Table>
    </div>
  );
};

export default UsersDashboard;
