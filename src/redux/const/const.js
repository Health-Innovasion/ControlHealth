export const Register_User = "Register_User"
export const Register_Success = "Register_Success"
export const Register_Failed = "Register_Failed"

export const LOGIN_Start = "LOGIN_Start"
export const LOGIN_Success = "LOGINr_Success"
export const LOGIN_Failed = "LOGIN_Failed"

export const LOGOUT_Start = "LOGOUT_Start"
export const LOGOUT_Success = "LOGOUT_Success"
export const LOGOUT_Failed = "LOGOUT_Failed"

export const GET_DOCTORS = "GET_DOCTORS"
export const COMPLETED_GET_DOCTORS = "COMPLETED_GET_DOCTORS"
export const FAILED_COMPLETED_GET_DOCTORS = "FAILED_COMPLETED_GET_DOCTORS"

export const GET_USERS = "GET_USERS"
export const COMPLETED_GET_USERS = "COMPLETED_GET_USERS"
export const FAILED_COMPLETED_GET_USERS = "FAILED_COMPLETED_GET_USERS"

//TODO: ELIMINAR CITAS DE LA VISTA DEL USUARIO
// citas: state.citas.filter((cita) => cita.id !== action.payload)