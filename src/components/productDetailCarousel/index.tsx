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
      style={{ width: "23rem" }}
      className="ms-3 rounded"
    >
      {Array.isArray(image) ? (
        image.map((photo, i) => (
          <Carousel.Item key={i}>
            <img
              style={{
                width: "23rem",
                aspectRatio: "4/3",
              }}
              className="rounded"
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
