import React from 'react'
import { FaCalendarAlt, FaDumbbell, FaHome, FaUtensils } from 'react-icons/fa'
import { MdMedication } from 'react-icons/md'

export const SidebarData = [
  {
    title: 'Home',
    path: '/home',
    icon: <FaHome />,
    cName: 'nav-text',
  },
  {
    title: 'Citas',
    path: '/citas',
    icon: <FaCalendarAlt />,
    cName: 'nav-text',
  },
  {
    title: 'Dietas',
    path: '/diet',
    icon: <FaUtensils />,
    cName: 'nav-text',
  },
  {
    title: 'Rutinas',
    path: '/routines',
    icon: <FaDumbbell />,
    cName: 'nav-text',
  },
  {
    title: 'Medicación',
    path: '/medication',
    icon: <MdMedication />,
    cName: 'nav-text',
  },
  {
    title: 'chats',
    path: '/chat',
    icon: <MdMedication />,
    cName: 'nav-text',
  },
]

export const Menu = [
  {
    title: 'Profile',
    path: '/profile',
    cName: 'nav-text',
  },
  {
    title: 'Settings',
    path: '/settings',
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
  doctor: 'doctor'
}
