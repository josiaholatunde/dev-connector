import { LOGIN_USER } from "../actions/types";

const initialState = {
  login: {
    errors: {}
  },
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        login: {
          errors: action.payload
        }
      };

    default:
      return state;
  }
}
