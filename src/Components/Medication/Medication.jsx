import React, { useState, useEffect } from 'react';
import { deleteDocument, getMedications } from '../../redux/action/action';
import { useSelector } from 'react-redux';
import pildora from '../../Assets/Images/Pildora.png';
import editar from '../../Assets/Images/editar.svg';
import borrar from '../../Assets/Images/borrar.svg';
import './Medication.css';

const Medication = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [medications, setMedications] = useState([]);

  useEffect(() => {
    const unsubscribe = getMedications(currentUser.uid, (medicationData) => {
      setMedications(medicationData);
    });

    return () => {
      unsubscribe();
    };
  }, [currentUser.uid]);

  const handleDelete = async (id) => {
    await deleteDocument('medications', id);
  };

  // Función para formatear la hora en un formato más natural con AM/PM
  const formatHour = (hour) => {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return new Date(`2000-01-01T${hour}`).toLocaleTimeString([], options);
  };

  return (
    <div className="medication-container">
      {medications.length > 0 ? (
        medications.map((medication, index) => {
          const medicationData = medication.data.data.medication;
          return (
            <div className="quote-card" key={index}>
              <img className="img-doctor-quote" src={pildora} alt="" />

              <div className="col-quote">
                <span className="title-quote">Nombre del Medicamento:</span>
                <span>{medicationData.nombreMedicamento}</span>
              </div>

              <div className="col-quote">
                <span className="title-quote">Dosificación:</span>
                <span>{medicationData.dosificacion}</span>
              </div>

              <div className="col-quote">
                <span className="title-quote">Unidades:</span>
                <span>{medicationData.unidades}</span>
              </div>

              <div className="col-quote">
                <span className="title-quote">Tomas al Día:</span>
                <span>{medicationData.tomasDelDia}</span>
              </div>

              <div className="col-quote">
                <span className="title-quote">Fecha de Inicio:</span>
                <span>{medicationData.fechadeinicio}</span>
              </div>

              <div className="col-quote">
                <span className="title-quote">Hora:</span>
                <span>{formatHour(medicationData.hora)}</span>
              </div>

              <div className="botones">
                <img src={editar} alt="icon-edit" />
                <img src={borrar} alt="icon-delete" onClick={() => handleDelete(medication.id)} />
              </div>
            </div>
          );
        })
      ) : (
        <p>No hay información de medicación disponible.</p>
      )}
    </div>
  );
};

export default Medication;
