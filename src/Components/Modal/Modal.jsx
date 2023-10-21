import React from 'react';
import './Modal.css';

function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(date).toLocaleDateString('es-ES', options);
}

const Modal = ({ event, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Detalles de la cita</h2>
        <p>Título: {event.title}</p>
        <p>Tipo de diabetes: {event.Tip_Diabe}</p>
        <p>Descripcion: {event.description}</p>
        <p>Fecha de inicio: {formatDate(event.start)}</p>
        <p>Fecha de finalización: {formatDate(event.end)}</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default Modal;
