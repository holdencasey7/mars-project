import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Figure from "react-bootstrap/Figure";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useNavigate } from "react-router-dom";

function Gallery() {
  const { sol } = useParams();
  const MAX_SOL_VALUE = 9999999999;
  const navigate = useNavigate();
  const [imageJsonArray, setImageJsonArray] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(
    () => async () => {
      async function getImageJson() {
        try {
          const imageApiResponse = await axios
            .get(`/api/images/json/${sol}`)
            .then((res) => {
              setImageJsonArray(res.data.image_json_array);
            });
        } catch (e) {
          console.error(e);
        }
      }
      await getImageJson();
      setLoaded(true);
    },
    []
  );

  const onPrevSolClick = () => {
    if (!(parseInt(sol) <= 0)) {
      setLoaded(false);
      navigate(`/gallery/${parseInt(sol) - 1}`);
      navigate(0);
    }
  };

  const onNextSolClick = () => {
    if (!(parseInt(sol) >= MAX_SOL_VALUE)) {
      setLoaded(false);
      navigate(`/gallery/${parseInt(sol) + 1}`);
      navigate(0);
    }
  };

  const onGalleryHomepageClick = () => {
    navigate("/gallery");
  };

  const galleryImages =
    imageJsonArray.length < 1 ? (
      <b className="ms-3">Sorry, no images on Sol {sol}</b>
    ) : (
      <Container fluid>
        <Row>
          <Col>
            {imageJsonArray.map((imageJson) => (
              <Figure key={imageJson.id} className="ms-2 me-2 mb-2">
                <Figure.Image
                  width={300}
                  height={300}
                  alt="Mars Rover Capture"
                  src={imageJson.img_src}
                />
                <Figure.Caption>
                  Taken on {imageJson.earth_date} by the {imageJson.rover.name}
                  's {imageJson.camera.full_name}
                </Figure.Caption>
              </Figure>
            ))}
          </Col>
        </Row>
      </Container>
    );

  return (
    <>
      <ButtonGroup className="ms-3 mt-3 mb-2" aria-label="Sol Nav Buttons">
        <Button
          key="prevSolButton"
          variant="outline-secondary"
          onClick={onPrevSolClick}
        >
          ...Previous Sol
        </Button>
        <Button
          key="homeSolButton"
          variant="outline-secondary"
          onClick={onGalleryHomepageClick}
        >
          Gallery Homepage
        </Button>
        <Button
          key="nextSolButton"
          variant="outline-secondary"
          onClick={onNextSolClick}
        >
          Next Sol...
        </Button>
      </ButtonGroup>

      <h3 className="ms-3">Image Gallery for Sol {sol}</h3>
      {loaded ? (
        galleryImages
      ) : (
        <Spinner className="ms-3 mt-3" animation="border" />
      )}
    </>
  );
}

export default Gallery;
