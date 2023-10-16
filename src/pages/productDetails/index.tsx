import { useParams } from "react-router-dom";
const ProductDetails = () => {
  const { id } = useParams();
  return <div>ProductDetails - Page</div>;
};

export default ProductDetails;
