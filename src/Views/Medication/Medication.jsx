import React from 'react'
import FormMedication from '../../Components/Form/FormMedication'
import Medication from '../../Components/Medication/Medication'
import { Bot } from '../../Components/ChatBot/Bot'

function Citas() {
  return (
    <div className='home'>
      <div className='container'>
        <FormMedication />
        <Medication />
        <Bot />
      </div>
    </div>
  )
}

export default Citas