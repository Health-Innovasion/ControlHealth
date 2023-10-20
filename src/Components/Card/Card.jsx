import React from 'react';
import { Card, Button } from 'react-bootstrap';

const CustomCard = ({ title, content, image, buttonText, buttonOnClick }) => {
  return (
    <Card>
      <Card.Body>
        {title && <Card.Title>{title}</Card.Title>} {/* Mostrar el título si está presente */}
          <Button variant="primary" >
            jjhjhjh
          </Button>

      </Card.Body>
    </Card>
  );
};

export default CustomCard;
