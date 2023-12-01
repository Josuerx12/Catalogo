import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="d-flex flex-column mt-5 w-75 mx-auto p-5">
      <h1 className="text-center">Bem-vindo ao nosso catálogo de produtos</h1>
      <p className="text-lg-center text-sm-start text-wrap pt-3">
        Esta é a melhor loja para encontrar produtos incríveis. Faça o login ou
        registre-se para começar a explorar nosso catálogo e fazer compras
        incríveis.
      </p>
      <p className="text-lg-center text-sm-start text-wrap">
        Para conhecer mais sobre a historia deste catálogo de produtos acesse a
        sessão sobre. para mais informações do aplicativo{" "}
        <Link to="/sobre">Clique aqui.</Link>.
      </p>
      <div className="d-flex gap-3 justify-content-center align-items-center flex-wrap">
        <Link
          to="/login"
          className="btn btn-primary"
          style={{ width: "fit-content" }}
        >
          Fazer Login
        </Link>
        <Link
          to="/registrar-se"
          className="btn btn-secondary"
          style={{ width: "fit-content" }}
        >
          Registrar-se
        </Link>
      </div>
    </div>
  );
};

export default Home;
