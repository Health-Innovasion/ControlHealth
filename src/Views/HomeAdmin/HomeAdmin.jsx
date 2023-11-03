import React from 'react';
import { Container, Row } from 'react-bootstrap';
import './HomeAdmin.css'; // Asegúrate de tener un archivo CSS adecuado para HomeAdmin
import logo from '../../Assets/Images/logo.png';
import doctor from '../../Assets/Images/doctor.png';
import expedient from '../../Assets/Images/expedient.png';
import user from '../../Assets/Images/user.png';
import cerrar from '../../Assets/Images/cerrar.png'
import { OptionButton } from '../../Components/OptionButton/OptionButton';

function HomeAdmin() {
  return (
    <div className="fullAdmin-screen-container">
      <Container className="admin-container">
        <Row className="button-admin-container">
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo-admin" />
          </div>
          {/* Botones de opción modificados para HomeAdmin */}
          <OptionButton image={expedient} text="Estadisticas" to="/citasdr" />
          <OptionButton image={doctor} text="Médicos" to="/notificaciones" />
          <OptionButton image={user} text="Usuarios" to="/expedientes" />
          <OptionButton image={cerrar} text="Cerrar Sesion " to="/expedientes" />
        </Row>
      </Container>
    </div>
  );
}

export default HomeAdmin;
