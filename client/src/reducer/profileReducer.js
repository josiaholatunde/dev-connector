import { PROFILE_LOADING, GET_PROFILE, CLEAR_PROFILE } from "../actions/types";

const initialState = {
  loading: false,
  profile: null,
  profiles: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILE:
      return {
        ...state,
        loading: false,
        profile: action.payload
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null
      };
    default:
      return state;
  }
}
