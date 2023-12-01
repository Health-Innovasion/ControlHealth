import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Form, Button, Modal } from 'react-bootstrap';
import { IoIosAddCircle, IoIosCloseCircle } from 'react-icons/io';
import { combineMedicationData, createMedication } from '../../redux/action/action';
import './FormMedication.css';
import Swal from 'sweetalert';
import tonoMensaje from '../../Assets/tono-mensaje-3-.mp3';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  nombreMedicamento: Yup.string().required('Campo requerido'),
  dosificacion: Yup.number().required('Campo requerido'),
  unidades: Yup.string().required('Campo requerido'),
  tomasDelDia: Yup.number().required('Campo requerido'),
  fechadeinicio: Yup.date().required('Campo requerido'),
  fechafinal: Yup.date().min(Yup.ref('fechadeinicio'), 'Fecha de finalización debe ser posterior a la de inicio'),
  hora: Yup.string().required('Campo requerido'),
});

const FormMedication = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [isFormModalOpen, setIsFormModalOpen] = React.useState(false);

  const openFormModal = () => {
    setIsFormModalOpen(true);
  };

  const closeFormModal = () => {
    setIsFormModalOpen(false);
  };

  const handleSubmit = async (values, { resetForm }) => {
    if (new Date(values.fechafinal) < new Date(values.fechadeinicio)) {
      Swal({
        title: 'Error',
        text: 'La fecha de finalización no puede ser menor que la fecha de inicio.',
        confirmButtonColor: '#007BFF',
      });
      return;
    }

    const data = combineMedicationData(values, currentUser.uid);

    await createMedication(data);

    resetForm();

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
    scheduleNotification(values);
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
        scrollable
      >
        <Modal.Header className="formmedication-modal-header">
          <Modal.Title className="formmedication-modal-title">Agregar Medicamento</Modal.Title>
          <IoIosCloseCircle className="formmedication-close-icon" onClick={closeFormModal} />
        </Modal.Header>

        <Modal.Body>
          <Formik
            initialValues={{
              nombreMedicamento: '',
              dosificacion: '',
              unidades: '',
              tomasDelDia: '',
              fechadeinicio: '',
              fechafinal: '',
              hora: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit, handleChange, values }) => (
              <Form id="myForm" onSubmit={handleSubmit} className="formmedication-modal-body">
                <Form.Group controlId="nombreMedicamento">
                  <Form.Label className="formmedication-form-label">Nombre del Medicamento</Form.Label>
                  <Field
                    type="text"
                    placeholder="Nombre del Medicamento"
                    name="nombreMedicamento"
                    as={Form.Control}
                  />
                  <ErrorMessage name="nombreMedicamento" component="div" className="error-message" />
                </Form.Group>
                <Form.Group controlId="dosificacion">
                  <Form.Label className="formmedication-form-label">Dosificación</Form.Label>
                  <Field
                    type="number"
                    placeholder="Dosificación"
                    name="dosificacion"
                    as={Form.Control}
                  />
                  <ErrorMessage name="dosificacion" component="div" className="error-message" />
                </Form.Group>
                <Form.Group controlId="unidades">
                  <Form.Label className="formmedication-form-label">Unidades</Form.Label>
                  <Form.Control
                    as="select"
                    name="unidades"
                    value={values.unidades}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Seleccionar Unidad</option>
                    <option value="mg">mg</option>
                    <option value="ml">ml</option>
                  </Form.Control>
                  <ErrorMessage name="unidades" component="div" className="error-message" />
                </Form.Group>
                <Form.Group controlId="tomasDelDia">
                  <Form.Label className="formmedication-form-label">Tomas al Día</Form.Label>
                  <Field
                    type="number"
                    placeholder="Tomas al Día"
                    name="tomasDelDia"
                    as={Form.Control}
                  />
                  <ErrorMessage name="tomasDelDia" component="div" className="error-message" />
                </Form.Group>
                <Form.Group controlId="fechadeinicio">
                  <Form.Label className="formmedication-form-label">Fecha de Inicio</Form.Label>
                  <Field
                    type="date"
                    name="fechadeinicio"
                    as={Form.Control}
                  />
                  <ErrorMessage name="fechadeinicio" component="div" className="error-message" />
                </Form.Group>
                <Form.Group controlId="fechafinal">
                  <Form.Label className="formmedication-form-label">Fecha de finalización</Form.Label>
                  <Field
                    type="date"
                    name="fechafinal"
                    as={Form.Control}
                  />
                  <ErrorMessage name="fechafinal" component="div" className="error-message" />
                </Form.Group>
                <Form.Group controlId="hora">
                  <Form.Label className="formmedication-form-label">Hora</Form.Label>
                  <Field
                    type="time"
                    name="hora"
                    as={Form.Control}
                  />
                  <ErrorMessage name="hora" component="div" className="error-message" />
                </Form.Group>
              </Form>
            )}
          </Formik>
        </Modal.Body>

        <Modal.Footer className="formmedication-modal-footer">
          <Button type="submit" form="myForm" className="formmedication-save-btn">
            Agregar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default FormMedication;