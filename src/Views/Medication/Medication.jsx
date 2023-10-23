import React from 'react'
import FormMedication from '../../Components/Form/FormMedication'
import Medication from '../../Components/Medication/Medication'

function Citas() {
  return (
    <div className='home'>
      <div className='container'>
        <FormMedication />
        <Medication />
      </div>
    </div>
  )
}

export default Citas