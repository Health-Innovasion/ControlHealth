import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRouteMedico = ({ component: Component, ...rest }) => {
  const { currentUser } = useSelector(state => state.user);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (currentUser && currentUser?.tipo === 'medico') {
          // Si es un médico, verifica si está validado 
          if (currentUser?.validated === 'true') {
            return <Component {...props} />;
          } else if (currentUser?.validated === 'In review') {
            return <div>Están procesando sus datos</div>;
          } else {
           return <div>No tiene permiso</div>;
          }
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default ProtectedRouteMedico;
