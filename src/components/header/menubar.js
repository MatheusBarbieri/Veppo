import React, { Component } from 'react'

import './stylesheets/menubar.scss'

const menuItens = [
  {
    title: 'Página Inicial',
    href: 'home'
  },
  {
    title: 'Passagens',
    href: 'passagens'
  },
  {
    title: 'Serviços',
    href: 'home#servicos'
  }
]

export default class MenuBar extends Component {
  renderMenuItens() {
    return (
      menuItens.map((menuItem) => (
        <a key={`item_${menuItem.title}`} className='menuItem' href={menuItem.href}>
          {menuItem.title}
        </a>
      ))
    )
  }

  render() {
    return (
      <div className='menubar'>
        {this.renderMenuItens()}
      </div>
    )
  }
}
