import React, { useState} from 'react'
import img from '../../Assets/Images/icono-user.png'
import { ThemeProvider } from 'styled-components'
import SimpleForm from '../ChatBot/ChatBot'

export const Bot = () => {
const [chatbot, setChatBot] = useState(false)
const theme = {
    background: '#f5f8fb',
    headerFontColor: '#000000',
    headerFontSize: '24px',
    botBubbleColor: '#008DD8',
    botFontColor: '#ffffff',
    userBubbleColor: '#F7F7F7',
    userFontColor: '#000000',
    botFontSize: '28px',
  }

return (

<>
      <button
      href="#"
      className="btn-flotante"
      onClick={() => setChatBot(!chatbot)}
    >
      <span className="fas fa-robot" src={img}></span>
    </button>
    {chatbot ? (
      <div id="chatbot">
        <ThemeProvider theme={theme}>
          <SimpleForm />
        </ThemeProvider>
      </div>
    ) : null}
    </>
        

)
    
}

export default Bot