import React from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import './HomeDr.css';
import logo from '../../Assets/Images/logo.png'
import doctor from '../../Assets/Images/doctor.png'
import notify from '../../Assets/Images/Notify.png'
import expedient from '../../Assets/Images/expedient.png'
import user from '../../Assets/Images/user.png'
import Dropdown from '../../Components/Dropdown/Dropdown'


function HomeDr() {
  return (
  <div className="full-screen-container">
      <div className="navbar">
        <Dropdown />
        <img src={logo} alt="Logo" className="logo-doctor" />
      </div>
    <Container className="centered-container">
      <Row className="button-container">
        <Col xs={6} md={3}>
          <button className="option-button">
            <img src={doctor} alt="Ícono de Doctor" className='icon-doctor'/>
            <br />
            Citas
          </button>
        </Col>
        <Col xs={6} md={3}>
          <button className="option-button">
          <img src={notify} alt="Ícono de Notificaciones" className='icon-doctor'/>
            <br />
            Notificaciones
          </button>
        </Col>
        <Col xs={6} md={3}>
          <button className="option-button">
          <img src={expedient} alt="Ícono de Expedientes" className='icon-doctor'/>
            <br />
            Expedientes
          </button>
        </Col>
        <Col xs={6} md={3}>
          <button className="option-button">
          <img src={user} alt="Ícono de Cuenta" className='icon-doctor'/>
            <br />
            Cuenta
          </button>
        </Col>
      </Row>
    </Container>
  </div>
  );
}

export default HomeDr;
