import React from 'react';
import { Card, Button } from 'react-bootstrap';

const CustomCard = ({ title, content, image, buttonText, buttonOnClick }) => {
  return (
    <Card>
      {image && <Card.Img variant="top" src={image} />}
      <Card.Body>
        {title && <Card.Title>{title}</Card.Title>}
        {content && <Card.Text>{content}</Card.Text>}
        {buttonText && (
          <Button variant="primary" onClick={buttonOnClick}>
            {buttonText}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default CustomCard;
