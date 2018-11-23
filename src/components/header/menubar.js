import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import uid from 'uniqid'

import SocialMediaBar from '../social-media-bar'

import './stylesheets/menubar.scss'

const menuItens = [
  {
    title: 'Página Inicial',
    href: '/home',
    isHash: false
  },
  {
    title: 'Horários de Ônibus',
    href: '/horarios',
    isHash: false
  },
  {
    title: 'Serviços',
    href: '/servicos',
    isHash: true
  }
]

export default class MenuBar extends Component {
  renderMenuItens = () => menuItens.map((menuItem) => (
    <Link key={uid('menu-item')} className='menu-item' to={menuItem.href}>
      {menuItem.title}
    </Link>
  ))

  render() {
    return (
      <div className='menubar'>
        <div className='menubar-items'>
          {this.renderMenuItens()}

          <div className='menubar-items__right-area'>
            <div className='menu-item__phone'>
              (51) 3210-0101
            </div>
            <SocialMediaBar />
          </div>

        </div>
      </div>
    )
  }
}
