import React, { useState, useEffect } from 'react'
import './Quote.css'
import { getCitas } from '../../redux/action/action'
import { useSelector } from 'react-redux'
import img from '../../Assets/Images/icono-user.png'
import editar from '../../Assets/Images/editar.svg'
import borrar from '../../Assets/Images/borrar.svg'
import { ThemeProvider } from 'styled-components'
import SimpleForm from '../ChatBot/ChatBot'
import { FaSpinner } from 'react-icons/fa'
import { statusQuotes } from '../../Utils/constants'
import { deleteDocument } from '../../redux/action/action'


const Quote = () => {
  const { currentUser } = useSelector((state) => state.user)
  const [citas, setCitas] = useState([])
  const [chatbot, setChatBot] = useState(false)
  const [isLoadingQuotes, setIsLoadingQuotes] = useState(false)

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
    const unsubscribe = getCitas(
      currentUser.uid,
      setIsLoadingQuotes,
      (citasData) => {
        setCitas(citasData)
      },
    )

    return () => {
      unsubscribe()
    }
  }, [currentUser.uid])

  function getStatusClass(status) {
    const statusClasses = {
      [statusQuotes.inReview]: 'in-review',
      [statusQuotes.approved]: 'approved',
      [statusQuotes.postponed]: 'postponed',
    }

    return statusClasses[status] || 'error'
  }

  const handledelete = async (id) => {
   await deleteDocument('quotes',id)
  }

  return (
    <>
      <div className="sidebar">
        {isLoadingQuotes ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <FaSpinner
              size={80}
              className="spinner quotes"
              color="#008DD8"
            ></FaSpinner>
          </div>
        ) : citas?.length ? (
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
                  <span>{citaData.time}</span>
                </div>

                <div className="botones">
                  <img src={editar} alt="" />
                  <img src={borrar} alt="icon-borrar" onClick={() => handledelete(cita.id)}/>
                </div>
              </div>
            )
          })
        ) : (
          <div className="sidebar">No hay citas disponibles.</div>
        )}
      </div>
      <button
        href="#"
        className="btn-flotante"
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
