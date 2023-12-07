import { ProductCart, useCartStore } from "../../store/cartStore";

const ItemCart = ({ product }: { product: ProductCart }) => {
  const { _id, name, value, quantity, photos } = product;
  const { removeFromCart, decrementCartItem, addCart } = useCartStore();
  return (
    <div
      className="d-flex flex-row gap-3 border justify-content-between pb-2 pt-2 ps-4 pe-4 align-items-center rounded bg-light"
      style={{ maxWidth: "450px", position: "relative" }}
    >
      <span
        title="Remover do carrinho"
        className="bg-danger text-white rounded-circle d-flex align-items-center justify-content-center"
        style={{
          position: "absolute",
          width: "25px",
          height: "25px",
          top: -10,
          right: -10,
          cursor: "pointer",
        }}
        onClick={() => removeFromCart(_id)}
      >
        X
      </span>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <h6 className="text-center" style={{ width: "100px" }}>
          <span>{name}</span>
        </h6>
        <img
          className="rounded border"
          style={{ width: "100px", aspectRatio: "1" }}
          src={
            photos
              ? `https://productphotoscatalogo.s3.us-east-2.amazonaws.com/${photos[0].photo}`
              : ""
          }
          alt="Produto sem foto"
        />
      </div>

      <div className="d-flex border rounded justify-content-center align-items-center gap-1">
        <button className="btn" onClick={() => decrementCartItem(_id)}>
          -
        </button>
        <div>{quantity}</div>
        <button className="btn" onClick={() => addCart(product, 1)}>
          +
        </button>
      </div>
      <span>
        {(value * parseInt(quantity)).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </span>
    </div>
  );
};

export default ItemCart;
