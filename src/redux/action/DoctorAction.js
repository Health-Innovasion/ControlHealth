import {
  GET_DOCTORS,
  COMPLETED_GET_DOCTORS,
  FAILED_COMPLETED_GET_DOCTORS,
} from '../const/const'
import {
  doc,
  collection,
  query,
  where,
  updateDoc,
  getDocs,
  getDoc
} from 'firebase/firestore'
import { db } from '../../firebase_config'
import { statusApplication, typeUsers } from '../../Utils/constants'

const getDoctors = () => ({
  type: GET_DOCTORS,
})

const successGetDoctors = (doctors) => ({
  type: COMPLETED_GET_DOCTORS,
  payload: doctors,
})

const failedGetDoctors = (error) => ({
  type: FAILED_COMPLETED_GET_DOCTORS,
  payload: error,
})

export const GetDoctors = () => {
  return async (dispatch) => {
    dispatch(getDoctors())
    try {
      const doctorsCollectionRef = collection(db, 'users')

      // Crear una consulta que filtra los usuarios
      const querySnapshot = await getDocs(
        query(
          doctorsCollectionRef,
          where('typeUser', '==', typeUsers.doctor),
          where('validated', '==', statusApplication.approved),
        ),
      )

      const doctorsData = []
      querySnapshot.docs.forEach((doc) => {
        const doctorData = doc.data()
        const doctorId = doc.id
        doctorsData.push({ id: doctorId, ...doctorData })
      })

      dispatch(successGetDoctors(doctorsData))
    } catch (error) {
      console.error('Error:', error.code, error.message)
      dispatch(failedGetDoctors(error.message))
    }
  }
}

export const actualizarCita = async (citaId, nuevaFecha, cambiarEstado=false) => {
  try {
    const citaRef = doc(db, 'quotes', citaId);
    const citaSnapshot = await getDoc(citaRef);

    if (citaSnapshot.exists()) {
      const actualizaciones = {};

      if (cambiarEstado) {
        actualizaciones['data.status'] = nuevaFecha;
      } else {
        actualizaciones['data.cita.date'] = nuevaFecha.toISOString();
      }

      await updateDoc(citaRef, actualizaciones);

      return 'Cita actualizada exitosamente';
    } else {
      console.error('El documento de la cita no existe.');
      return 'La cita no existe';
    }
  } catch (error) {
    console.error('Error al actualizar la cita:', error);
    throw error;
  }
};