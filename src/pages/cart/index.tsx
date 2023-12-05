import { Link } from "react-router-dom";
import { Auth } from "../../context/authContext";
import { useCartStore } from "../../store/cartStore";
import { Product } from "../../interfaces/product/productInterface";

const Cart = () => {
  const { cart } = useCartStore();
  const { user } = Auth();

  console.log(cart);

  return (
    <section style={{ flex: "1" }}>
      <h2>Seu Carrinho</h2>
      {!user ? (
        <p>
          Para adicionar produtos ao carrinho autenque-se{" "}
          <Link to="/login">Clicando aqui</Link>
        </p>
      ) : (
        <div>
          {cart.length <= 0 ? (
            <p>Carrinho vazio!!!</p>
          ) : (
            <ul>
              {cart.map((product: Product) => (
                <li>{product._id}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
};

export default Cart;
