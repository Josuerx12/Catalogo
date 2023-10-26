import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Auth } from "../../../context/authContext";

const Register = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { register, loading, errors } = Auth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(credentials);
  };

  return (
    <div className="auth">
      <Form onSubmit={(e) => handleSubmit(e)}>
        <h4>Catálogo - Novo Usuário</h4>
        <Form.Group className="mb-3">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            name="name"
            type="text"
            placeholder="John Doe"
            onChange={(e) =>
              setCredentials((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
          />
          <Form.Text className={errors?.name ? "text-error" : "text-muted"}>
            {errors?.name
              ? errors.name.msg
              : "Insira um nome de usuário à qual deseja ser chamado."}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="john_doe@email.com"
            onChange={(e) =>
              setCredentials((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
          />
          <Form.Text className={errors?.email ? "text-error" : "text-muted"}>
            {errors?.email
              ? errors.email.msg
              : "Insira um e-mail válido para criar um novo usuário."}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="********"
            onChange={(e) =>
              setCredentials((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
          />
          <Form.Text className={errors?.password ? "text-error" : "text-muted"}>
            {errors?.password
              ? errors.password.msg
              : "A senha deve conter no mínimo 8 caracteres, 1 letra maiuscula e caractere especial."}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirmação de Senha</Form.Label>
          <Form.Control
            name="confirmPassword"
            type="password"
            placeholder="********"
            onChange={(e) =>
              setCredentials((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
          />
          <Form.Text
            className={errors?.confirmPassword ? "text-error" : "text-muted"}
          >
            {errors?.confirmPassword
              ? errors.confirmPassword.msg
              : "Confirme sua senha."}
          </Form.Text>
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

export default Register;
