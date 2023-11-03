import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { statusApplication, typeUsers } from './constants';
import sweetAlert from 'sweetalert';

const ProtectedRouteMedico = ({ component: Component, ...rest }) => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const isDoctor = currentUser?.typeUser === typeUsers.doctor;
  const isApproved = currentUser?.validated === statusApplication.approved;
  const isInReview = currentUser?.validated === statusApplication.inReview;

  const resetCurrentUser = useMemo(() => {
    return {
      type: 'RESET_CURRENT_USER',
    };
  }, []);

  useEffect(() => {
    if (isDoctor && !isApproved && !isInReview) {
      sweetAlert('Acceso denegado', 'Su solicitud de médico aún no ha sido aprobada.');
      dispatch(resetCurrentUser);
    } else if (isDoctor && isInReview) {
      sweetAlert('En revisión', 'Su solicitud de médico está en revisión.');
      dispatch(resetCurrentUser);
    }
  }, [isDoctor, isApproved, isInReview, dispatch, resetCurrentUser]);

  if (isDoctor) {
    if (isApproved) {
      return <Component {...rest} />;
    } else if (isInReview) {
      return <div>Están procesando sus datos</div>;
    } else {
      return null;
    }
  } else {
    dispatch(resetCurrentUser);
    return <Redirect to="/login" />;
  }
};

export default ProtectedRouteMedico;
