import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CardDieta from '../../Components/Card/CardDieta';
import { DietData } from '../../Utils/DietData';
import { ExerciseData } from '../../Utils/routines';
import '.././Home/Home.css'
// import { Card } from 'react-bootstrap';
// import background from '../../Assets/Images/background.png'

function Home() {

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };

  const dietItems = DietData.flatMap((category) => category.items);
  const exerciseItems = ExerciseData.flatMap((rutina) => rutina.items);


  return (
    <div className='home'>
      <h1>Alimentos recomendados hoy</h1>
      <Slider {...settings}>
        {dietItems.map((item, index) => (
          <CardDieta key={index} item={item} />
        ))}
      </Slider>

      <h1>Ejercicios recomendados hoy</h1>

      <Slider {...settings}>
        {exerciseItems.map((item, index) => (
          <CardDieta key={index} item={item} />
        ))}
      </Slider>


      {/* <div className="informacion-diabetes">
          <h3>Todo lo que debes saber de la diabetes</h3>
         <div className="card-container-home">
            <Card
              className="card-home"
              title="¿Qué es la Diabetes?"
              content="La diabetes es una enfermedad crónica que afecta la forma en que el cuerpo utiliza la glucosa en sangre. Puede ser causada por una falta de insulina (diabetes tipo 1) o por una resistencia a la insulina (diabetes tipo 2)."
              image={background}
            />
             <Card
            className="card-home"
              title="Síntomas de la Diabetes"
              content="Los síntomas comunes de la diabetes incluyen sed excesiva, micción frecuente, fatiga, cambios en la visión y heridas que sanan lentamente. Es importante reconocer estos signos para un diagnóstico temprano."
              image="url_de_la_imagen_2.jpg"
            />
            <Card
            className="card-home"
              title="Tratamiento y Control"
              content="El tratamiento de la diabetes implica cambios en la dieta, ejercicio regular, medicamentos y, en algunos casos, insulina. El control constante de los niveles de glucosa en sangre es esencial."
              image="url_de_la_imagen_3.jpg"
            />
            <Card
            className="card-home"
              title="Prevención de la Diabetes"
              content="La diabetes tipo 2 es en gran medida prevenible con un estilo de vida saludable. Mantener un peso adecuado, hacer ejercicio y llevar una dieta equilibrada son pasos clave en la prevención."
              image="url_de_la_imagen_4.jpg"
            /> 
          </div>
        </div> */}
    </div>
  );
}

export default Home;
