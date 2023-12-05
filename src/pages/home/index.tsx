import { Link } from "react-router-dom";
import { Auth } from "../../context/authContext";

const Home = () => {
  const { user } = Auth();
  return (
    <div
      className="d-flex flex-column mx-auto presentation"
      style={{ flex: "1" }}
    >
      <h1 className="text-center">Bem-vindo ao nosso catálogo de produtos</h1>
      {!user ? (
        <p className="text-lg-center text-sm-start text-wrap pt-3 fw-bolder">
          Esta é a melhor loja para encontrar produtos incríveis. Faça o login
          ou registre-se para começar a explorar nosso catálogo e fazer compras
          incríveis.
        </p>
      ) : (
        <p className="text-lg-center text-sm-start text-wrap pt-3 fw-bolder">
          Bem-vindo de volta! Você está prestes a mergulhar em uma experiência
          única de compras. Navegue pelo nosso catálogo repleto de produtos
          incríveis, descubra as últimas novidades e faça compras que vão
          surpreender você. Sua jornada de compras extraordinárias começa aqui.
          Aproveite! 🌟
        </p>
      )}
      <p className="text-lg-center text-sm-start text-wrap">
        Para conhecer mais sobre a historia deste catálogo de produtos acesse a
        sessão sobre. para mais informações do aplicativo{" "}
        <Link to="/sobre">Clique aqui.</Link>.
      </p>
      {user ? (
        <div className="d-flex gap-3 justify-content-center align-items-center flex-wrap">
          <Link
            to="/produtos"
            className="btn btn-primary"
            style={{ width: "fit-content" }}
          >
            Acessar catálogo de produtos
          </Link>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default Home;
