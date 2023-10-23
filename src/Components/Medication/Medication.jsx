import React, { useState, useEffect } from 'react'
import { deleteDocument, getMedications } from '../../redux/action/action'
import { useSelector } from 'react-redux'
import pildora from '../../Assets/Images/Pildora.png'
import editar from '../../Assets/Images/editar.svg'
import borrar from '../../Assets/Images/borrar.svg'


const Medication = () => {
  const { currentUser } = useSelector((state) => state.user)
  const [medications, setMedications] = useState([])


  useEffect(() => {
    const unsubscribe = getMedications(currentUser.uid, (medicationData) => {
      setMedications(medicationData)
    })

    return () => {
      unsubscribe()
    }
  }, [currentUser.uid])

  const handledelete = async (id) => {
    await deleteDocument('medications',id)
   }

  return (
    <>
      <div className="sidebar">
        {medications.length > 0 ? (
          medications.map((medication, index) => {
            const medicationData = medication.data.data.medication
            return (
              <div className="d-flex quote-card" key={index}>
                <img className="img-doctor-quote" src={pildora} alt="" />

                <div className="col-quote">
                  <span className="title-quote">Nombre del Medicamento:</span>
                </div>
                <div className="col-quote">
                  <span>{medicationData.nombreMedicamento}</span>
                </div>

                <div className="col-quote">
                  <span className="title-quote">Dosificación:</span>
                </div>
                <div className="col-quote">
                  <span>{medicationData.dosificacion}</span>
                </div>

                <div className="col-quote">
                  <span className="title-quote">Unidades:</span>
                </div>
                <div className="col-quote">
                  <span>{medicationData.unidades}</span>
                </div>

                <div className="col-quote">
                  <span className="title-quote">Tomas al Día:</span>
                </div>
                <div className="col-quote">
                  <span>{medicationData.tomasDelDia}</span>
                </div>

                <div className="col-quote">
                  <span className="title-quote">Fecha de Inicio:</span>
                </div>
                <div className="col-quote">
                  <span>{medicationData.fechadeinicio}</span>
                </div>

                <div className="col-quote">
                  <span className="title-quote">Hora:</span>
                </div>
                <div className="col-quote">
                  <span>{medicationData.hora}</span>
                </div>

                <div className="botones">
                  <img src={editar} alt="" />
                  <img src={borrar} alt="icon-delete" onClick={()=> handledelete( medication.id)}/>
                </div>
              </div>
            )
          })
        ) : (
          <p>No hay información de medicación disponible.</p>
        )}
      </div>
    </>
  )
}

export default Medication
