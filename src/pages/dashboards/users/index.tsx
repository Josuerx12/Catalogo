import Table from "react-bootstrap/Table";
import UsersInfo from "../../../components/dashboardAdmin/user/usersInfo";
import { Admin } from "../../../context/adminContext";
import { User } from "../../../interfaces/user/userInterface";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import { FaFilter, FaUserPlus } from "react-icons/fa";
import { useState } from "react";
import AdminCreateUserModal from "../../../components/dashboardAdmin/user/adminCreateUserModal";
import { Pagination } from "react-bootstrap";
import { usePagination } from "../../../hooks/usePagination/usePagination";
import AdminUserFilter from "../../../components/dashboardAdmin/filters/adminUserFilter";

const UsersDashboard = () => {
  const { users, loading, userErrors } = Admin();
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [page, setPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({
    id: "",
    name: "",
    email: "",
  });

  const { actualPage, total, totalPages, items } = usePagination({
    items: users,
    perPage: 10,
    page: page,
  });

  function nextPage() {
    if (totalPages > page) {
      setPage((prev) => prev + 1);
    }
  }

  function prevPage() {
    if (page - 1 > 0) {
      setPage((prev) => prev - 1);
    }
  }
  const filteredUsers: User[] | undefined =
    items?.filter((item): item is User => {
      if (item && "_id" in item && "name" in item && "email" in item) {
        return (
          item._id.toLowerCase().includes(filters.id.toLowerCase()) &&
          item.name.toLowerCase().includes(filters.name.toLowerCase()) &&
          item.email.toLowerCase().includes(filters.email.toLowerCase())
        );
      }
      return false;
    }) ?? undefined;

  return (
    <section
      className="d-flex flex-column justify-content-between"
      style={{ flex: "1" }}
    >
      <div className="d-flex flex-column  gap-3">
        <AdminUserFilter
          show={showFilter}
          handleShow={() => setShowFilter((prev) => !prev)}
          setFilter={setFilters}
        />
        <AdminCreateUserModal
          show={showCreateUserModal}
          handleShow={() => setShowCreateUserModal((prev) => !prev)}
        />
        <h3 className="text-center ">Dashboard de usuários </h3>
        <div
          className="d-flex justify-content-end gap-2"
          style={{ width: "90%", margin: "auto" }}
        >
          <Button
            variant="primary"
            onClick={() => setShowFilter((prev) => !prev)}
          >
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
          <Table
            striped
            bordered
            hover
            style={{ width: "90%", margin: "auto" }}
          >
            <thead>
              <tr>
                <th className="text-center text-capitalize">ID</th>
                <th className="text-center text-capitalize">Nome Completo</th>
                <th className="text-center text-capitalize">E-mail</th>
                <th className="text-center text-capitalize">Admin</th>
                <th className="text-center text-capitalize">Entrou dia</th>
                <th className="text-center text-capitalize">Atualizou dia</th>
                <th className="text-center text-capitalize">Ações</th>
              </tr>
            </thead>
            <tbody>
              {!loading &&
                !userErrors &&
                filteredUsers?.map((user) => (
                  <UsersInfo user={user as User} key={user._id} />
                ))}
            </tbody>
          </Table>
        )}
        {filteredUsers?.length === 0 && (
          <p className="text-center">Nenhum usuário encontrado...</p>
        )}
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <Pagination>
          <Pagination.Prev onClick={prevPage} />
          {Array.from(Array(totalPages)).map((_, i) => (
            <Pagination.Item
              key={i + 1}
              active={page === i + 1 ? true : false}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={nextPage} />
        </Pagination>
        <p>
          Mostrando {actualPage + 1} de{" "}
          {actualPage + 10 < total ? actualPage + 10 : total} total de {total}{" "}
          resultados.
        </p>
      </div>
    </section>
  );
};

export default UsersDashboard;
