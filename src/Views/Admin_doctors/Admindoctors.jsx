import React from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../../Components/NavBar/Navbar'
import { statusQuotes } from '../../Utils/constants'
import './Admindoctors.css'

const Admindoctors = () => {

    const { doctors } = useSelector((state) => state.doctors)

    function getStatusClass(status) {
        const statusClasses = {
            [statusQuotes.inReview]: 'in-review',
            [statusQuotes.approved]: 'approved',
            [statusQuotes.postponed]: 'postponed',
        }

        return statusClasses[status] || 'error'
    }

    return (
        <>


            <Navbar />
            <div className="container">
                <div className="row">
                    <div className="col">
                        <table className="table table-responsive-md table-striped">
                            <thead>
                                <tr>
                                    <th>Doctor</th>
                                    <th>Email</th>
                                    <th>Estado</th>
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
            </div>

        </>
    )
}

export default Admindoctors
