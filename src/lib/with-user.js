import { connect } from 'react-redux'

import { setUserLogin, setUserLogout } from '../redux/user-redux'

const mapDispatchToProps = {
  setUserLogout,
  setUserLogin
}

const mapStateToProps = ({ userLogin, authenticated }) => ({
  user: {
    userLogin,
    authenticated
  }
})

export default connect(mapStateToProps, mapDispatchToProps)
