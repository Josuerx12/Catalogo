import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Auth } from "../../../context/authContext";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { login, errors, loading } = Auth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(credentials);
  };
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
            onChange={(e) =>
              setCredentials((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
          />
          <Form.Text
            className={errors && errors.email ? "text-error" : "text-muted"}
          >
            {errors && errors?.email
              ? errors.email.msg
              : "Nunca deve-se compartilhar seu email com ninguém."}
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
            onChange={(e) =>
              setCredentials((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
          />
          {errors && errors?.msg && (
            <Form.Text className="text-error">{errors.msg}</Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-1">
          <Form.Text className="text-muted">
            Já possui uma conta? <Link to="/login">Clique aqui</Link>.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Text className="text-muted">
            Esqueceu sua senha? <Link to="/recovery">Clique aqui</Link>.
          </Form.Text>
        </Form.Group>
        {loading ? (
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

export default Login;
