import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ReactPlayer from 'react-player'; // Importa el componente de React Player
import './Routines.css'; // Cambia el nombre del archivo CSS si es necesario
import { ExerciseData } from '../../Utils/routines'; // Asegúrate de tener datos de rutinas de ejercicio

function Exercise() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showImage, setShowImage] = useState(true); // Variable de estado para alternar entre imagen y video

  const getCategoryItems = () => {
    if (selectedCategory === null) {
      return ExerciseData.flatMap((category) => category.items);
    }
    const category = ExerciseData.find(
      (category) => category.id === selectedCategory
    );
    return category ? category.items : [];
  };

  const handleCardClick = (itemIndex) => {
    setSelectedItem(itemIndex);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setShowImage(true); // Restablecer la vista a la imagen cuando se cierra el modal
  };

  return (
    <div className="exercise-container">
      <h2>Ejercítate y Mantente en Forma</h2>

      <div className="filter-buttons">
        <Button
          variant="outline-primary"
          onClick={() => setSelectedCategory(null)}
          className={!selectedCategory ? 'active' : ''}
        >
          Todos
        </Button>
        {ExerciseData.map((category) => (
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
                className="item-card"
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
            {showImage ? (
              <img
                src={getCategoryItems()[selectedItem].image}
                alt={getCategoryItems()[selectedItem].name}
                style={{ maxWidth: '100%' }}
              />
            ) : (
              <ReactPlayer
                url={getCategoryItems()[selectedItem].videoUrl}
                controls // Para mostrar los controles de reproducción
                width="100%" // Ancho del reproductor
                height="auto" // Altura del reproductor (ajustable)
              />
            )}
            <p>{getCategoryItems()[selectedItem].description}</p>
            <Button
              variant="primary"
              onClick={() => setShowImage(!showImage)} // Alternar entre imagen y video
            >
              Ver {showImage ? 'Video' : 'Imagen'}
            </Button>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default Exercise;
