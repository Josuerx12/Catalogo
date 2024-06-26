import Carousel from "react-bootstrap/Carousel";
import { Photo } from "../../interfaces/product/productInterface";

const CarouselProductImages = ({
  image,
}: {
  image: Array<Photo> | undefined;
}) => {
  return (
    <Carousel
      slide={true}
      touch
      variant="dark"
      className="ms-3 rounded carrouselResponsive"
      style={{ aspectRatio: "1", width: "300px" }}
    >
      {Array.isArray(image) ? (
        image.map((photo, i) => (
          <Carousel.Item key={i}>
            <img
              className="carrouselResponsive rounded"
              style={{ aspectRatio: "1", width: "300px" }}
              src={`https://catalogo-product-pic.s3.us-east-2.amazonaws.com/${photo.photo}`}
              alt={photo._id}
            />
          </Carousel.Item>
        ))
      ) : (
        <p>Produto sem foto.</p>
      )}
    </Carousel>
  );
};

export default CarouselProductImages;
