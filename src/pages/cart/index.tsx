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
        <div
          className={`d-flex flex-row flex-wrap gap-4 justify-content-center ${
            cart.length > 0 && "bg-secondary"
          } p-3 rounded w-100`}
          style={{ maxWidth: "900px" }}
        >
          <div
            className="d-flex flex-column ps-3 pe-3"
            style={{ height: "66dvh", overflowY: "auto" }}
          >
            {cart.length === 0 ? (
              <p className="d-flex flex-column text-center">
                <span className="fw-bold">Carrinho vazio!!</span>
                <span>
                  <Link to="/produtos">Clique aqui</Link> e monte seu carrinho e
                  venha ser feliz!
                </span>
              </p>
            ) : (
              <div className="d-flex flex-column gap-3">
                <h4 className="text-center text-light">Produtos</h4>
                {cart.map((item: ProductCart) => (
                  <ItemCart product={item} />
                ))}
              </div>
            )}
          </div>
          {cart.length > 0 && (
            <div
              className="bg-light rounded ps-3 pt-2 pb-3 pe-3"
              style={{ flex: "1", flexBasis: "300px", height: "fit-content" }}
            >
              <h5 className="text-center">Detalhes</h5>
              <ul className="bg-secondary p-2 rounded text-white ">
                <li className="d-flex justify-content-between fw-bold text-center">
                  <span style={{ width: "100px" }}>Nome:</span>
                  <span style={{ width: "80px" }}>Quantidade:</span>
                  <span style={{ width: "80px" }}>Valor:</span>
                </li>
                {cart.map((item: ProductCart) => (
                  <li
                    className="d-flex justify-content-between text-center align-items-center"
                    key={item._id}
                  >
                    <span style={{ width: "100px" }}>{item.name}</span>
                    <span style={{ width: "80px" }}>{item.quantity}</span>
                    <span style={{ width: "80px" }}>
                      {item.value.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                  </li>
                ))}
              </ul>
              <h5 className="text-center">Resumo</h5>
              <div className="bg-secondary p-2 rounded text-white d-flex flex-column justify-content-center align-items-center">
                <p style={{ fontSize: "1.3rem" }}>
                  <span className="fw-bold me-2">Total:</span>
                  <span>
                    {cart
                      .reduce(
                        (acc, produto) =>
                          acc + parseInt(produto.quantity) * produto.value,
                        0
                      )
                      .toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                  </span>
                </p>
                <button title="Em construção!!" className="btn btn-light w-100">
                  Finalizar compra!
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Cart;
