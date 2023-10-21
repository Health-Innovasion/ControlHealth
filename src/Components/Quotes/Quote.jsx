import React, { useState, useEffect } from 'react'
import './Quote.css'
import { getCitas } from '../../redux/action/action'
import { useSelector } from 'react-redux'
import img from '../../Assets/Images/icono-user.png'
import { Col, Row } from 'react-bootstrap'

const Quote = () => {
  const { currentUser } = useSelector((state) => state.user)
  const [citas, setCitas] = useState([])

  useEffect(() => {
    const unsubscribe = getCitas(currentUser.uid, (citasData) => {
      setCitas(citasData)
    })

    return () => {
      // Limpia la suscripción cuando el componente se desmonta
      unsubscribe()
    }
  }, [currentUser.uid])
  function getStatusClass(status) {
    const statusClasses = {
      'En revisión': 'warning',
      'success': 'success',
    };
  
    return statusClasses[status] || 'error';
  }
  

  if (citas.length === 0) {
    return <div className="sidebar">No hay citas disponibles.</div>
  }

  return (
    <div className="sidebar">
      {citas?.length &&
        citas.map((cita, index) => {
          const citaData = cita.data.data.cita
          const status = cita.data.data.status
          return (
            <div className="d-flex quote-card" key={index}>
              <img className="img-doctor-quote" src={img} alt="" />

              <div className="col-quote">
                <span className="title-quote">Doctor:</span>
                <span className="title-quote">Estado:</span>
              </div>
              <div className="col-quote">
                <span>{citaData.doctor.userName}</span>
                <span className={`status-color ${getStatusClass(status)}`}>
                  {status}
                </span>
              </div>
              <div className="col-quote">
                <span className="title-quote">Fecha:</span>

                <span className="title-quote">Hora:</span>
              </div>
              <div className="col-quote">
                <span>{citaData.date}</span>

                <span>{citaData.date}</span>
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default Quote
