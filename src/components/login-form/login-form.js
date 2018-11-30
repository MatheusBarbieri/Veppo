import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './stylesheets/login-form.scss'

class LoginForm extends Component {
  static propTypes = {
    onLogin: PropTypes.func.isRequired
  }

  state = {
    name: '',
    password: ''
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value })
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value })
  }

  handleSubmit = (event) => {
    const { onLogin } = this.props
    const { name, password } = this.state
    onLogin(name, password)
    event.preventDefault()
  }

  render() {
    const { name, password } = this.state

    return (
      <form
        className='login-form'
        onSubmit={(event) => { this.handleSubmit(event) }}>

        <label
          className='login-form__input'
          htmlFor='user-name'>
          <p className='login-form__label'>Login:</p>
          <input
            className='login-form__field'
            id='user-name'
            name='user-name'
            type='text'
            value={name}
            onChange={(event) => { this.handleNameChange(event) }}
            placeholder='Digite seu usuário'
            {...this.props} />
          <div className='login-form__forgotten'>
            <Link to='recover'>Esqueceu seu login?</Link>
          </div>
        </label>

        <label
          className='login-form__row'
          htmlFor='password'>
          <p className='login-form__label'>Senha:</p>
          <input
            className='login-form__field'
            id='password'
            name='password'
            type='password'
            value={password}
            onChange={(event) => { this.handlePasswordChange(event) }}
            placeholder='Digite sua senha'
            {...this.props} />
          <div className='login-form__forgotten'>
            <Link to='recover'>Esqueceu sua senha?</Link>
          </div>
        </label>

        <input
          className='login-form__submit'
          type='submit'
          value='Entrar' />

        <div className='login-form__no-account'>
          <span>Não tem conta?</span>
          {' '}
          <Link className='login-form__register' to='cadastro'>CADASTRE-SE</Link>
        </div>
      </form>
    )
  }
}

export default LoginForm
