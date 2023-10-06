import React, { useState } from 'react'
import Quote from '../../Components/Quotes/Quote'
import { IoIosAddCircle, IoIosCloseCircle } from 'react-icons/io';
import { Modal, Button, Form} from 'react-bootstrap';
import './Quotes.css'

function Citas() {
  const [showModal, setShowModal] = useState(false);
  const [medicamento, setMedicamento] = useState('');
  return (<>
    <div className='home'>
      <h1>Citas</h1>
      <p>prueba</p>
      <IoIosAddCircle className='icon-add' variant="primary" onClick={() => setShowModal(true)} />
      <div className='containers'>
        <Quote />
      </div>
    </div>

    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header>
        <Modal.Title>Añadir Medicamento</Modal.Title>
        <IoIosCloseCircle
          size={30}
          onClick={() => setShowModal(false)}
          className="close-icon"
        />
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Nombre del Medicamento</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={medicamento} // Utiliza el estado para el valor
              onChange={(e) => setMedicamento(e.target.value)} // Maneja los cambios en el estado
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' className='btn-guardar'>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  </>
  )
}



export default Citas
