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
  getDoc,
  onSnapshot
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

export const actualizarCita = async (citaId, nuevaFecha, cambiarEstado = false) => {
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


export const dataUser = async () => {
  const usuariosCollection = collection(db, 'users');

  // Crea un objeto para almacenar la estructura de datos
  const data = {};

  try {
    const querySnapshot = await getDocs(usuariosCollection);

    querySnapshot.forEach((doc) => {
      const usuarioData = doc.data();
      const departamento = usuarioData.departamento;
      //TODO: HACER QUE EN LAS CONFIGURACIONDE DEL PERFIL APARESCAN LOS NOMBRES DE LOS DEPARTAMENTO EN MINUSCULAS Y CON LA PROPIEDAD departamento
      // Verifica si el campo "departamento" es válido antes de continuar
      if (departamento !== undefined) {
        const tipo_1 = usuarioData.diabetes === 'tipo_1' ? 1 : 0;
        const tipo_2 = usuarioData.diabetes === 'tipo_2' ? 1 : 0;

        if (!data[departamento]) {
          data[departamento] = {
            departamento,
            tipo_1: 0,
            tipo_2: 0,
          };
        }

        data[departamento].tipo_1 += tipo_1;
        data[departamento].tipo_2 += tipo_2;
      }
    });

    const dataArray = Object.values(data);
    return dataArray; // Devuelve el array de objetos
  } catch (error) {
    console.error('Error al obtener los datos de usuarios:', error);
    throw error; // Lanza el error si ocurre uno
  }
}

export const GetDoctorsAdmin = (callback) => {
  const doctorsCollectionRef = collection(db, 'users');

  try {
    // Crear una consulta que filtra los usuarios
    const queryRef = query(
      doctorsCollectionRef,
      where('typeUser', '==', typeUsers.doctor)
    );

    return onSnapshot(queryRef, (querySnapshot) => {
      const doctorsData = [];

      querySnapshot.docs.forEach((doc) => {
        const doctorData = doc.data();
        const doctorId = doc.id;
        doctorsData.push({ id: doctorId, ...doctorData });
      });

      callback(doctorsData);
    });
  } catch (error) {
    console.error('Error:', error.code, error.message);
    throw error;
  }
}

export const actualizarValidatedDoctor = async (doctorId, nuevoValidated) => {
  try {
    const doctorRef = doc(db, 'users', doctorId); // Reemplaza 'doctors' con la colección adecuada en tu base de datos
    const doctorSnapshot = await getDoc(doctorRef);

    if (doctorSnapshot.exists()) {
      const actualizaciones = {
        validated: nuevoValidated,
      };

      await updateDoc(doctorRef, actualizaciones);

      return 'Doctor validado actualizado exitosamente';
    } else {
      console.error('El documento del doctor no existe.');
      return 'El doctor no existe';
    }
  } catch (error) {
    console.error('Error al actualizar el estado de validación del doctor:', error);
    throw error;
  }
};



