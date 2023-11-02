import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../../Components/NavBar/Navbar';
import { statusQuotes } from '../../Utils/constants';
import './Admindoctors.css'
import logo from '../../Assets/Images/logo.png'

const Admindoctors = () => {
    const { doctors } = useSelector((state) => state.doctors);

    function getStatusClass(status) {
        const statusClasses = {
            [statusQuotes.inReview]: 'in-review',
            [statusQuotes.approved]: 'approved',
            [statusQuotes.postponed]: 'postponed',
        };

        return statusClasses[status] || 'error';
    }

    return (
        <>
            <Navbar />
            <div className="container-oficial">
            <img src={logo} alt="Logo" className="logo-admin" />
                <h2 className="display-4">Bienvenido a tu vista administrativa</h2>
                <div className="table-responsive">
                    <table className="table">
                        <thead className="table">
                            <tr className='color-titulo' >
                                <th className="bg-primary text-white">Doctor</th>
                                <th className="bg-primary text-white">Email</th>
                                <th className="bg-primary text-white">Estado</th>
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
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Admindoctors;
