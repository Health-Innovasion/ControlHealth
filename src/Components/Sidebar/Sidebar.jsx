import React from 'react'
import Chats from '../Chat/Chat'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="navbar">
        <span className="logo">chats</span>
        <div className="user">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX-cskA2FbOzFi7ACNiGruheINgAXEqFL1TQ&usqp=CAU" alt="" />
            <span>Jonatan</span>
        </div>
      </div>
      <Chats/>
    </div>
  )
}

export default Sidebar
