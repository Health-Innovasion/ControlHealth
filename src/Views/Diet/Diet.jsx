import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './Diet.css'
import { Bot } from '../../Components/ChatBot/Bot'


import { DietData } from '../../Utils/DietData'

function Diet() {
  const [selectedItem, setSelectedItem] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)

  const getCategoryItems = () => {
    if (selectedCategory === null) {
      return DietData.flatMap((category) => category.items)
    }
    const category = DietData.find(
      (category) => category.id === selectedCategory,
    )
    return category ? category.items : []
  }

  const handleCardClick = (itemIndex) => {
    setSelectedItem(itemIndex)
  }

  const closeModal = () => {
    setSelectedItem(null)
  }

  return (
    <div className="diet-container">
      <h2>Alimenta tu bienestar, Elige lo saludable</h2>

      <div className="filter-buttons">
        <Button
          variant="outline-primary"
          onClick={() => setSelectedCategory(null)}
          className={!selectedCategory ? 'active' : ''}
        >
          Mostrar Todos
        </Button>
        {DietData.map((category) => (
          <Button
            key={category.id}
            variant="outline-primary"
            onClick={() => setSelectedCategory(category.id)}
            className={selectedCategory === category.id ? 'active' : ''}
          >
            {category.title}
          </Button>
        ))}
      </div>

      <Row className="category-items">
        {getCategoryItems().map((item, index) => (
          <Col key={index} xs={12} sm={6} md={3} lg={4}>
            <div className="column">
              <Card
                className="item-card "
                onClick={() => handleCardClick(index)}
                style={{ cursor: 'pointer' }}
              >
                <Card.Img src={item.image} alt={item.name} />
                <Card.Body>
                  <h5>{item.name}</h5>
                </Card.Body>
              </Card>
            </div>
          </Col>
        ))}
      </Row>

      {selectedItem !== null && (
        <Modal show={true} onHide={closeModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>{getCategoryItems()[selectedItem].name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card.Img
              src={getCategoryItems()[selectedItem].image}
              alt={getCategoryItems()[selectedItem].name}
            />
            <p>{getCategoryItems()[selectedItem].preparation}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
        
      )}
      <Bot />
    </div>
    
  )
}

export default Diet
