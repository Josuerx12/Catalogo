import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useNavigate } from "react-router-dom";
import { Auth } from "../../context/authContext";
import Button from "react-bootstrap/Button";
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
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link onClick={(e) => handleNavigateNav(e, "/")}>
                  Início
                </Nav.Link>
                <Nav.Link onClick={(e) => handleNavigateNav(e, "/Sobre")}>
                  Sobre
                </Nav.Link>
                {user && (
                  <Nav.Link onClick={(e) => handleNavigateNav(e, "/produtos")}>
                    Loja
                  </Nav.Link>
                )}
                {!user && (
                  <>
                    <Button
                      className="mb-3"
                      style={{ marginRight: ".425rem" }}
                      variant="outline-primary"
                      onClick={(e) => handleNavigateNav(e, "/registrar-se")}
                    >
                      Registrar-se
                    </Button>
                    <Button
                      className="mb-3"
                      variant="outline-secondary"
                      onClick={(e) => handleNavigateNav(e, "/login")}
                    >
                      Entrar
                    </Button>
                  </>
                )}
                {user && (
                  <NavDropdown
                    title={user.name}
                    id={`offcanvasNavbarDropdown-expand-xxl`}
                  >
                    <NavDropdown.Item
                      onClick={(e) => handleNavigateNav(e, "/login")}
                    >
                      Perfil
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={(e) => handleNavigateNav(e, "/registrar-se")}
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
