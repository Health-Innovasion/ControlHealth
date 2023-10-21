import { Link} from 'react-router-dom'; 
import { Col} from 'react-bootstrap';

export const OptionButton = ({ image, text, to }) => {
    return (
      <Col xs={6} md={3}>
        <button className="option-button">
          <img src={image} alt={`Ícono de ${text}`} className="icon-doctor" />
          <br />
          <Link to={to}>{text}</Link>
        </button>
      </Col>
    );
  }