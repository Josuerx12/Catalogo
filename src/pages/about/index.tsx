import { BsGithub } from "react-icons/bs";
import { AiOutlineLinkedin } from "react-icons/ai";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="container mt-2">
      <h1 className="text-md-center text-sm-center text-lg-center">
        Sobre este Projeto
      </h1>
      <div className="border p-3 rounded">
        <p className="fw-bolder">
          Este catálogo de produtos foi criado por Josué Carvalho. Ele construiu
          um backend usando Node.js com o framework Express, incorporando
          bibliotecas como bcrypt.js, express-validator e Nodemailer para envio
          de e-mails usando o protocolo SMTP. O gerenciamento de imagens foi
          feito usando o Multer, e o acesso ao banco de dados não relacional do
          MongoDB foi realizado por meio do Mongoose, entre outros recursos.
        </p>
        <p>
          A API do catálogo conta com rotas para operações de CRUD (Create,
          Read, Update, Delete) e inclui um sistema de autenticação de usuários.
          Há funções para administradores que possibilitam editar, excluir ou
          criar novos usuários, bem como realizar operações semelhantes para
          produtos.
        </p>
        <p>
          No frontend, utilizamos React.js com TypeScript, React Router, Context
          API, custom hooks, Axios e js-cookies para o armazenamento de dados
          nos cookies do navegador dos usuários, entre muitos outros recursos.
          Você pode conferir o código fonte do frontend e do backend no GitHub
          de Josué Carvalho.
        </p>

        <p className="fw-bold">
          Obs.: Caso queira testar as funcionalidades do aplicativo, incluindo
          as ferramentas administrativas, entre em contato com o Josué Carvalho
          por{" "}
          <Link
            style={{ fontSize: "1.3rem" }}
            to="mailto:josueazevedo71@hotmail.com"
            target="_blank"
          >
            E-mail
          </Link>
          ,{" "}
          <Link
            style={{ fontSize: "1.3rem" }}
            to="telto:22997979633"
            target="_blank"
          >
            Telefone
          </Link>{" "}
          ou através do{" "}
          <Link
            style={{ fontSize: "1.3rem" }}
            to="https://www.linkedin.com/in/josueaze12/"
            target="_blank"
          >
            LinkedIn <AiOutlineLinkedin />
          </Link>
          .
        </p>
        <div className="d-flex gap-3 flex-wrap justify-content-center">
          <Link
            to="https://github.com/Josuerx12/CatalogoAPI"
            target="_blank"
            type="button"
            className="d-flex fw-bold justify-content-center align-items-center gap-2 btn btn-dark btn-lg"
          >
            Repositorio Back-End
            <BsGithub style={{ fontSize: "1.6rem" }} />
          </Link>
          <Link
            to="https://github.com/Josuerx12/Catalogo"
            target="_blank"
            type="button"
            className="d-flex fw-bold justify-content-center align-items-center gap-2 btn btn-dark btn-lg"
          >
            Repositorio Front-end
            <BsGithub style={{ fontSize: "1.6rem" }} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
