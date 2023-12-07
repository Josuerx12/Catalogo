import { Link } from "react-router-dom";
import { Auth } from "../../context/authContext";
import { ProductCart, useCartStore } from "../../store/cartStore";
import ItemCart from "../../components/itemCart";

const Cart = () => {
  const { cart } = useCartStore();
  const { user } = Auth();

  console.log(cart);

  return (
    <section
      className="p-2 d-flex flex-column align-items-center"
      style={{ flex: "1" }}
    >
      <h2>Carrinho de compras</h2>
      {!user ? (
        <p>
          Para adicionar produtos ao carrinho autenque-se{" "}
          <Link to="/login">Clicando aqui</Link>
        </p>
      ) : (
        <div className="d-flex flex-column gap-3">
          {cart.length <= 0 ? (
            <p className="d-flex flex-column text-center border p-2 rounded">
              <span className="fw-bold">Carrinho vazio!!</span>
              <span>
                <Link to="/produtos">Clique aqui</Link> e monte seu carrinho e
                venha ser feliz!
              </span>
            </p>
          ) : (
            cart.map((item: ProductCart) => <ItemCart product={item} />)
          )}
        </div>
      )}
      <button>Comprar mais!!!</button>
    </section>
  );
};

export default Cart;
