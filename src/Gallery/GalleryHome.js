import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function GalleryHome() {
  const navigate = useNavigate();

  const [sol, setSol] = useState(0);

  const onSolInput = ({ target: { value } }) => {
    if (value >= 0) {
      setSol(value);
    }
  };

  const onSolFormSubmit = (e) => {
    e.preventDefault();
    if (!sol) {
      setSol(0);
    }
    navigate(`/gallery/${sol}`);
  };

  return (
    <>
      <h1 className="ms-3">Gallery</h1>
      <h3 className="ms-3">Pick a Sol</h3>
      <Form className="ms-3" onSubmit={onSolFormSubmit}>
        <Form.Group className="mb-3 me-3" controlId="formSol">
          <Form.Control
            type="number"
            min={0}
            placeholder="Enter Sol..."
            onChange={onSolInput}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          View Sol's Images
        </Button>
      </Form>
    </>
  );
}

export default GalleryHome;
