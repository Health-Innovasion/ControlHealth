import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { typeUsers } from './constants'

const ProtectedRouteAdmin = ({ ...rest }) => {
  const { currentUser } = useSelector((state) => state.user)

  return currentUser?.typeUser === typeUsers.admin ? (
    <Route {...rest} />
  ) : (
    <Redirect to="/login" />
  )
}

export default ProtectedRouteAdmin
