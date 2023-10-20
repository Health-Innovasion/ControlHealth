import React from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Chat from '../../Components/Chat/Chat'


const ScreenChat = () => {
  return (
    <div className='home'>
      <div className="container">
        <Sidebar/>
        <Chat/>
      </div>
    </div>
  )
}

export default ScreenChat
