import React from 'react'
import PropTypes from 'prop-types'
import ChatBot from 'react-simple-chatbot'
import { steps } from '../../Utils/functions'
import './ChatBot.css'

function Review(props) {
  const { steps } = props

  const {
    name,
    gender,
    age,
    weight,
    diabetesPregnancy,
    chronicDisease,
    famililyMemberDiabetes,
    anxietyWater,
    frequentBathing,
    loseWeight,
  } = steps

  function calculatePercentage(state) {
  
    // Definir un objeto con los puntos asociados a cada pregunta
    const points = {
      diabetesPregnancy: 5,
      chronicDisease: 5,
      famililyMemberDiabetes: 5,
      anxietyWater: 5,
      frequentBathing: 5,
      loseWeight: 5,
    };
  
    // Calcular el total de puntos sumando los puntos de las respuestas afirmativas
    const totalPoints = Object.keys(points).reduce((sum, key) => {
      if (state[key] && state[key].value === 'Sí') {
        return sum + points[key];
      }
      return sum;
    }, 0);
  
    // Calcular el porcentaje
    const maximumPoints = Object.values(points).reduce((sum, value) => sum + value, 0);
    const percentage = (totalPoints / maximumPoints) * 100;
  
    return percentage.toFixed(2);
  }
  

  return (
    <div style={{ width: '100%' }}>
      <h4>Expediente</h4>
      <hr />
      <tr>
        <td>Nombres: </td>
        <td className="result-diagnostic">{name?.value}</td>
      </tr>
      <hr />
      <tr>
        <td>Género:</td>
        <td className="result-diagnostic">{gender?.value}</td>
      </tr>
      <hr />
      <tr>
        <td>Edad:</td>
        <td className="result-diagnostic">{age?.value}</td>
      </tr>
      <hr />
      <tr>
        <td>Peso:</td>
        <td className="result-diagnostic">{weight?.value}</td>
      </tr>
      <hr />
      <tr>
        <td>Enfermedad crónica:</td>
        <td className="result-diagnostic">{chronicDisease?.value}</td>
      </tr>
      <hr />
      <tr>
        <td>Familiar diabético:</td>
        <td className="result-diagnostic">{famililyMemberDiabetes?.value}</td>
      </tr>
      <hr />
      {diabetesPregnancy != undefined ? (
        <>
          <tr>
            <td>Diabetes embarazo:</td>
            <td className="result-diagnostic">{diabetesPregnancy?.value}</td>
          </tr>
          <hr />
        </>
      ) : null}
      <hr />
      <tr>
        <td>Ansiedad por agua:</td>
        <td className="result-diagnostic">{anxietyWater?.value}</td>
      </tr>
      <hr />
      <tr>
        <td>Frecuencia para ir al baño:</td>
        <td className="result-diagnostic">{frequentBathing?.value}</td>
      </tr>
      <hr />
      <tr>
        <td>Pérdida de peso:</td>
        <td className="result-diagnostic">{loseWeight?.value}</td>
      </tr>
      <hr />
      <tr className="resultado">
        <td>
          <p className="result-diagnostic">
          Resultado: En base a tus respuestas, presentas el {calculatePercentage(steps)}%
            de padecer diabetes.
          </p>
        </td>
      </tr>
      <hr />
    </div>
  )
}

Review.propTypes = {
  steps: PropTypes.object,
}

Review.defaultProps = {
  steps: undefined,
}

function SimpleForm() {
  return (
    <ChatBot
      headerTitle="ChatBot"
      speechSynthesis={{ enable: true, lang: 'es' }}
      steps={steps(Review)}
    />
  )
}

export default SimpleForm
