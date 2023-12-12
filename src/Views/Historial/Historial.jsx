import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { FaSpinner } from 'react-icons/fa';
import { BsFileText } from 'react-icons/bs'; // Importa el icono de archivo de texto
import Dropdown from '../../Components/Dropdown/Dropdown';
import logo from '../../Assets/Images/logo.png';
import { getCitasdr } from '../../redux/action/action';
import { useSelector } from 'react-redux';


const Historial = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser.uid);
  const [isLoadingQuotes, setIsLoadingQuotes] = useState(true);
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    const unsubscribe = getCitasdr(currentUser.uid, (citas) => {
      console.log('Citas obtenidas:', citas);
      setCitas(citas);
      setIsLoadingQuotes(false);
    });

    return () => unsubscribe();
  }, [currentUser.uid]);

 
  return (
    <>
      <div className='container-user'>
        <div className="navbar">
          <Link to="/homeAdmin">
            <Button variant="primary" style={{ marginTop: '5px', marginLeft:'5px' }}>
              <AiOutlineArrowLeft />
            </Button>
          </Link>
          <Dropdown />
        </div>
      </div>
      <div className="container-oficial">
        <img src={logo} alt="Logo" className="logo-admin" />
        <h2 className="display-4">Bienvenido a tu vista administrativa</h2>
        <div className="table-responsive">
          <table className="table">
            <thead className="table">
              <tr className="color-titulo">
                <th className="bg-primary text-white">Paciente</th>
                <th className="bg-primary text-white">Fecha de la cita</th>
                <th className="bg-primary text-white">Hora de la cita</th>
                <th className="bg-primary text-white">Tipo de Diabetes</th>
                <th className="bg-primary text-white">Acción</th>
              </tr>
            </thead>
            <tbody>
              {isLoadingQuotes ? (
                <tr>
                  <td colSpan="5" className="text-center align-middle">
                    <FaSpinner size={80} className="spinner quotes" color="#008DD8"></FaSpinner>
                  </td>
                </tr>
              ) : citas?.length ? (
                citas.map((cita, index) => {
                  // Agregar condición para mostrar solo citas aprobadas
                  if (cita.data.data.status === "Aprobada") {
                    return (
                      <tr key={index}>
                        <td>{cita.data.data.cita.name}</td>
                        <td>{cita.data.data.cita.date}</td>
                        <td>{cita.data.data.cita.time}</td>
                        <td>{cita.data.data.cita.typeDiabetes}</td>
                        <td>

                       
                          <Link className='btn btn-outline-info' to={`/expedientform/${cita.id}/${cita.data.data.uid}`}>
                            <BsFileText size={30} className="mr-2" />
                            Crear Expediente
                          </Link>
                        </td>
                      </tr>
                    );
                  } else {
                    // Si la cita no está aprobada, puedes retornar null o un fragmento vacío
                    return null;
                  }
                })
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center' }}>
                    No hay citas disponibles.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Historial;
