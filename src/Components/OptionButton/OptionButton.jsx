import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';

export const OptionButton = ({ image, text, to }) => {
  return (
    <Col xs={6} md={3}>
      <Link to={to} className="option-link">
        <button className="option-button">
          <img src={image} alt={`Ícono de ${text}`} className="icon-doctor" />
          <br />
          {text}
        </button>
      </Link>
    </Col>
  );
};
