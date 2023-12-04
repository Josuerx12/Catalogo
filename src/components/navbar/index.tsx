import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { Auth } from "../../context/authContext";
const Navmenu = () => {
  const navigate = useNavigate();
  const { logout, user } = Auth();
  const handleNavigateNav = (e: React.FormEvent, path: string) => {
    e.preventDefault();

    navigate(path);
  };

  return (
    <>
      <Navbar key="xxl" expand="xxl" className="bg-body-tertiary mb-3">
        <Container fluid>
          <Navbar.Brand onClick={(e) => handleNavigateNav(e, "/")}>
            Catálogo J.C
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-xxl`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-xxl`}
            aria-labelledby={`offcanvasNavbarLabel-expand-xxl`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title
                id={`offcanvasNavbarLabel-expand-xxl`}
                onClick={(e) => handleNavigateNav(e, "/")}
              >
                Catálogo J.C.
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-start flex-grow-1 pe-4">
                <Nav.Link onClick={(e) => handleNavigateNav(e, "/")}>
                  Início
                </Nav.Link>
                <Nav.Link onClick={(e) => handleNavigateNav(e, "/Sobre")}>
                  Sobre
                </Nav.Link>
                <Nav.Link onClick={(e) => handleNavigateNav(e, "/produtos")}>
                  Produtos disponíveis
                </Nav.Link>
                {user?.admin && (
                  <NavDropdown
                    title="Dashboards"
                    drop="down-centered"
                    menuVariant="dark"
                    className="pe-4"
                    id="offcanvasNavbarDropdown-expand-lg"
                  >
                    <NavDropdown.Item
                      onClick={(e) =>
                        handleNavigateNav(e, "/dashboard/usuarios")
                      }
                    >
                      Usuários
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={(e) =>
                        handleNavigateNav(e, "/dashboard/produtos")
                      }
                    >
                      Produtos
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
              </Nav>
              <div className="d-flex gap-4 align-items-center ">
                {user && (
                  <Link
                    className="bg-dark p-2 rounded gap-2 text-light"
                    to="/carrinho"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textDecoration: "none",
                      color: "#000",
                      fontSize: "1.2rem",
                    }}
                  >
                    <FaShoppingCart />
                    <span
                      className="bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center"
                      style={{ width: "25px", height: "25px" }}
                    >
                      0
                    </span>
                  </Link>
                )}
                {!user && (
                  <>
                    <Nav.Link onClick={(e) => handleNavigateNav(e, "/login")}>
                      Entrar
                    </Nav.Link>
                    <Nav.Link
                      onClick={(e) => handleNavigateNav(e, "/registrar-se")}
                    >
                      Registrar-se
                    </Nav.Link>
                  </>
                )}
                {user && (
                  <NavDropdown
                    title={user.name.split(" ")[0]}
                    id={`offcanvasNavbarDropdown-expand-lg`}
                    className="pe-4"
                    drop="down-centered"
                    menuVariant="dark"
                    align={{ sm: "end", lg: "start" }}
                  >
                    <NavDropdown.Item
                      onClick={(e) => handleNavigateNav(e, "/perfil")}
                    >
                      Perfil
                    </NavDropdown.Item>

                    <NavDropdown.Item
                      onClick={() =>
                        window.open(
                          "https://api.whatsapp.com/send?phone=55022997979633",
                          "_blank"
                        )
                      }
                    >
                      Suporte
                    </NavDropdown.Item>

                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logout}>Sair</NavDropdown.Item>
                  </NavDropdown>
                )}
              </div>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default Navmenu;
