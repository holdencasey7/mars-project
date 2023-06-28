import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function GalleryHome() {
  const DEFAULT_DATE = "2023-06-27";

  const navigate = useNavigate();

  const [earthDate, setEarthDate] = useState(DEFAULT_DATE);

  const onEarthDateInput = ({ target: { value } }) => {
    setEarthDate(value);
  };

  const onEarthDateFormSubmit = (e) => {
    e.preventDefault();
    console.log(earthDate);
    navigate(`/gallery/${earthDate}`);
  };

  return (
    <>
      <h1 className="ms-3">Gallery</h1>
      <h3 className="ms-3">Pick an Earth Date</h3>
      <Form className="ms-3" onSubmit={onEarthDateFormSubmit}>
        <Form.Group className="mb-3 me-3" controlId="formSol">
          <Form.Control type="date" onChange={onEarthDateInput} />
        </Form.Group>

        <Button variant="primary" type="submit">
          View Images
        </Button>
      </Form>
    </>
  );
}

export default GalleryHome;
