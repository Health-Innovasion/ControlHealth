import React, { useEffect, useState } from 'react';
import { statusQuotes,statusDoctor } from '../../Utils/constants';
import './Admindoctors.css';
import { GetDoctorsAdmin, actualizarValidatedDoctor } from '../../redux/action/DoctorAction';
import logo from '../../Assets/Images/logo.png';
import Modal from 'react-modal';
import Dropdown from '../../Components/Dropdown/Dropdown';
import { IoIosCloseCircle } from 'react-icons/io';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Button } from 'react-bootstrap';
import { AiOutlineArrowLeft } from 'react-icons/ai';

const Admindoctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const unsubscribe = GetDoctorsAdmin((dataArray) => {
                    setDoctors(dataArray);
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
            [statusQuotes.inReview]: 'in-review',
            [statusQuotes.approved]: 'approved',
            [statusQuotes.postponed]: 'postponed',
        };

        return statusClasses[status] || 'error';
    }

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleStatusChange = (event, doctorId) => {
        actualizarValidatedDoctor(doctorId, event.target.value).then((res) => {
            console.log(res); 
        })
    };

    return (
        <>
        <div className=' container-doctor'>
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
                <div className="mb-3">
                    <button className="btn btn-primary" onClick={openModal}>
                        Verificacion MINSA
                    </button>
                </div>
                <div className="table-responsive">
                    <table className="table">
                        <thead className="table">
                            <tr className="color-titulo">
                                <th className="bg-primary text-white">Doctor</th>
                                <th className="bg-primary text-white">Email</th>
                                <th className="bg-primary text-white">Estado</th>
                                <th className="bg-primary text-white">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {doctors?.map((doctor, index) => (
                                <tr key={index}>
                                    <td>{doctor.userName}</td>
                                    <td>{doctor.email}</td>
                                    <td className={`status-color ${getStatusClass(doctor.validated)}`}>
                                        {doctor.validated}
                                    </td>
                                    <td>
                                        <select
                                            className="custom-select"
                                            value={doctor.validated}
                                            onChange={(e) => handleStatusChange(e, doctor.id)}
                                        >
                                            {Object.values(statusDoctor).map((value, index) => (
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

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Ejemplo Modal"
                className="custom-modal-admin"
            >
                <div className="modal-header">
                    <h3>Verificacion del MINSA</h3>

                    <IoIosCloseCircle className="admin-close-icon" onClick={closeModal} />
                </div>
                <iframe title="Google" src="https://karplus.minsa.net.ni/kp-public/profesionales/consulta/index.xhtml" width="100%" height="400"></iframe>
            </Modal>
        </>
    );
};

export default Admindoctors;
