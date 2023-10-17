import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { Auth } from "../../../context/authContext";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { login, errors, loading } = Auth();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await login(credentials);

    console.log(res);
  };

  console.log(loading);
  return (
    <div className="auth">
      <Form onSubmit={(e) => handleSubmit(e)}>
        <h4>Catálogo - Login</h4>
        <Form.Group className="mb-3">
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="john_doe@email.com"
            required
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
            required
            minLength={8}
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
            Ainda não possui uma conta?
            <Link to="/registrar-se">Clique aqui</Link>.
          </Form.Text>
          <Form.Text className="text-muted">
            Esqueceu sua senha? <Link to="/recovery">Clique aqui</Link>.
          </Form.Text>
        </Form.Group>
        {loading ? (
          <Button variant="primary" type="submit">
            Entrar
          </Button>
        ) : (
          <Button variant="primary" disabled type="submit">
            Entrar
          </Button>
        )}
      </Form>
    </div>
  );
};

export default Login;
