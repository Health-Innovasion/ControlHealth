import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Form, Button, Modal } from 'react-bootstrap';
import { IoIosAddCircle, IoIosCloseCircle } from 'react-icons/io';
import { combineMedicationData, createMedication } from '../../redux/action/action';
import './FormMedication.css';
import Swal from 'sweetalert';
import tonoMensaje from '../../Assets/tono-mensaje-3-.mp3';

const FormMedication = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [infoForm, setInfoForm] = useState({
    nombreMedicamento: '',
    dosificacion: '',
    unidades: '',
    tomasDelDia: '',
    fechadeinicio: '',
    fechafinal: '',
    hora: '',
  });

  const openFormModal = () => {
    setIsFormModalOpen(true);
  };

  const closeFormModal = () => {
    setIsFormModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = combineMedicationData(infoForm, currentUser.uid);

    await createMedication(data);

    setInfoForm({
      nombreMedicamento: '',
      dosificacion: '',
      unidades: '',
      tomasDelDia: '',
      fechadeinicio: '',
      fechafinal: '',
      hora: '',
    });

    // Cierra el modal después de agregar
    closeFormModal();

    // Muestra una notificación de éxito con SweetAlert
    Swal({
      title: 'Medicamento agregado',
      text: 'La medicación ha sido agregada con éxito.',
      customClass: {
        title: 'small-title',
        content: 'small-content',
        confirmButton: 'small-button',
      },
    });

    // Programa la notificación en la hora especificada
    scheduleNotification(infoForm);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfoForm({ ...infoForm, [name]: value });
  };

  const playNotificationSound = () => {
    const audio = new Audio(tonoMensaje);
    audio.play();
  };

  const scheduleNotification = (medicationData) => {
    const { nombreMedicamento, hora, fechafinal } = medicationData;
    const [hour, minute] = hora.split(':');
    const now = new Date();
    const notificationTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      parseInt(hour),
      parseInt(minute)
    );

    // Parse fechafinal to a Date object
    const finalDate = new Date(fechafinal);

    if (notificationTime > now) {
      setTimeout(() => {
        Swal({
          title: 'Recordatorio',
          text: `Es hora de tomar ${nombreMedicamento}`,
          customClass: {
            title: 'small-title',
            content: 'small-content',
            confirmButton: 'small-button',
          },
        });

        // Reproduce el sonido de notificación
        playNotificationSound();
      }, notificationTime - now);
    } else if (now <= finalDate) {
      Swal({
        title: 'Recordatorio',
        text: `Ya ha culminado su medicamento: ${nombreMedicamento}`,
        customClass: {
          title: 'small-title',
          content: 'small-content',
          confirmButton: 'small-button',
        },
      });
    }
  };

  return (
    <Container className="formedication-container">
      <div className="formmedication-title">
        <h1>Medicación</h1>
        <IoIosAddCircle className="formmedication-icon-add" onClick={openFormModal} />
      </div>

      <Modal
        className="formedication-modal-container"
        show={isFormModalOpen}
        onHide={closeFormModal}
      >
        <Modal.Header className="formmedication-modal-header">
          <Modal.Title className="formmedication-modal-title">Agregar Medicamento</Modal.Title>
          <IoIosCloseCircle className="formmedication-close-icon" onClick={closeFormModal} />
        </Modal.Header>
        <Form onSubmit={handleSubmit} className="formmedication-modal-body">
          <Form.Group controlId="nombreMedicamento">
            <Form.Label className="formmedication-form-label">Nombre del Medicamento</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre del Medicamento"
              name="nombreMedicamento"
              value={infoForm.nombreMedicamento}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="dosificacion">
            <Form.Label className="formmedication-form-label">Dosificación</Form.Label>
            <Form.Control
              type="text"
              placeholder="mg"
              name="dosificacion"
              value={infoForm.dosificacion}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="unidades">
            <Form.Label className="formmedication-form-label">Unidades</Form.Label>
            <Form.Control
              type="text"
              placeholder="Unidades"
              name="unidades"
              value={infoForm.unidades}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="tomasDelDia">
            <Form.Label className="formmedication-form-label">Tomas al Día</Form.Label>
            <Form.Control
              type="text"
              placeholder="Tomas al Día"
              name="tomasDelDia"
              value={infoForm.tomasDelDia}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="fechadeinicio">
            <Form.Label className="formmedication-form-label">Fecha de Inicio</Form.Label>
            <Form.Control
              type="date"
              name="fechadeinicio"
              value={infoForm.fechadeinicio}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="fechafinal">
            <Form.Label className="formmedication-form-label">Fecha de finalización</Form.Label>
            <Form.Control
              type="date"
              name="fechafinal"
              value={infoForm.fechafinal}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="hora">
            <Form.Label className="formmedication-form-label">Hora</Form.Label>
            <Form.Control
              type="time"
              name="hora"
              value={infoForm.hora}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Modal.Footer className="formmedication-modal-footer">
            <Button type="submit" className="formmedication-save-btn">
              Agregar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default FormMedication;
