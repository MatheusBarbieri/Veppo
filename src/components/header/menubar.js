import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './stylesheets/menubar.scss'

import facebook from './icons/facebook-square.svg'

const menuItens = [
  {
    title: 'Página Inicial',
    href: '/'
  },
  {
    title: 'Horários de Onibus',
    href: '/horarios'
  },
  {
    title: 'Serviços',
    href: '/#servicos'
  }
]

export default class MenuBar extends Component {
  renderMenuItens() {
    return (
      menuItens.map((menuItem) => (
        <Link key={`item_${menuItem.title}`} className='menu-item' to={menuItem.href}>
          {menuItem.title}
        </Link>
      ))
    )
  }

  render() {
    return (
      <div className='menubar'>
        <div className='menubar-items'>
          {this.renderMenuItens()}

          <div className='menubar-items__right-area'>
            <div className='menu-item'>
              (51) 3210-0101
            </div>

            <a href='https://www.facebook.com/rodoviariapoa/' className='facebook-icon'>
              <img
                className='facebook-icon'
                src={facebook}
                alt='Ícone do facebook' />
            </a>

          </div>

        </div>
      </div>
    )
  }
}
