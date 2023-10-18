import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { Auth } from "../../../context/authContext";
import { useNavigate } from "react-router-dom";

const Recovery = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { recovery, errors } = Auth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await recovery(email);
  };
  return (
    <div className="auth">
      <Form onSubmit={(e) => handleSubmit(e)}>
        <h4>Catálogo - Recuperação de conta</h4>
        <Form.Group className="mb-3">
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            name="email"
            type="email"
            required
            placeholder="john_doe@email.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className={errors?.msg ? "text-error" : "text-muted"}>
            {errors?.msg
              ? errors.msg
              : "Digite o e-mail da sua conta, enviaremos uma nova senha."}
          </Form.Text>
        </Form.Group>
        <div
          style={{
            display: "flex",
            gap: "1rem",
          }}
        >
          <Button variant="primary" className="mb-3" type="submit">
            Recuperar senha
          </Button>
          <Button
            variant="success"
            className="mb-3"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Recovery;
