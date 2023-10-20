import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { HiPencilAlt } from "react-icons/hi";
import { Auth } from "../../context/authContext";
const User = () => {
  const { user } = Auth();
  return (
    <Container className="bg-light rounded p-2">
      <h3 className="text-center mt-4 mb-4 text-dark">Perfil do usuário</h3>
      <Col>
        <Row className="justify-content-md-center">
          <Image
            style={{ width: "13rem" }}
            src={
              user?.photo
                ? `https://user-and-stores-pics.s3.us-east-2.amazonaws.com/${user.photo} `
                : "/no-profile.jpg"
            }
            roundedCircle
          />

          <div className="d-flex flex-column align-items-center">
            <div>
              <p
                className="text-dark text-start"
                style={{ fontSize: "1.2rem" }}
              >
                <b className="text-secondary">ID do usuário:</b> {user?._id}{" "}
              </p>
              <p
                className="text-dark text-start"
                style={{ fontSize: "1.2rem" }}
              >
                <b className="text-secondary">Nome:</b> {user?.name}{" "}
              </p>
              <p
                className="text-dark text-start"
                style={{ fontSize: "1.2rem" }}
              >
                <b className="text-secondary">E-mail:</b> {user?.email}{" "}
              </p>
            </div>

            <div className="d-flex gap-3 justify-content-end">
              <Button variant="info">
                Editar usuário <HiPencilAlt className="text-primary" />
              </Button>
              <Button variant="warning">Trocar senha</Button>
            </div>
          </div>
        </Row>
      </Col>
    </Container>
  );
};

export default User;
