import React, { useState} from 'react'
import { useSelector } from 'react-redux'
import { Container, Form,Button, Modal } from 'react-bootstrap'
import { IoIosAddCircle, IoIosCloseCircle } from 'react-icons/io'
import {combineMedicationData, createMedication } from '../../redux/action/action'
import './Form.css' // Asegúrate de que este archivo contenga tus estilos CSS

const FormMedication = () => {
  const { currentUser } = useSelector((state) => state.user)

  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [infoForm, setInfoForm] = useState({
    nombreMedicamento: '',
    dosificacion: '',
    unidades: '',
    tomasDelDia: '',
    fechadeinicio: '',
    hora: '',
  })

  const openFormModal = () => {
    setIsFormModalOpen(true)
  }

  const closeFormModal = () => {
    setIsFormModalOpen(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = combineMedicationData(infoForm, currentUser.uid)

    await createMedication(data)

    setInfoForm({
        nombreMedicamento: '',
        dosificacion: '',
        unidades: '',
        tomasDelDia: '',
        fechadeinicio: '',
        hora: '',
    })

  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfoForm({ ...infoForm, [name]: value });
  };

  return (
    <Container className="formquotes-container">
      <h1 className="formquotes-title">Medicación</h1>
      <IoIosAddCircle className="formquotes-icon-add" onClick={openFormModal} />
      <Modal
        className="formquotes-modal-container"
        show={isFormModalOpen}
        onHide={closeFormModal}
      >
        <Modal.Header className="formquotes-modal-header">
          <Modal.Title className="formquotes-modal-title">Agregar Medicamento</Modal.Title>
          <IoIosCloseCircle className="formquotes-close-icon" onClick={closeFormModal} />
        </Modal.Header>
        <Form onSubmit={handleSubmit} className="formquotes-modal-body">
          <Form.Group controlId="nombreMedicamento">
            <Form.Label className="formquotes-form-label">Nombre del Medicamento</Form.Label>
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
            <Form.Label className="formquotes-form-label">Dosificación</Form.Label>
            <Form.Control
              type="text"
              placeholder="Dosificación"
              name="dosificacion"
              value={infoForm.dosificacion}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="unidades">
            <Form.Label className="formquotes-form-label">Unidades</Form.Label>
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
            <Form.Label className="formquotes-form-label">Tomas al Día</Form.Label>
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
            <Form.Label className="formquotes-form-label">Fecha de Inicio</Form.Label>
            <Form.Control
              type="date"
              name="fechadeinicio"
              value={infoForm.fechadeinicio}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="hora">
            <Form.Label className="formquotes-form-label">Hora</Form.Label>
            <Form.Control
              type="time"
              name="hora"
              value={infoForm.hora}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Modal.Footer className="formquotes-modal-footer">
            <Button type="submit" className="formquotes-save-btn">
              Agregar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default FormMedication
