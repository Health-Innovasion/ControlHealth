import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CardDieta from '../../Components/Card/CardDieta';
import { DietData } from '../../Utils/DietData';
import { ExerciseData } from '../../Utils/routines';

function Home() {
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500, // Aumenta la velocidad del slider
    slidesToShow: 5, // Cantidad de elementos visibles en la página
    slidesToScroll: 1,
  };

  const dietItems = DietData.flatMap((category) => category.items);
  const exerciseItems = ExerciseData.flatMap((rutina) => rutina.items);

  console.log(exerciseItems)
  return (
    <div>
      <h1>Alimentos recomendados hoy</h1>
      <Slider {...sliderSettings}>
        {dietItems.map((item, index) => (
          <CardDieta key={index} item={item} />
        ))}
      </Slider>

      <h1>Ejercicios recomendados hoy</h1>
      
      <Slider {...sliderSettings}>
        {exerciseItems.map((item,index) => (
          <CardDieta key={index} item={item} />
        ))}
      </Slider>
    </div>
  );
}

export default Home;
