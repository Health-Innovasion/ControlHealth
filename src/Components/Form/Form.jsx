import React, { useState, useEffect } from 'react';
import './Form.css'; // Asegúrate de que este archivo contenga tus estilos CSS
import { useDispatch, useSelector } from 'react-redux';
import { Container, Form, Row, Col, Button, Modal } from 'react-bootstrap';
import { IoIosAddCircle, IoIosCloseCircle } from 'react-icons/io'; // Importa el ícono IoIosCloseCircle
import { GetDoctors } from '../../redux/action/DoctorAction';
import { combineData, createAppointment } from '../../redux/action/action';

const FormQuotes = () => {
  const dispatch = useDispatch();
  const { doctors } = useSelector((state) => state.doctors);
  const { currentUser } = useSelector((state) => state.user);

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isMedicoSelectModalOpen, setIsMedicoSelectModalOpen] = useState(false);
  const [selectedMedico, setSelectedMedico] = useState(null);
  const [infoForm, setInfoForm] = useState({
    name: '',
    date: '',
    cedula: '',
    numTelef: '',
    Tip_Diabe: '',
    description: '',
  });

  useEffect(() => {
    dispatch(GetDoctors());
  }, [dispatch]);

  const openFormModal = () => {
    setIsFormModalOpen(true);
  };

  const closeFormModal = () => {
    setIsFormModalOpen(false);
  };

  const openMedicoSelectModal = () => {
    setIsMedicoSelectModalOpen(true);
  };

  const closeMedicoSelectModal = () => {
    setIsMedicoSelectModalOpen(false);
  };

  const handleMedicoSelect = (doctor) => {
    const selectedDoctor = doctors.find((m) => m.displayName === doctor);
    setSelectedMedico(selectedDoctor);
    closeMedicoSelectModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const areAllFieldsFilled = Object.values(infoForm).every((value) => value.trim() !== '');

    if (!areAllFieldsFilled) {
      alert('Por favor, complete todos los campos antes de enviar el formulario.');
      return;
    }

    const data = combineData(selectedMedico, infoForm, currentUser.uid);

    await createAppointment(data);

    setInfoForm({
      name: '',
      date: '',
      cedula: '',
      numTelef: '',
      Tip_Diabe: '',
      description: '',
    });

    setSelectedMedico(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfoForm({ ...infoForm, [name]: value });
  };

  return (
    <Container className="formquotes-container">
      <h1 className="formquotes-title">Citas</h1>
      <IoIosAddCircle className="formquotes-icon-add" onClick={openFormModal} />
      <Modal className='formquotes-modal-container' show={isFormModalOpen} onHide={closeFormModal}>
        <Modal.Header className="formquotes-modal-header">
          <Modal.Title className="formquotes-modal-title">Agendar cita</Modal.Title>
          <IoIosCloseCircle className="formquotes-close-icon" onClick={closeFormModal} />
        </Modal.Header>
        <Form onSubmit={handleSubmit} className="formquotes-modal-body">
          <Row>
            <Col>
              <Form.Group controlId="name">
                <Form.Label className="formquotes-form-label">Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nombre"
                  name="name"
                  value={infoForm.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="date">
                <Form.Label className="formquotes-form-label">Fecha de Nacimiento</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={infoForm.date}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="cedula">
                <Form.Label className="formquotes-form-label">Cédula</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Cédula"
                  name="cedula"
                  value={infoForm.cedula}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="numTelef">
                <Form.Label className="formquotes-form-label">Número de Teléfono</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Número de Teléfono"
                  name="numTelef"
                  value={infoForm.numTelef}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="Tip_Diabe">
                <Form.Label className="formquotes-form-label">Tipo de Diabetes</Form.Label>
                <Form.Select
                  name="Tip_Diabe"
                  value={infoForm.Tip_Diabe}
                  onChange={handleChange}
                  required
                >
                  <option value="--selelect">--Seleccionar--</option>
                  <option value="Tipo 1">Tipo 1</option>
                  <option value="Tipo 2">Tipo 2</option>
                  <option value="Otro">Otro</option>
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label className="formquotes-form-label col-mb3">Motivo de la Cita</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="description"
                  value={infoForm.description}
                  onChange={handleChange}
                  placeholder="Ingrese el motivo aquí..."
                />
              </Form.Group>
              <div>
                <Button className="formquotes-doctor-save-btn" variant="primary" onClick={openMedicoSelectModal}>
                  Seleccionar médico
                </Button>
                {selectedMedico && (
                  <div className="formquotes-selected-medico">
                    <h4>Médico seleccionado:</h4>
                    <p>{selectedMedico.displayName}</p>
                  </div>
                )}
              </div>
            </Col>
          </Row>
          <Modal.Footer className="formquotes-modal-footer">
            <Button type="submit" className="formquotes-save-btn">
              Crear Cita
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Primer modal para seleccionar médico */}
      <Modal show={isMedicoSelectModalOpen} onHide={closeMedicoSelectModal}>
        <Modal.Header className="formquotes-modal-header">
          <Modal.Title>Selecciona un médico</Modal.Title>
          <IoIosCloseCircle className="formquotes-close-icon" onClick={closeMedicoSelectModal} />
        </Modal.Header>
        <Modal.Body className='fomquotes-card-body'>
          {doctors?.map((doctor, index) => (
            <div className="formquotes-card" key={index}>
              <h3>{doctor.displayName}</h3>
              <p>{doctor.location}</p>
              <Button className="formquotes-save-btn" variant="primary" onClick={() => handleMedicoSelect(doctor.displayName)}>
                Seleccionar
              </Button>
            </div>
          ))}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default FormQuotes;
