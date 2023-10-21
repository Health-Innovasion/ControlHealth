import React, { useState, useEffect } from 'react'
import './Quote.css'
import { getCitas } from '../../redux/action/action'
import { useSelector } from 'react-redux'
import img from '../../Assets/Images/icono-user.png'
import editar from '../../Assets/Images/editar.svg'
import borrar from '../../Assets/Images/borrar.svg'
import { ThemeProvider } from 'styled-components'
import SimpleForm from '../ChatBot/ChatBot'

const Quote = () => {
  const { currentUser } = useSelector((state) => state.user)
  const [citas, setCitas] = useState([])
  const [chatbot, setChatBot] = useState(false)

  const theme = {
    background: '#f5f8fb',
    headerFontColor: '#000000',
    headerFontSize: '24px',
    botBubbleColor: '#008DD8',
    botFontColor: '#ffffff',
    userBubbleColor: '#F7F7F7',
    userFontColor: '#000000',
    botFontSize: '28px',
  }

  useEffect(() => {
    const unsubscribe = getCitas(currentUser.uid, (citasData) => {
      setCitas(citasData)
    })

    return () => {
      unsubscribe()
    }
  }, [currentUser.uid])

  function getStatusClass(status) {
    const statusClasses = {
      'En revisión': 'warning',
      success: 'success',
    }

    return statusClasses[status] || 'error'
  }

  if (citas.length === 0) {
    return <div className="sidebar">No hay citas disponibles.</div>
  }
console.log(citas)
  return (
    <>
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

                <div className="botones">
                  <img src={editar} alt="" />
                  <img src={borrar} alt="" />
                </div>
              </div>
            )
          })}
      </div>
      <button
        href="#"
        class="btn-flotante"
        onClick={() => setChatBot(!chatbot)}
      >
        <span className="fas fa-robot" src={img}></span>
      </button>
      {chatbot ? (
        <div id="chatbot">
          <ThemeProvider theme={theme}>
            <SimpleForm />
          </ThemeProvider>
        </div>
      ) : null}
    </>
  )
}

export default Quote
