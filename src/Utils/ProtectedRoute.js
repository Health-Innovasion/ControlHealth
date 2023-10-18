import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { typeUsers } from './constants'

const ProtectedRoute = ({ ...rest }) => {
  const { currentUser } = useSelector((state) => state.user)

  return currentUser?.typeUser === typeUsers.patient ? (
    <Route {...rest} />
  ) : (
    <Redirect to="/login" />
  )
}

export default ProtectedRoute
