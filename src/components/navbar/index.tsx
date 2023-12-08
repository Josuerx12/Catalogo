import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "../../context/authContext";
import { FaUser } from "react-icons/fa";
import { TbPackages } from "react-icons/tb";
import { LuShoppingCart } from "react-icons/lu";
import { useCartStore } from "../../store/cartStore";
const Navmenu = () => {
  const navigate = useNavigate();
  const { cart } = useCartStore();
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
                      className="d-flex align-items-center gap-2"
                    >
                      Usuários <FaUser />
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={(e) =>
                        handleNavigateNav(e, "/dashboard/produtos")
                      }
                      className="d-flex align-items-center gap-2"
                    >
                      Produtos <TbPackages />
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
              </Nav>
              <div className="gap-2 navbarResponsive">
                <Link
                  className=" pt-2 pb-2 pe-3 ps-3 rounded gap-2 text-light"
                  to="/carrinho"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    textDecoration: "none",
                  }}
                >
                  <LuShoppingCart
                    style={{ fontSize: "1.3rem", color: "#000" }}
                  />
                  {cart.length > 0 && (
                    <span
                      className="bg-danger d-flex text-center align-items-center justify-content-center text-white rounded-circle"
                      style={{
                        zIndex: "999",
                        width: "20px",
                        height: "20px",
                        fontSize: "1rem",
                        position: "absolute",
                        top: -2,
                        right: 4,
                      }}
                    >
                      {cart.length}
                    </span>
                  )}
                </Link>

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
