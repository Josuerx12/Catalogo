import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Recovery = () => {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const validateEmail = () => {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      return emailRegex.test(email);
    };
    setIsValid(validateEmail());
  }, [email]);

  console.log(email);
  return (
    <div className="auth">
      <Form>
        <h4>Catálogo - Login</h4>
        <Form.Group className="mb-3">
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="john_doe@email.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            Digite o e-mail de sua conta perdida.
          </Form.Text>
        </Form.Group>
        {isValid ? (
          <Button variant="primary" type="submit">
            Recuperar
          </Button>
        ) : (
          <Button variant="primary" disabled type="submit">
            Recuperar
          </Button>
        )}
      </Form>
    </div>
  );
};

export default Recovery;
