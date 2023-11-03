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

const initialState = {
  loading: false,
  currentUser: null,
  error: null,
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case Register_User:
    case LOGIN_Start:
    case LOGOUT_Start:
      return {
        ...state,
        loading: true,
      }
    case Register_Success:
    case LOGIN_Success:
    case LOGOUT_Success:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
      }
    case Register_Failed:
    case LOGIN_Failed:
    case LOGOUT_Failed:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case 'RESET_CURRENT_USER':
      return {
        ...state,
        currentUser: null,
      };
    default:
      return state
  }
}

export default userReducer
