import React from 'react'
import Quote from '../../Components/Quotes/Quote'
import FormQuotes from '../../Components/Form/Form'
import './Quotes.css'

function Citas() {
  return (
    <div className='home'>
      <div className='container'>
        <FormQuotes />
        <Quote />
      </div>
    </div>
  )
}

export default Citas