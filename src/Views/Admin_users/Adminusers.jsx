import React, { useEffect, useState } from 'react';
import { typeUser } from '../../Utils/constants';
import '../../Views/Admin_doctors/Admindoctors.css';
import './Adminusers.css';
import Dropdown from '../../Components/Dropdown/Dropdown';
import { GetUsersAdmin, actualizarValidatedPatient } from '../../redux/action/UserAction';
import logo from '../../Assets/Images/logo.png';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Button } from 'react-bootstrap';
import { AiOutlineArrowLeft } from 'react-icons/ai';

const Adminusers = () => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const unsubscribe = GetUsersAdmin((dataArray) => {
                    setPatients(dataArray);
                });

                return () => {
                    // Detener la escucha de cambios cuando el componente se desmonta
                    unsubscribe();
                };
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };
        fetchData();
    }, []);

    function getStatusClass(status) {
        const statusClasses = {
            [typeUser.patient]: 'status-patient',
            [typeUser.admin]: 'status-admin',
        };

        return statusClasses[status] || 'status-error';
    }

    const handleStatusChange = (event, patientId) => {
        const newTypeUser = event.target.value;
        actualizarValidatedPatient(patientId, newTypeUser).then((res) => {
            console.log(res);
        });
    };

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
                                <th className="bg-primary text-white">Usuario</th>
                                <th className="bg-primary text-white">Email</th>
                                <th className="bg-primary text-white">Estado</th>
                                <th className="bg-primary text-white">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {patients?.map((patient, index) => (
                                <tr key={index}>
                                    <td>{patient.userName}</td>
                                    <td>{patient.email}</td>
                                    <td className={`status-color ${getStatusClass(patient.typeUser)}`}>
                                        {patient.typeUser}
                                    </td>
                                    <td>
                                        <select
                                            className="custom-select"
                                            value={patient.typeUser}
                                            onChange={(e) => handleStatusChange(e, patient.id)}
                                        >
                                            {Object.values(typeUser).map((value, index) => (
                                                <option key={index} value={value}>
                                                    {value}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Adminusers;
