import Carousel from "react-bootstrap/Carousel";
import { Photo } from "../../interfaces/product/productInterface";

const CarouselProductImages = ({
  image,
}: {
  image: Array<Photo> | undefined;
}) => {
  return (
    <Carousel
      slide={false}
      touch
      variant="dark"
      style={{ width: "40rem", height: "20rem" }}
      className="mx-auto"
    >
      {Array.isArray(image) ? (
        image.map((photo) => (
          <Carousel.Item className="mx-auto">
            <img
              style={{ width: "40rem", height: "20rem" }}
              src={`https://productphotoscatalogo.s3.us-east-2.amazonaws.com/${photo.photo}`}
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
