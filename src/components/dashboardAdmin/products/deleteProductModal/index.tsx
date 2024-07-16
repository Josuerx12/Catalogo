import { Product } from "../../../../interfaces/product/productInterface";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useMutation, useQueryClient } from "react-query";
import { useAdminProducts } from "../../../../hooks/useAdminProducts/useAdminProducts";
import { toast } from "react-toastify";

type props = {
  show: boolean;
  handleShow: () => void;
  product: Product;
};

const AdminDeleteProductModal = ({ show, handleShow, product }: props) => {
  const { deleteProduct } = useAdminProducts();

  const query = useQueryClient();

  const { mutateAsync, isLoading } = useMutation(
    ["deleteProduct-" + product._id],
    deleteProduct,
    {
      onSuccess: () =>
        Promise.all([
          query.invalidateQueries("products"),
          toast.success(`Produto ID: ${product._id} deletado com sucesso!`),
        ]),
    }
  );

  return (
    <Modal show={show} onHide={handleShow} size="xl" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Deletar Produto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Tem certeza que deseja deletar o produto?</p>
        <p>
          nome: <b>{product.name}</b>
        </p>
        <p>
          ID: <b> {product._id}</b>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" disabled={isLoading} onClick={handleShow}>
          Cancelar
        </Button>
        <Button
          onClick={async () => await mutateAsync(product._id)}
          disabled={isLoading}
          className={isLoading ? "btn btn-warning" : "btn btn-success"}
        >
          {isLoading ? "Deletando Produto" : "Deletar Produto"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AdminDeleteProductModal;
