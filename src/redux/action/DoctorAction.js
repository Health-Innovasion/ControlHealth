import {
  GET_DOCTORS,
  COMPLETED_GET_DOCTORS,
  FAILED_COMPLETED_GET_DOCTORS,
} from '../const/const'
import { getDocs, collection, query, where } from 'firebase/firestore'
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
