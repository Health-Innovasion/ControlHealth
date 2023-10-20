import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { statusApplication, typeUsers } from './constants';

const ProtectedRouteMedico = ({ component: Component, ...rest }) => {
  const { currentUser } = useSelector((state) => state.user);

  const isDoctor = currentUser?.typeUser === typeUsers.doctor;
  const isApproved = currentUser?.validated === statusApplication.approved;
  const isInReview = currentUser?.validated === statusApplication.inReview;

  if (isDoctor) {
    if (isApproved) {

      return <Component {...rest} />;
    } else if (isInReview) {
      return <div>Están procesando sus datos</div>;
    } else {
      return <div>No tiene permiso</div>;
    }
  } else {
    return <Redirect to="/login" />;
  }
};

export default ProtectedRouteMedico;