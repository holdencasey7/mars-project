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
import * as moment from "moment";

function Gallery() {
  const { earthDate } = useParams();
  let earthDateAsMoment = moment(earthDate);
  const MAX_SOL_VALUE = 9999999999;
  const navigate = useNavigate();
  const [imageJsonArray, setImageJsonArray] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(
    () => async () => {
      async function getImageJson() {
        try {
          const imageApiResponse = await axios
            .get(`/api/images/all/json/${earthDate}`)
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

  const onPrevDayClick = () => {
    setLoaded(false);
    earthDateAsMoment.subtract(1, "days");
    let newEarthDate = earthDateAsMoment.format("YYYY-MM-DD");
    navigate(`/gallery/${newEarthDate}`);
    navigate(0);
  };

  const onNextDayClick = () => {
    setLoaded(false);
    earthDateAsMoment.add(1, "days");
    let newEarthDate = earthDateAsMoment.format("YYYY-MM-DD");
    navigate(`/gallery/${newEarthDate}`);
    navigate(0);
  };

  const onGalleryHomepageClick = () => {
    navigate("/gallery");
  };

  const galleryImages =
    imageJsonArray.length < 1 ? (
      <b className="ms-3">Sorry, no images on {earthDate}</b>
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
                  Taken on Mission Sol {imageJson.sol} by the{" "}
                  {imageJson.rover.name}
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
          key="prevDayButton"
          variant="outline-secondary"
          onClick={onPrevDayClick}
        >
          ...Previous Day
        </Button>
        <Button
          key="homeGalleryButton"
          variant="outline-secondary"
          onClick={onGalleryHomepageClick}
        >
          Gallery Homepage
        </Button>
        <Button
          key="nextDayButton"
          variant="outline-secondary"
          onClick={onNextDayClick}
        >
          Next Day...
        </Button>
      </ButtonGroup>

      <h3 className="ms-3">Image Gallery for {earthDate}</h3>
      {loaded ? (
        galleryImages
      ) : (
        <Spinner className="ms-3 mt-3" animation="border" />
      )}
    </>
  );
}

export default Gallery;
