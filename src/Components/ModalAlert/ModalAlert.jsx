import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const ModalAlert = ({
  modalOpen,
  setModalOpen,
  message,
  title,
  isButton,
  handleButton,
  textButton,
}) => {
  return (
    <Modal show={modalOpen} onHide={() => setModalOpen(false)} animation={true}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        {isButton && (
          <Button variant="primary" onClick={handleButton}>
            {textButton}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  )
}

export default ModalAlert
