import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link, useNavigate } from "react-router-dom";
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
            Catálogo J.C.
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
              <Nav className="justify-content-end flex-grow-1 pe-4">
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
                    id={`offcanvasNavbarDropdown-expand-lg`}
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
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default Navmenu;
