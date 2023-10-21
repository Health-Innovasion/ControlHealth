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
    // Valores de los parámetros (0 si no están definidos)
    const {
      diabetesPregnancy,
      chronicDisease,
      famililyMemberDiabetes,
      anxietyWater,
      frequentBathing,
      loseWeight,
    } = state

    // Suma de puntos
    const totalPoints =
      (diabetesPregnancy ? 5 : 0) +
      (chronicDisease ? 5 : 0) +
      (famililyMemberDiabetes ? 5 : 0) +
      (anxietyWater ? 5 : 0) +
      (frequentBathing ? 5 : 0) +
      (loseWeight ? 5 : 0)

    // Porcentaje
    const percentage = (totalPoints / 30) * 100 // 30 es la suma máxima posible (6 * 5)

    return percentage.toFixed(2)
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
        <td>Resultado:</td>
        <td>
          <p className='result-diagnostic'>
            En base a tus síntomas, presentas el {calculatePercentage(steps)}%
            de padecer de diabetes
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
