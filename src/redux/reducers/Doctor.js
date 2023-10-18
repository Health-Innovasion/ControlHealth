import { 
  GET_DOCTORS,
  COMPLETED_GET_DOCTORS,
  FAILED_COMPLETED_GET_DOCTORS 
} from "../const/const"

const initialState = {
  loading: false,
  doctors: [],
  error: null
};

const DoctorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DOCTORS:

      return {
        ...state,
        loading: true,
      };

  case COMPLETED_GET_DOCTORS:

    return{
      ...state,
        loading: true,
        doctors: action.payload
    }
    case FAILED_COMPLETED_GET_DOCTORS:

      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default DoctorsReducer;
