import { Product } from "../../../../interfaces/product/productInterface";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useRef } from "react";
import { useAdminProducts } from "../../../../hooks/useAdminProducts/useAdminProducts";
import { useMutation, useQueryClient } from "react-query";
// import { useFetchProducts } from "../../../../hooks/useFetchProducts/useFetchProducts";
import { toast } from "react-toastify";

type props = {
  show: boolean;
  handleShow: () => void;
  product: Product;
};
const avaiableUnits = ["UN", "KG", "TON", "M"];
const AdminEditProductModal = ({ show, handleShow, product }: props) => {
  const formRef = useRef<HTMLFormElement | null>(null);

  const query = useQueryClient();

  const { editProduct, deleteImageProduct } = useAdminProducts();

  const { mutateAsync, isLoading } = useMutation(
    ["editAProduct"],
    editProduct,
    {
      onSuccess: () =>
        Promise.all([
          query.invalidateQueries("products"),
          handleShow(),
          toast.success(`Produto id: ${product._id}, editado com sucesso!`),
        ]),
    }
  );
  const { mutateAsync: deletePhoto, isLoading: isDeleting } = useMutation(
    ["deleteProductPhoto"],
    deleteImageProduct,
    {
      onSuccess: () => {
        query.invalidateQueries("products");
        toast.success("Foto deletada com sucesso!");
      },
    }
  );

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    await mutateAsync({ id: product._id, formDataProduct: formData });
  };

  return (
    <Modal show={show} onHide={handleShow} size="xl" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Editando produto Id: {product._id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleEditSubmit} ref={formRef}>
          <h5 className="text-center">Fotos do Produto</h5>
          <div className="d-flex gap-4 justify-content-start align-items-center border p-3 mb-4 flex-nowrap overflow-auto">
            {product && product.photos.length > 0 ? (
              product.photos.map((photo) => (
                <div
                  className="d-flex flex-column gap-3 border p-3 rounded"
                  key={photo._id}
                >
                  <img
                    className="rounded shadow bg-body"
                    style={{
                      width: "12rem",
                      height: "12rem",
                    }}
                    src={`https://catalogo-product-pic.s3.us-east-2.amazonaws.com/${photo.photo}`}
                    alt={photo.photo}
                  />
                  <Button
                    onClick={async () =>
                      await deletePhoto({
                        productID: product._id,
                        photoID: photo._id,
                      })
                    }
                    variant={isDeleting ? "danger" : "outline-danger"}
                    disabled={isDeleting}
                    size="sm"
                  >
                    {isDeleting ? "Deletando" : "Deletar"}
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-danger">Produto sem foto</p>
            )}
          </div>
          <Form.Group className="mb-3">
            <Form.Label>Adicione novas fotos ao seu produto:</Form.Label>
            <Form.Control
              type="file"
              name="product-pics"
              multiple={true}
              accept="image/*"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nome do Produto:</Form.Label>
            <Form.Control
              defaultValue={product?.name}
              name="name"
              type="text"
              required
              placeholder="Adicione um nome para o novo produto."
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Categoria do produto:</Form.Label>
            <Form.Control
              name="category"
              type="text"
              defaultValue={product?.category}
              required
              placeholder="Adicione uma categoria para o novo produto."
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Quantidade:</Form.Label>
            <Form.Control
              name="stock"
              type="string"
              required
              pattern="^[1-9]\d*$"
              defaultValue={product?.stock}
              placeholder="Quatidade de produto em estoque"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Unidade de Medida do Produto:</Form.Label>
            <Form.Select required name="unit" defaultValue={product?.unit}>
              <option value="">Selecione uma medida</option>
              {avaiableUnits.map((option, index) => (
                <option key={index} value={option}>
                  {option.toLowerCase()}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3 d-flex flex-column">
            <Form.Label>Descrição do Produto:</Form.Label>
            <Form.Control
              name="description"
              as="textarea"
              defaultValue={product?.description}
              rows={4}
              aria-label="With textarea"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" disabled={isLoading} onClick={handleShow}>
          Cancelar
        </Button>
        <Button
          onClick={() => formRef.current?.requestSubmit()}
          disabled={isLoading}
          className={isLoading ? "btn btn-warning" : "btn btn-success"}
        >
          {isLoading ? "Editando Produto" : "Editar Produto"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AdminEditProductModal;
