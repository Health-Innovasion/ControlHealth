import React, { useState, useEffect } from 'react';
import './Modal.css';
import { formatearFecha } from '../../Utils/FormatFecha';
import { statusQuotes } from '../../Utils/constants';
import { updateUserAddress } from '../../redux/action/action';
import { actualizarCita } from '../../redux/action/DoctorAction';  // Asegúrate de importar correctamente
import { IoIosCloseCircle } from 'react-icons/io';
import { FaSpinner } from 'react-icons/fa';

const Modal = ({ event, onClose }) => {
  const [tempSelectedValue, setTempSelectedValue] = useState(event.importante);
  const [selectedValue, setSelectedValue] = useState(event.importante);
  const [direccion, setDireccion] = useState(event.direccion || '');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setTempSelectedValue(event.importante);
    setSelectedValue(event.importante);
    setDireccion(event.direccion || '');
  }, [event.importante, event.direccion]);

  const handleUpdateQuotes = async () => {
    try {
      setIsSaving(true);

      // Actualiza la dirección de la cita
      await updateUserAddress(event.uid, direccion);

      // Actualiza otros campos de la cita utilizando actualizarCita
      await actualizarCita(event.uid, tempSelectedValue, true, direccion);

      setSelectedValue(tempSelectedValue);
      onClose();
    } catch (error) {
      console.error("Error al actualizar la cita:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="calendarioModalComponent modal-component">
      <div className="calendarioModalContentComponent modal-content-component">
        <div className="modal-header">
          <h3>Detalles de la cita</h3>
          <IoIosCloseCircle className="icon-calendario" onClick={onClose} />
        </div>
        <p className='titulo-calendario'>Paciente </p>
        {event.title} 
        <p className='titulo-calendario'>Tipo de diabetes</p>
        {event.Tip_Diabe} 
        <p className='titulo-calendario'>Descripcion</p>
        {event.description} 
        <p className='titulo-calendario'>Fecha de la cita</p>
        {formatearFecha(event.start)}
        <div>
          <label className='select-calendario' htmlFor="calendarioStatusSelect">Selecciona un estado:</label>
          <select
            className="calendarioStatusSelect"
            onChange={(e) => {
              const selectedValue = e.target.value;
              setTempSelectedValue(selectedValue);
            }}
            value={tempSelectedValue}
          >
            {Object.values(statusQuotes).map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className='select-calendario' htmlFor="direccionTextarea">Dirección de la cita:</label>
          <textarea className='direccion-textarea'
            id="direccionTextarea"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            placeholder="Ingrese la dirección aquí"
          />
        </div>
        <button className="calendarioGuardarButton" onClick={handleUpdateQuotes}>
          {isSaving ? (
            <FaSpinner className="spinner"></FaSpinner>
          ) : (
            'Guardar'
          )}
        </button>
      </div>
    </div>
  );
};

export default Modal;
