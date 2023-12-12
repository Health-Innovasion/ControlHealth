import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsFileText } from 'react-icons/bs';
import logo from '../../Assets/Images/logo.png';
import { getExpedientesPaciente } from '../../redux/action/UserAction';
import { useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';

const ExpedientesUser = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [expedientes, setExpedientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedExpediente, setSelectedExpediente] = useState(null);

  useEffect(() => {
    const unsubscribe = getExpedientesPaciente(currentUser.uid, (expedientesData) => {
      setExpedientes(expedientesData);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [currentUser]);

  const handleVerExpedienteClick = (expediente) => {
    setSelectedExpediente(expediente);
  };

  return (
    <div className="container-oficial">
      <img src={logo} alt="Logo" className="logo-admin" />
      <h2 className="display-4">Bienvenido a tu vista de Expedientes</h2>

      {loading ? (
        <p>Cargando expedientes...</p>
      ) : (
        <div className="table-responsive">
          <table className="table">
            <thead className="table">
              <tr className="color-titulo">
                <th className="bg-primary text-white">Fecha del expediente</th>
                <th className="bg-primary text-white">Acción</th>
              </tr>
            </thead>
            <tbody>
              {(!expedientes || expedientes.length === 0) ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center' }}>
                    No hay expedientes disponibles.
                  </td>
                </tr>
              ) : (
                expedientes.map((expediente, index) => (
                  <tr key={index}>
                    <td>{expediente.expedienteData.expediente.fecha}</td>

                    <td>
                      {/* Usa el modal de React Bootstrap */}
                      <Button
                        variant="outline-info"
                        onClick={() => handleVerExpedienteClick(expediente)}
                      >
                        <BsFileText size={30} className="mr-2" />
                        Ver Expediente
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal de React Bootstrap */}
      <Modal
  show={selectedExpediente !== null}
  onHide={() => setSelectedExpediente(null)}
  centered
  dialogClassName="modal-custom-style"
>
  <Modal.Header closeButton>
    <Modal.Title>Detalles del Expediente</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {selectedExpediente && (
      <div>
        <p><strong>Nombre:</strong> {selectedExpediente.expedienteData.expediente.nombre}</p>
        <p><strong>Apellido:</strong> {selectedExpediente.expedienteData.expediente.apellido}</p>
        <p><strong>Edad:</strong> {selectedExpediente.expedienteData.expediente.edad}</p>
        <p><strong>Fecha:</strong> {selectedExpediente.expedienteData.expediente.fecha}</p>
        <p><strong>Diagnóstico:</strong> {selectedExpediente.expedienteData.expediente.diagnostico}</p>
        <p><strong>Dirección:</strong> {selectedExpediente.expedienteData.expediente.direccion}</p>
        <p><strong>Nivel de Glucosa:</strong> {selectedExpediente.expedienteData.expediente.nivelGlucosa}</p>
        <p><strong>Tipo de Diabetes:</strong> {selectedExpediente.expedienteData.expediente.tipoDiabetes}</p>
        <p><strong>Tratamiento Actual:</strong> {selectedExpediente.expedienteData.expediente.tratamientoActual}</p>
        <p><strong>Antecedentes:</strong> {selectedExpediente.expedienteData.expediente.antecedentes}</p>
        <p><strong>Examenes Realizados:</strong> {selectedExpediente.expedienteData.expediente.examenesRealizados}</p>
        <p><strong>Motivo de Consulta:</strong> {selectedExpediente.expedienteData.expediente.motivoConsulta}</p>
        <p><strong>Observaciones:</strong> {selectedExpediente.expedienteData.expediente.observaciones}</p>
        {/* Agrega más detalles según tus necesidades */}
      </div>
    )}
  </Modal.Body>
</Modal>
    </div>
  );
};

export default ExpedientesUser;
