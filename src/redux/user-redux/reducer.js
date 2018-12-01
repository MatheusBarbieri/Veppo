import { ACTIONS } from './constants'

const initialState = {
  authenticated: false
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.USER_LOGIN: {
      const {
        userLogin
      } = action.payload

      return {
        userLogin,
        authenticated: true
      }
    }

    case ACTIONS.USER_LOGOUT:
      return {
        ...initialState
      }

    default:
      return state
  }
}

export default userReducer
