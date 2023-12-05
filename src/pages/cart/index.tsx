import { Link } from "react-router-dom";
import { Auth } from "../../context/authContext";

const Cart = () => {
  const { user } = Auth();
  return (
    <section style={{ flex: "1" }}>
      <h2>Seu Carrinho</h2>
      {!user ? (
        <p>
          Para adicionar produtos ao carrinho autenque-se{" "}
          <Link to="/login">Clicando aqui</Link>
        </p>
      ) : (
        <div>Carrinho</div>
      )}
    </section>
  );
};

export default Cart;
