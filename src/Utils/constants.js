import React from 'react'
import '../Components/NavBar/navbar.css'
import home from '../Assets/Images/Iconly-Curved-Home.svg'
import quotes from '../Assets/Images/citas-iconly.svg'
import diet from '../Assets/Images/Dietas.iconly.svg'
import routines from '../Assets/Images/routines.iconly.svg'
import medication from '../Assets/Images/medication.iconly.svg'



export const SidebarData = [
  {
    title: 'Inicio',
    path: '/home',
    icon: <img src={home} alt="Logo" className='icon-homeview'/>,
    cName: 'nav-text',
  },
  {
    title: 'Citas',
    path: '/citas',
    icon: <img src={quotes} alt="Logo" className='icon-homeview'/>,
    cName: 'nav-text',
  },
  {
    title: 'Dietas',
    path: '/diet',
    icon: <img src={diet} alt="Logo" className='icon-homeview'/>,
    cName: 'nav-text',
  },
  {
    title: 'Rutinas',
    path: '/routines',
    icon: <img src={routines} alt="Logo" className='icon-homeview'/>,
    cName: 'nav-text',
  },
  {
    title: 'Medicación',
    path: '/medication',
    icon: <img src={medication} alt="Logo" className='icon-homeview'/>,
    cName: 'nav-text',
  }
]

export const Menu = [
  {
    title: 'Perfil',
    path: '/profile',
    cName: 'nav-text',
  },
]

export const statusApplication = {
  inReview: 'En revisión',
  approved: 'Aprobada',
  denied: 'Denegada',
  done: 'Ninguna',
}

export const typeUsers = {
  patient: 'patient',
  doctor: 'doctor',
  admin:  'admin'
}

export const statusQuotes = {
  inReview: 'En revisión',
  approved: 'Aprobada',
  denied: 'Denegada',
  postponed: 'Pospuesta'
}

export const required = 'Campo requerido'
export const onlyLetters = 'No dede de contener caracteres especiales o números'

export const regexOnlyLetters = /^[a-zA-Z\s]+$/
