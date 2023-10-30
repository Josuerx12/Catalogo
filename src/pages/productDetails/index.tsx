import { useParams } from "react-router-dom";
const ProductDetails = () => {
  const { id } = useParams();
  return <div>ProductDetails - Page - {id}</div>;
};

export default ProductDetails;
