import React from 'react'
import { useSelector } from "react-redux"
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ ...rest }) => {
  const { currentUser } = useSelector(state => state.user);

  return currentUser?.tipo === 'paciente' ? <Route {...rest} /> : <Redirect to="/login" />;
}

export default ProtectedRoute
