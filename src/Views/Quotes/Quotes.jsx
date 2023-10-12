import React from 'react'
import Quote from '../../Components/Quotes/Quote'
import FormQuotes from '../../Components/Form/Form'
import './Quotes.css'

function Citas() {
  return (
    <div className='home'>
<<<<<<< HEAD
      <div className='container'>
        <FormQuotes />
=======
      <h1>Citas</h1>
      <IoIosAddCircle className='icon-add' variant="primary" onClick={() => setShowModal(true)} />
      <div className='containers'>
>>>>>>> 5f4c2995f3810804feaebb38cc7519ad59e66729
        <Quote />
      </div>
    </div>
  )
}

export default Citas