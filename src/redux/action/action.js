import {
  Register_User,
  Register_Success,
  Register_Failed,
  LOGIN_Start,
  LOGIN_Success,
  LOGIN_Failed,
  LOGOUT_Start,
  LOGOUT_Success,
  LOGOUT_Failed,
} from '../const/const'
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import {
  doc,
  setDoc,
  addDoc,
  collection,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore'
import { db, auth, storage } from '../../firebase_config'

import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

const registerUser = () => ({
  type: Register_User,
})

const registerSuccess = (user) => ({
  type: Register_Success,
  payload: user,
})

const registerFailed = (error) => ({
  type: Register_Failed,
  payload: error,
})

const loginStart = () => ({
  type: LOGIN_Start,
})

const loginSuccess = (user) => ({
  type: LOGIN_Success,
  payload: user,
})

const loginFailed = (error) => ({
  type: LOGIN_Failed,
  payload: error,
})
const logoutStart = () => ({
  type: LOGOUT_Start,
})

const logoutSuccess = () => ({
  type: LOGOUT_Success,
})

const logoutFailed = (error) => ({
  type: LOGOUT_Failed,
  payload: error,
})

export const registerInitiate = (
  nombre,
  apellido,
  email,
  password,
  isDoctor,
  setModalOpen,
  resetForm,
  setSelectedFile,
  setisLoadingRegister,
) => {
  return async (dispatch) => {
    dispatch(registerUser())
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      )

      const user = userCredential.user

      await updateProfile(auth.currentUser, {
        userName: `${nombre} ${apellido}`,
      })

      //TODO: cambiar el nombre de la coleccion user a users

      async function saveUser(fileUrl) {
        try {
          setDoc(doc(db, 'user', user.uid), {
            uid: user.uid,
            userName: `${nombre} ${apellido}`,
            email,
            ...(fileUrl && { fileUrl }),
            ...(isDoctor ? { validated: 'In review' } : null),
          })
          if (!isDoctor) dispatch(registerSuccess(user))
        } catch (error) {
          console.error('Error al guardar el usuario:', error)
          throw error 
        }
      }

      if (isDoctor) {
        const storageRef = ref(storage, `MINSA/${user.uid}`)

        const file = isDoctor

        const uploadTask = uploadBytes(storageRef, file)

        uploadTask
          .then((snapshot) => {
            getDownloadURL(snapshot.ref)
              .then((fileUrl) => {
                saveUser(fileUrl)
                  .then(() => {
                    setModalOpen(true)
                    resetForm()
                    setSelectedFile(null)
                    setisLoadingRegister(false)
                  })
                  .catch((error) => {
                    dispatch(registerFailed(error.message))
                    console.error(
                      'Error al actualizar datos de usuario en Firestore:',
                      error,
                    )
                  })
              })
              .catch((error) => {
                dispatch(registerFailed(error.message))
                console.error('Error al obtener la URL del archivo:', error)
              })
          })
          .catch((error) => {
            console.error('Error al subir el archivo:', error)
          })
      } else {
        try {
          saveUser()
        } catch (error) {}
      }
    } catch (error) {
      console.error('Error en el registro:', error.code, error.message)
      dispatch(registerFailed(error.message))
    }
  }
}

export const loginInitiate = (email, password) => {
  return async (dispatch) => {
    dispatch(loginStart())
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      )

      const user = userCredential.user

      dispatch(loginSuccess(user))
    } catch (error) {
      console.error('Error:', error.code, error.message)
      dispatch(loginFailed(error.message))
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    dispatch(logoutStart())
    try {
      await signOut(auth)

      dispatch(logoutSuccess())
    } catch (error) {
      dispatch(logoutFailed(error))
    }
  }
}

export const createAppointment = async (data) => {
  try {
    await addDoc(collection(db, 'citas'), { data })
  } catch (error) {
    console.error('Error al crear la cita en Firebase', error)
    throw error
  }
}

export const combineData = (medico, cita, uid) => {
  return {
    medico,
    cita,
    uid,
  }
}

export const getCitas = (id, callback) => {
  try {
    const docRef = query(collection(db, 'citas'), where('data.uid', '==', id))

    return onSnapshot(docRef, (querySnapshot) => {
      const citas = []

      querySnapshot.forEach((doc) => {
        citas.push({
          id: doc.id,
          data: doc.data(),
        })
      })

      callback(citas)
    })
  } catch (error) {
    console.error('Error al obtener los documentos:', error)
    throw error
  }
}
