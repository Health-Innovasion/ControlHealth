import React from 'react';
import { Container, Row } from 'react-bootstrap';
import './HomeAdmin.css';
import logo from '../../Assets/Images/logo.png';
import doctor from '../../Assets/Images/doctor.png';
import expedient from '../../Assets/Images/expedient.png';
import user from '../../Assets/Images/user.png';
import Dropdown from '../../Components/Dropdown/Dropdown';
import { OptionButton } from '../../Components/OptionButton/OptionButton';

function HomeAdmin() {


  return (
    <div className="fullAdmin-screen-container">
      <div className="navbar">
        <Dropdown />
      </div>
      <Container className="admin-container">
        <Row className="button-admin-container">
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo-admin" />
          </div>
          <OptionButton image={expedient} text="Estadisticas" to="/admin" />
          <OptionButton image={doctor} text="Médicos" to="/adminDoctors" />
          <OptionButton image={user} text="Usuarios" to="/adminUsers" />
          {/* Modificar la llamada a la función handleLogout al hacer clic en "Cerrar Sesión" */}
        </Row>
      </Container>
    </div>
  );
}

export default HomeAdmin;
