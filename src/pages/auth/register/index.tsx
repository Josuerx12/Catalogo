import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { ChangeEvent, useState } from "react";

const Register = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  console.log(credentials);
  return (
    <div className="auth">
      <Form>
        <h4>Catálogo - Novo Usuário</h4>
        <Form.Group className="mb-3">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            name="name"
            type="text"
            placeholder="John Doe"
            onChange={(e) => handleChange(e)}
          />
          <Form.Text className="text-muted">
            Insira um nome de usuário à qual deseja ser chamado.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="john_doe@email.com"
            onChange={(e) => handleChange(e)}
          />
          <Form.Text className="text-muted">
            Nunca deve-se compartilhar seu email com ninguém.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="********"
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirmação de Senha</Form.Label>
          <Form.Control
            name="confirmPassword"
            type="password"
            placeholder="********"
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="formBasicEmail"
          style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
        >
          <Form.Text className="text-muted">
            Já possui uma conta? <Link to="/login">Clique aqui</Link>.
          </Form.Text>
          <Form.Text className="text-muted">
            Esqueceu sua senha? <Link to="/recovery">Clique aqui</Link>.
          </Form.Text>
        </Form.Group>
        {credentials.email.length <= 0 || credentials.password.length < 8 ? (
          <Button variant="primary" disabled type="submit">
            Entrar
          </Button>
        ) : (
          <Button variant="primary" type="submit">
            Entrar
          </Button>
        )}
      </Form>
    </div>
  );
};

export default Register;
