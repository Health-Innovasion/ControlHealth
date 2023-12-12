// ExpedienteForm.js
import React, { useState } from 'react';
import { Button, Form, Col, Row, Container } from 'react-bootstrap';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Dropdown from '../../Components/Dropdown/Dropdown';
import { createExpediente, combineExpedienteData } from '../../redux/action/DoctorAction'; // Ajusta la ruta de importación
import { getAuth } from 'firebase/auth'; // Importa getAuth desde firebase/auth
import './Expedient.css';

const ExpedienteForm = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [edad, setEdad] = useState('');
  const [direccion, setDireccion] = useState('');
  const [nivelGlucosa, setNivelGlucosa] = useState('');
  const [tipoDiabetes, setTipoDiabetes] = useState('');
  const [tratamientoActual, setTratamientoActual] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Crea un objeto con los datos del expediente
      const expedienteData = {
        nombre,
        apellido,
        edad,
        direccion,
        nivelGlucosa,
        tipoDiabetes,
        tratamientoActual,
      };

      // Obtiene el uid del usuario actual
      const auth = getAuth();
      const uid = auth.currentUser.uid;


      // Combina los datos del expediente con el uid y el id_paciente
      const expedienteConUid = combineExpedienteData(expedienteData, uid);

      // Llama a la función para crear el expediente en Firebase
      await createExpediente(expedienteConUid);

      console.log('Expediente enviado:', expedienteConUid);
    } catch (error) {
      console.error('Error al enviar el expediente:', error);
    }
  };

  return (
    <div>
      <div className="navbar">
        <Link to="/historial">
          <Button className="back-button" variant="primary">
            <AiOutlineArrowLeft /> Volver
          </Button>
        </Link>
        <Dropdown />
      </div>
      <Container className="expediente-container">
        <h2>Llenar Expediente</h2>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col>
              <Form.Label className="form-label">Nombre del paciente:</Form.Label>
              <Form.Control
                className="form-control"
                type="text"
                size="sm"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Label className="form-label">Apellido del paciente:</Form.Label>
              <Form.Control
                className="form-control"
                type="text"
                size="sm"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Label className="form-label">Edad del paciente:</Form.Label>
              <Form.Control
                className="form-control"
                type="number"
                size="sm"
                value={edad}
                onChange={(e) => setEdad(e.target.value)}
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Label className="form-label">Departamento:</Form.Label>
              <Form.Control
                className="form-control"
                type="text"
                size="sm"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Label className="form-label">Nivel de Glucosa:</Form.Label>
              <Form.Control
                className="form-control"
                type="number"
                size="sm"
                value={nivelGlucosa}
                onChange={(e) => setNivelGlucosa(e.target.value)}
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Label className="form-label">Tipo de Diabetes:</Form.Label>
              <Form.Select
                className="form-control"
                size="sm"
                value={tipoDiabetes}
                onChange={(e) => setTipoDiabetes(e.target.value)}
              >
                <option value="">Seleccionar tipo</option>
                <option value="Tipo 1">Tipo 1</option>
                <option value="Tipo 2">Tipo 2</option>
              </Form.Select>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Label className="form-label">Tratamiento Actual:</Form.Label>
              <Form.Control
                className="form-control"
                as="textarea"
                size="sm"
                value={tratamientoActual}
                onChange={(e) => setTratamientoActual(e.target.value)}
              />
            </Col>
          </Row>
          <Button className="submit-button" variant="primary" type="submit">
            Enviar Expediente
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default ExpedienteForm;
