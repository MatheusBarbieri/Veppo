import { ACTIONS } from './constants'

const userLogIn = (userLogin) => ({
  type: ACTIONS.USER_LOGIN,
  payload: userLogin
})

const userLogOut = () => ({
  type: ACTIONS.LOGOUT
})

export const setUserLogin = (userLogin) => (dispatch) => {
  dispatch(userLogIn(userLogin))
}

export const setUserLogout = () => (dispatch) => {
  dispatch(userLogOut())
}
