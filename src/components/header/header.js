import React, { Component } from 'react'

import MenuBar from './menubar'

import './stylesheets/header.scss'
import veppo from './icons/veppo.png'

export default class Header extends Component {
  render() {
    return (
      <div className='header'>
        <div className='facade'>
          <img
            className='facade__icon'
            src={veppo}
            alt='Ícone da rodoviária' />
          <div className='facade__title'>
            Estação Rodoviária de Porto Alegre
          </div>
        </div>
        <MenuBar />
      </div>
    )
  }
}
