import React, { useState } from 'react';
import './Modal.css';
import { formatearFecha } from '../../Utils/FormatFecha';
import { statusQuotes } from '../../Utils/constants';
import { actualizarCita } from '../../redux/action/DoctorAction';

const Modal = ({ event, onClose }) => {
  const [valueSelected, setValueSelected] = useState('');

  const handleUpdateQuotes = (param) => {
    actualizarCita(event.uid, param, true)
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        console.error("Error al actualizar la cita:", error);
      });
  };
console.log(event)
  return (
    <div className="modal-component">
      <div className="modal-content-component">
        <h2>Detalles de la cita</h2>
        <p>Título: {event.title}</p>
        <p>Tipo de diabetes: {event.Tip_Diabe}</p>
        <p>Descripcion: {event.description}</p>
        <p>Fecha de inicio: {formatearFecha(event.start)}</p>
        <div>
          <label htmlFor="statusSelect">Selecciona un estado:</label>
          <select
            id="statusSelect"
            onChange={(e) => {

              const selectedValue = e.target.value;
              setValueSelected(selectedValue);
              handleUpdateQuotes(selectedValue);
            }}
            value={event.importante}
          >
            {Object.values(statusQuotes).map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default Modal;
