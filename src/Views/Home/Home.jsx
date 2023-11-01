import React from 'react';
import Card from 'react-bootstrap/Card';
import CardDieta from '../../Components/Card/CardDieta';
import { DietData } from '../../Utils/DietData';
import { ExerciseData } from '../../Utils/routines';
import { DiabetesInformation } from '../../Utils/InfoDiabetes';
import '.././Home/Home.css';
import { Bot } from '../../Components/ChatBot/Bot';

function Home() {
  const dietItems = DietData.flatMap((category) => category.items);
  const exerciseItems = ExerciseData.flatMap((rutina) => rutina.items);

  return (
    <div className='home'>
      <div className='container-cardshome'>
      <h2 className='titulodiabetes'>Alimentos recomendados hoy</h2>
      <div className="horizontal-scroll">
        {dietItems.map((item, index) => (
          <CardDieta key={index} item={item} />
        ))}
      </div>
          <br />
      <h2 className='titulodiabetes'>Ejercicios recomendados hoy</h2>
      <div className="horizontal-scroll">
        {exerciseItems.map((item, index) => (
          <CardDieta key={index} item={item} />
        ))}
      </div>
      <br />
      </div>
      

      <h2 className="titulodiabetes">Información sobre la Diabetes</h2>
      <div className="diabetes-info">
        {DiabetesInformation.map((info) => (
          <Card key={info.id} className="card-info">
            <div className="d-flex">
              <Card.Img variant="top" src={info.image} />
              <Card.Body>
                <Card.Title>{info.title}</Card.Title>
                <Card.Text>{info.description}</Card.Text>
              </Card.Body>
            </div>
          </Card>
        ))}
      </div>
      <Bot />
    </div>
  );
}

export default Home;
