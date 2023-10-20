import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { BsCalendar, BsBell, BsFileText, BsPerson } from 'react-icons/bs'; // Importa los iconos de Bootstrap
import './HomeDr.css';
import logo from '../../Assets/Images/logo.png'

function HomeDr() {
  return (
    <Container className="centered-container">
       <img src={logo} alt="Logo" className="logo" />
      <Row className="button-container">
        <Col xs={3}>
          <Button className="option-button">
            <BsCalendar size={30} />
            <br />
            Citas
          </Button>
        </Col>
        <Col xs={3}>
          <Button className="option-button">
            <BsBell size={30} />
            <br />
            Notificaciones
          </Button>
        </Col>
        <Col xs={3}>
          <Button className="option-button">
            <BsFileText size={30} />
            <br />
            Expedientes
          </Button>
        </Col>
        <Col xs={3}>
          <Button className="option-button">
            <BsPerson size={30} />
            <br />
            Cuenta
          </Button>
        </Col>
        <Col xs={3}>
          <Button className="option-button">
            <BsPerson size={30} />
            <br />
            Chat
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default HomeDr;
