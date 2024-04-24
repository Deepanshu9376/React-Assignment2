
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import imageData from "../Assests/10302971.png";
import "./Component.css";

function CardComp(props) {
  const { name, email, contact, gender, category, technologies } = props;

  return (
    <Row xs={2} md={1} className="g-4">
      {Array.from({ length: 1 }).map((_, idx) => (
        <Col key={idx}>
          <Card>
            <div className="imag-parent">
              <img src={imageData} className="imag" alt="vjvj" />
            </div>
            <Card.Body>
              <Card.Title className="texture">User</Card.Title>
              <div>
                <strong>Name:-</strong>
                {name}
              </div>
              <div>
                <strong>Contact:</strong>
                {contact}
              </div>
              <div className="col">
                <strong>Email:</strong> {email}
              </div>
              <div className="col">
                <strong>Gender:</strong> {gender}
              </div>
              <div className="col">
                <strong>Category:</strong> {category}
              </div>
              <div className="col">
                <strong>Technologies:</strong> {technologies}
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default CardComp;